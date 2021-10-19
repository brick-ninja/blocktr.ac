import {
  mount_vue,
  flush_promises,
  next_tick
} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import Checkout from '../src/Checkout.vue'

import ziti from '../src/config/ziti'

describe("Checkout Page", () => {
  var server_api;
  var checkout;

  beforeEach(function(){
    server_api = {
      methods : {
        purchase_plan: jest.fn(),
        update_user: jest.fn()
      }
    };

    checkout = mount_vue(Checkout, {
      mixins : [server_api],
      propsData : {
        plan : 'standard',
        period: 3,
        specified_filters: 1,
        specified_sinks: 1
      }
    });
  })

  describe("dom", () => {
    describe("successful checkout", () => {
      it("successful checkout", () => {
        const ch = mount_vue(Checkout, {
          mixins : [server_api],
          data : function(){
            return {success : true}
          }
        })

        expect(ch.find("#success_checkout")).toExist();
      })
    })

    describe("#checkout_subcontainer > #enjoy", () => {
      it("contains period plan", () => {
        const enjoy = checkout.find("#checkout_subcontainer > #enjoy")
        expect(enjoy.text()).toEqual("Enjoy your 3 month standard Plan");
      })
    })

    describe("#checkout_subcontainer > h5", () => {
      it("contains total cost", () => {
        const total_cost = checkout.find("#checkout_subcontainer > h5")
        expect(total_cost.text()).toMatch("Total Due: $" + checkout.vm.total_cost);
      })
    })

    describe("#checkout_subcontainer > #next_payment", () => {
      it("contains next payment", () => {
        expect(checkout.find('#next_payment')).toExist();
      })
    })

    describe("#credit_card_number", () => {
      it("is credit card number with dashes", async() => {
        checkout.setData({credit_card_number : '4242424242424242'});
        await next_tick(checkout);

        const credit_card_number = checkout.find("#credit_card_number");
        expect(credit_card_number.element.value).toEqual('4242-4242-4242-4242')
      })
    })

    describe("#credit_card_number_wrapper > .form_error", () => {
      describe("invalid credit card number", () => {
        it("contains error message", async () => {
          checkout.setData({credit_card_number : '424'});
          await next_tick(checkout);

          const error_msg = checkout.find(".form_text > span");
          expect(error_msg.text()).toEqual("Must be 14 to 16 digits");
        })
      })
    })

    describe("#credit_card_month", () => {
      var credit_month;
      beforeEach(function(){
        credit_month = checkout.find("#credit_card_month");
      })

      it("gets/sets credit_card_month", async() => {
        checkout.setData({credit_card_month : "11 Nov"});
        await next_tick(checkout);
        expect(credit_month.element.value).toBe("11 Nov");
      })

      it("has credit_card_months options", () => {
        const options = credit_month.findAll('option');
        expect(options.length).toBe(12);
      })
    })

    describe("#credit_card_year", () => {
      var credit_card_year;

      beforeEach(function(){
        credit_card_year= checkout.find("#credit_card_year");
      })

      it('gets/sets credit_card_year', async() => {
        const current_year = (new Date()).getFullYear()
        checkout.setData({credit_card_year : current_year + 1});
        await next_tick(checkout);
        expect(credit_card_year.element.value).toBe((current_year + 1).toString());
      })

      it("has credit_card_years options", () => {
        const options = credit_card_year.findAll('option');
        expect(options.length).toBe(10)
      })
    })

    describe("#tos_agree > checkbox", () => {
      it("is tied to tos_agree", async() => {
        checkout.setData({tos_agree : true})
        await next_tick(checkout);
        expect(checkout.find("#tos_agree input")).toBeChecked();
      })
    })

    describe("#place_order_wrapper", () => {
      describe("order_submitted", () => {
        it("contains spinner", async() => {
          checkout.setData({order_submitted : true});
          await next_tick(checkout);
          expect(checkout.find("#spinner")).toExist();
        })
      })
    })

    describe("#place_order", () => {
      describe("!is_valid", () => {
        it("is disabled", async() => {
          checkout.setData({tos_agree : false});
          await next_tick(checkout);

          const button= checkout.find("#place_order");
          expect(button).toBeDisabled();
        })
      })

      describe("order_submitted", () => {
        it("order_submitted -> disabled", async() => {
          checkout.setData({order_submitted : true});
          await next_tick(checkout);

          const button= checkout.find('#place_order');
          expect(button).toBeDisabled()
        })
      })

      describe("clicked", () => {
        it("calls #submit", async () => {
          const submit = {
            methods: {
              submit: jest.fn()
            }
          }

          const ch = mount_vue(Checkout, {
            mixins: [submit],
            computed : {
              is_valid : function(){ return true; }
            }
          })

          await ch.find("#place_order").trigger("click");
          expect(submit.methods.submit).toHaveBeenCalledTimes(1);
        })
      })
    })
  })

  describe("computed", () => {
    describe("#details", () => {
      describe("plan is not set", () => {
        it("is {}", () => {
          const ch = mount_vue(Checkout, {
            propsData: {
              plan: ''
            }
          })

          expect(ch.vm.details).toEqual({});
        })
      })

      it("is membership_features[plan]", () => {
        expect(checkout.vm.details).not.toEqual({});
      })
    })

    describe("#upgrading_plan", () => {
      describe("plan == membership_level", () => {
        it("is false", () => {
          const ch = mount_vue(Checkout, {
            propsData: {
              plan: 'basic'
            },

            computed: {
              membership_level: function(){
                return 'basic'
              }
            }
          })

          expect(ch.vm.upgrading_plan).toBe(false);
        })
      })

      describe("plan != membership_level", () => {
        it("is true", () => {
          const ch = mount_vue(Checkout, {
            propsData: {
              plan: 'standard'
            },

            computed: {
              membership_level: function(){
                return 'basic'
              }
            }
          })

          expect(ch.vm.upgrading_plan).toBe(true);
        })
      })

      describe("#next_payment", () => {
        it("is period months from now", () => {
          const ch = mount_vue(Checkout, {
            propsData: {
              plan: 'standard',
              period: 1
            },

            computed: {
              membership_level: function(){
                return 'basic'
              }
            }

          })

          const renewal = new Date(Date.now());
          renewal.setMonth(renewal.getMonth() + ch.vm.period);
          expect(ch.vm.next_payment).toBe(renewal.toLocaleDateString());
        })
      })

      describe("#credit_card_valid", () => {
        describe("have credit card and use_existing_credit_card", () => {
          it("is true", () => {
            const ch = mount_vue(Checkout, {
              propsData: {
                plan: 'standard'
              },

              data : function(){
                return {
                  use_existing_credit_card : true
                }
              },

              computed: {
                has_credit_card: function(){
                  return true
                }
              }
            })

            expect(ch.vm.credit_card_valid).toBe(true);
          })
        })

        describe("have credit card number and valid credit card number and have credit card cvc and valid credit card cvc", () => {
          it("is true", () => {
            const ch = mount_vue(Checkout, {
              propsData: {
                plan: 'standard'
              },

              computed: {
                have_credit_card_number: function(){
                  return true
                },
                invalid_credit_card_number: function(){
                  return false
                },
                have_credit_card_cvc: function(){
                  return true;
                },
                invalid_credit_card_cvc: function(){
                  return false;
                }
              }
            })

            expect(ch.vm.credit_card_valid).toBe(true);
          })
        })

        it("is false", () => {
          const ch = mount_vue(Checkout, {
            propsData: {
              plan: 'standard'
            },

            data : function(){
              return {use_existing_credit_card : false}
            },

            computed: {
              has_credit_card: function(){
                return false
              }
            }
          })

          expect(ch.vm.credit_card_valid).toBe(false);
        })
      })

      describe("#is_valid", () => {
        describe("credit_card_valid and tos_agree", () => {
          it("is true", () => {
            const ch = mount_vue(Checkout, {
              computed : {
                credit_card_valid : function(){ return true; }
              },

              data : function(){
                return {tos_agree : true};
              }
            })

            expect(ch.vm.is_valid).toBe(true);
          })
        })

        it("is false", () => {
          expect(checkout.vm.is_valid).toBe(false);
        })
      })

      describe("#plan_params", () => {
        describe(".membership_level", () => {
          it("is plan", () => {
            const ch = mount_vue(Checkout, {
              propsData: {
                plan: 'standard'
              },

              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            })

            expect(ch.vm.plan_params).not.toEqual({});
          })
        })

        describe(".membership_months", () => {
          it("is period", () => {
            const ch = mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
                period: 3
              },

              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            })

            expect(ch.vm.plan_params.membership_months).toEqual(3);
          })

          it("defaults to 1", () => {
            const ch = mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
              },

              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            })

            expect(ch.vm.plan_params.membership_months).toEqual(1);
          });
        })

        describe(".additional_filters", () => {
          it("is specified_filters", () => {
            const ch = mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
                period: 3,
                specified_filters: 2
              },

              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            })

            expect(ch.vm.plan_params.additional_filters).toBe(2);
          });
        })

        describe(".additional_sinks", () => {
          it("is specified_sinks", () => {
            const ch = mount_vue(Checkout, {
              propsData: {
                plan: 'standard',
                period: 3,
                specified_sinks: 2
              },

              computed: {
                membership_level: function(){
                  return 'basic'
                }
              }
            })

            expect(ch.vm.plan_params.additional_sinks).toBe(2);
          })
        })
      })
    })
  })

  describe("methods", () => {
    describe("#submit", () => {
      var server_api, purchase_plan, ch;

      beforeEach(function(){
        const response = {res: 'ponse'}

        server_api = {
          methods: {
            update_user: jest.fn().mockResolvedValue(response),
          }
        }

        purchase_plan = {
          methods: {
            purchase_plan_: jest.fn()
          }
        }

        ch = mount_vue(Checkout, {
          mixins: [server_api, purchase_plan],

          data : function(){
            return {use_existing_credit_card : true}
          }
        })
      })

      describe("!use_existing_credit_card", () => {
        it("updates user with credit_card_params", ()=> {
          ch.vm.submit();
          expect(server_api.methods.update_user).toHaveBeenCalledTimes(1);
          expect(server_api.methods.update_user.mock.calls[0][0]).toEqual({credit_card : ch.vm.credit_card_params})
        })

        it("purchases plan", async () => {
          ch.vm.submit();
          await flush_promises();
          expect(purchase_plan.methods.purchase_plan_).toHaveBeenCalledTimes(1)
        })

        describe("failed user update", () => {
          beforeEach(function(){
            server_api = {
              methods: {
                update_user: jest.fn().mockRejectedValue({body: {error: 'error1'}})
              }
            }

            ch = mount_vue(Checkout, {
              mixins: [server_api],
              data : function(){
                return {use_existing_credit_card : false}
              }
            });
          })

          it("alerts error", async() => {
            ch.vm.submit();
            await flush_promises();

            expect(window.alert).toHaveBeenCalledTimes(1);
            expect(window.alert.mock.calls[0][0]).toEqual('Could not process credit card: Error1')
          })
        })
      })

      describe("use_existing_credit_card", () => {
        it("purchases plan", async() => {
          ch.vm.use_existing_credit_card = true;
          await next_tick(ch);
          ch.vm.submit();
          expect(purchase_plan.methods.purchase_plan_).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe("#purchase_plan_", () => {
      var server_api, ch;

      beforeEach(function(){
        server_api = {
          methods: {
            purchase_plan: jest.fn().mockResolvedValue({res: 'ponse'})
          }
        }

        ch = mount_vue(Checkout, {
          mixins: [server_api]
        })
      })

      it("sends purchase plan request", async() => {
        ch.vm.purchase_plan_();
        expect(server_api.methods.purchase_plan).toHaveBeenCalledTimes(1);
        expect(server_api.methods.purchase_plan.mock.calls[0][0]).toEqual(ch.vm.plan_params)
      });

      describe("purchase success", () => {
        it("sets success true", async() => {
          ch.vm.purchase_plan_();
          await flush_promises();
          expect(ch.vm.success).toBe(true);
        })
      })

      describe("purchase failure", () => {
        beforeEach(function(){
          server_api = {
            methods: {
              purchase_plan: jest.fn().mockRejectedValue({body: {error: 'error1'}})
            }
          }

          ch = mount_vue(Checkout, {
            mixins: [server_api]
          })
        })

        it("alerts error", async() => {
          ch.vm.purchase_plan_();
          await flush_promises();
          expect(window.alert).toHaveBeenCalledTimes(1);
          expect(window.alert.mock.calls[0][0]).toEqual('Problem processing payment: Error1')
        })

        it("sets order_submitted to false", async() => {
          ch.vm.purchase_plan_();
          await flush_promises();
          expect(ch.vm.order_submitted).toBe(false);
        })
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Checkout, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    describe("plan is not set", () => {
      it("redirects to plan page", async() => {
        const ch = mount_vue(Checkout, {
          mixins : [server_api],
          propsData : {
            plan : ''
          }
        });

        expect(ch.vm.$route.path).toEqual("/plans")
      })
    })

    describe("specified_filters set", () => {
      it("sets enable_additional to true", () => {
        const ch = mount_vue(Checkout, {
          propsData : {
            plan : ziti.membership_levels[1],
            specified_filters : 2
          }
        })

        expect(ch.vm.enable_additional).toBe(true)
      })

      it("sets selected_additional_filters from specified_filters", () => {
        const ch = mount_vue(Checkout, {
          propsData : {
            plan : ziti.membership_levels[1],
            specified_filters : 2
          }
        })

        expect(ch.vm.selected_additional_filters).toBe(2)
      })
    })

    describe("specified_sinks set", () => {
      it("sets enable_additional to true", () => {
        const ch = mount_vue(Checkout, {
          propsData : {
            plan : ziti.membership_levels[1],
            specified_sinks : 2
          }
        })

        expect(ch.vm.enable_additional).toBe(true)
      })

      it("sets selected_additional_sinks from specified_sinks", () => {
        const ch = mount_vue(Checkout, {
          propsData : {
            plan : ziti.membership_levels[1],
            specified_sinks : 2
          }
        })

        expect(ch.vm.selected_additional_sinks).toBe(2)
      })
    })

    it("sets use_existing_credit_card from has_credit_card", async() => {
      const ch = mount_vue(Checkout, {
        computed: {
          has_credit_card: function(){
            return true
          }
        }
      });

      expect(ch.vm.use_existing_credit_card).toEqual(ch.vm.has_credit_card);
    })
  })
})
