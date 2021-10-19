import {
  shallow_mount_vue,
  mount_vue,
  next_tick
} from '../../setup'

import {breakpoints} from '../../../src/mq'

import Profile from '../../../src/components/forms/Profile'

describe("Profile", () => {
  describe("dom", () => {
    describe("row[1]", () => {
      describe("!editing_email", () => {
        it("renders email", () => {
          const profile = shallow_mount_vue(Profile, {
            data : function(){
              return {
                editing_email : false
              }
            },

            computed : {
              email : function(){
                return 'emai.l'
              }
            }
          })

          expect(profile.find("#email_row b-col-stub:nth-child(2)").text()).toEqual(profile.vm.email)
        })
      })

      describe("editing_email", () => {
        describe("input", () => {
          it("is tied to auth_email", async () => {
            const profile = shallow_mount_vue(Profile, {
              data : function(){
                return {
                  editing_email : true
                }
              }
            })

            profile.setData({auth_email : 'foo@ba.r'})
            await next_tick(profile)
            expect(profile.find("#email_row input").element.value).toEqual('foo@ba.r')

            profile.find("#email_row input").setValue('bar@fo.o')
            await next_tick(profile)
            expect(profile.vm.auth_email).toEqual('bar@fo.o')
          })
        })
      })

      describe("form_error", () => {
        describe("invalid_email", () => {
          it("renders 'Invalid Email'", () => {
            const profile = shallow_mount_vue(Profile, {
              data : function(){
                return {
                  editing_email : true
                }
              },

              computed : {
                invalid_email : function(){
                  return true;
                }
              }
            });

            expect(profile.find("#email_row .form_error").text()).toEqual('Invalid Email')
          })
        })

        describe("!invalid_email", () => {
          it('does not render anything', () => {
            const profile = shallow_mount_vue(Profile, {
              data : function(){
                return {
                  editing_email : true
                }
              },

              computed : {
                invalid_email : function(){
                  return false;
                }
              }
            });

            expect(profile.find("#email_row .form_error").text()).toEqual('')
          })
        })
      })

      describe("mq > md", () => {
        beforeEach(function(){
          global.innerWidth = breakpoints.md + 1;
        })

        describe("!editing email", () => {
          var profile;

          beforeEach(async function(){
            // XXX: fully mount required to trigger click
            profile = mount_vue(Profile, {
              data : function(){
                return {
                  editing_email : false
                }
              }
            })

            await next_tick(profile);
          })

          it("render 'Update' email", () => {
            expect(profile.find("#email_row .action").text()).toEqual('Update')
          })

          describe("clicked", () => {
            it("sets editing_email = true", async () => {
              await profile.find("#email_row .action").trigger("click")
              expect(profile.vm.editing_email).toBe(true)
            })
          })
        })

        describe("editing email", () => {
          var profile;

          beforeEach(async function(){
            // XXX: fully mount required to trigger click
            profile = mount_vue(Profile, {
              data : function(){
                return {
                  editing_email : true
                }
              }
            })

            await next_tick(profile);
          })

          it("render 'Cancel' email update", () => {
            expect(profile.find("#email_row .action").text()).toEqual('Cancel')
          })

          describe("clicked", () => {
            it("sets editing_email = false", async () => {
              await profile.find("#email_row .action").trigger("click")
              expect(profile.vm.editing_email).toBe(false)
            })
          })
        })
      })

      describe("mq <= md", () => {
        var profile;

        beforeEach(async function(){
          global.innerWidth = breakpoints.md - 1;

          // XXX: fully mount required to trigger click
          profile = mount_vue(Profile, {
            data : function(){
              return {
                editing_email : true
              }
            }
          })

          await next_tick(profile);
        })

        it("renders pencil blue", () => {
          expect(profile.find("#email_row .action img").attributes('src')).toEqual('../../assets/pencil-blue.svg')
        })

        describe("clicked", () => {
          it("editing_email = !editing_email", async () => {
            await profile.find("#email_row .action").trigger("click")
            expect(profile.vm.editing_email).toBe(false)

            await profile.find("#email_row .action").trigger("click")
            expect(profile.vm.editing_email).toBe(true)
          })
        })
      })
    })

    describe("row[2]", () => {
      describe("!editing_password", () => {
        test.todo("renders ******")
      })

      describe("editing_password", () => {
        describe("input", () => {
          test.todo("tied to auth_password")
        })
      })

      describe("weak_password", () => {
        describe("form_error", () => {
          test.todo("renders 'Weak password'")
        })
      })

      describe("mq > md", () => {
        describe("!editing email", () => {
          test.todo("render 'Change' Password")

          describe("clicked", () => {
            test.todo("editing_password = true")
          })
        })

        describe("editing password", () => {
          test.todo("render 'Cancel' password update")

          describe("clicked", () => {
            test.todo("editing_password = false")
          })
        })
      })

      describe("mq <= md", () => {
        test.todo("render pencil blue")

        describe("clicked", () => {
          test.todo("editing_password = !editing_password")
        })
      })
    })

    describe("row[3]", () => {
      describe("editing_password", () => {
        describe("input", () => {
          test.todo("tied to auth_password_confirm")
        })
      })

      describe("password_mismatch", () => {
        describe("form_error", () => {
          test.todo("renders 'Passwords do not match'")
        })
      })
    })

    describe("row[5]", () => {
      test.todo("renders membership_level")

      describe("mq > md", () => {
        describe("!is_premium_member", () => {
          test.todo("renders 'Change plan' link")
        })

        describe("!is_basic_member", () => {
          test.todo("renders 'Cancel subscription' link")
        })
      })

      describe("mq <= md", () => {
        describe("!is_premium_member", () => {
          test.todo("renders blue pencil change plan link")
        })

        describe("!is_basic_member", () => {
          test.todo("renders red x cancel subscription link")
        })
      })
    })

    describe("row[7]", () => {
      describe("!editing_credit_card", () => {
        test.todo("renders ******")
      })

      describe("editing_credit_card", () => {
        describe("#credit_card_number", () => {
          test.todo("tied to credit_card_number")
        })
      })

      describe("invalid_credit_card_number", () => {
        describe("form_error", () => {
          test.todo("renders credit card number error")
        })
      })

      describe("mq > md", () => {
        describe("!editing email", () => {
          test.todo("render 'Update ")

          describe("clicked", () => {
            test.todo("editing_credit_card = true")
          })
        })

        describe("editing password", () => {
          test.todo("render 'Cancel'")

          describe("clicked", () => {
            test.todo("editing_credit_card = false")
          })
        })
      })

      describe("mq <= md", () => {
        test.todo("render pencil blue")

        describe("clicked", () => {
          test.todo("editing_credit_card = !editing_credit_card")
        })
      })
    })

    describe("row[8]", () => {
      describe("editing_credit_card", () => {
        describe("#credit_card_cvc", () => {
          test.todo("tied to credit_card_cvc")
        })
      })

      describe("invalid_credit_card_cvc", () => {
        describe("form_error", () => {
          test.todo("renders credit card cvc error")
        })
      })
    })

    describe("row[9]", () => {
      describe("editing_credit_card", () => {
        describe("#credit_card_month", () => {
          test.todo("tied to #credit_card_month")
        })

        describe("#credit_card_year", () => {
          test.todo("tied to #credit_card_year")
        })
      })
    })
  })

  describe("computed", () => {
    describe("#editing_fields", () => {
      describe("editing_email", () => {
        it("is true", () => {
          const profile = shallow_mount_vue(Profile, {
            data : function(){
              return {editing_email : true}
            }
          })

          expect(profile.vm.editing_fields).toBe(true)
        })
      })

      describe("editing_password", () => {
        it("is true", () => {
          const profile = shallow_mount_vue(Profile, {
            data : function(){
              return {editing_password : true}
            }
          })

          expect(profile.vm.editing_fields).toBe(true)
        })
      })

      describe("editing_credit_card", () => {
        it("is true", () => {
          const profile = shallow_mount_vue(Profile, {
            data : function(){
              return {editing_credit_card : true}
            }
          })

          expect(profile.vm.editing_fields).toBe(true)
        })
      })

      describe("!editing_email && !editing_password && !editing_credit_card", () => {
        it("is false", () => {
          const profile = shallow_mount_vue(Profile)
          expect(profile.vm.editing_fields).toBe(false);
        })
      })
    })

    describe("#is_valid_email", () => {
      describe("!editing_email", () => {
        it("is true", () => {
          const profile = shallow_mount_vue(Profile)
          expect(profile.vm.is_valid_email).toBe(true)
        })
      })

      describe("editing_email && have_email && !invalid_email", () => {
        it("is true", () => {
          const profile = shallow_mount_vue(Profile, {
            data : function(){
              return {editing_email : true}
            },

            computed : {
              have_email : function(){
                return true;
              },

              invalid_email : function(){
                return false
              }
            }
          })

          expect(profile.vm.is_valid_email).toBe(true)
        })
      })

      describe("editing_email && !have_email", () => {
        it("is false", () => {
          const profile = shallow_mount_vue(Profile, {
            data : function(){
              return {editing_email : true}
            },

            computed : {
              have_email : function(){
                return false;
              }
            }
          })

          expect(profile.vm.is_valid_email).toBe(false)
        })
      })

      describe("editing_email && have_email && invalid_email", () => {
        it("is false", () => {
          const profile = shallow_mount_vue(Profile, {
            data : function(){
              return {editing_email : true}
            },

            computed : {
              have_email : function(){
                return true;
              },

              invalid_email : function(){
                return true;
              }
            }
          })

          expect(profile.vm.is_valid_email).toBe(false)
        })
      })
    })

    describe("#is_valid_password", () => {
      describe("!editing_password", () => {
        test.todo("is true")
      })

      describe("have_passwords && !invalid_passwords", () => {
        test.todo("is true")
      })

      describe("editing_password && !have_passwords || invalid_passwords", () => {
        test.todo("is false")
      })
    })

    describe("#is_valid_credit_card", () => {
      describe("!editing_credit_card", () => {
        test.todo("is true")
      })

      describe("have_credit_card_number && !invalid_credit_card_number && have_credit_card_cvc && !invalid_credit_card_cvc", () => {
        test.todo("is true")
      })

      describe("editing_credit_card && !have_credit_card_number || invalid_credit_card_number || !have_credit_card_cvc || invalid_credit_card_cvc", () => {
        test.todo("is false")
      })
    })

    describe("#is_valid", () => {
      describe("!valid_email", () => {
        test.todo("is false")
      })

      describe("!valid_password", () => {
        test.todo("is false")
      })

      describe("!valid_credit_card", () => {
        test.todo("is false")
      })

      describe("valid_email && valid_password && valid_credit_card", () => {
        test.todo("is true")
      })
    })
  })

  describe("watch", () => {
    describe("editing_email", () => {
      it("sets auth_email to ''", async () => {
        const profile = shallow_mount_vue(Profile)
        profile.setData({auth_email : "auth@ema.il"})
        expect(profile.vm.auth_email).toEqual('auth@ema.il')

        profile.vm.editing_email = true;
        await next_tick(profile)
        expect(profile.vm.auth_email).toEqual('')
      })
    })

    describe("editing_password", () => {
      it("sets auth_password to ''", async () => {
        const profile = shallow_mount_vue(Profile)
        profile.setData({auth_password : "auth_password"})
        expect(profile.vm.auth_password).toEqual('auth_password')

        profile.vm.editing_password = true;
        await next_tick(profile)
        expect(profile.vm.auth_password).toEqual('')
      })

      it("sets auth_password_confirm to ''", async () => {
        const profile = shallow_mount_vue(Profile)
        profile.setData({auth_password_confirm : "auth_password_confirm"})
        expect(profile.vm.auth_password_confirm).toEqual('auth_password_confirm')

        profile.vm.editing_password = true;
        await next_tick(profile)
        expect(profile.vm.auth_password_confirm).toEqual('')
      })
    })

    describe("editing_credit_card", () => {
      it("sets credit_card_number to ''", async () => {
        const profile = shallow_mount_vue(Profile)
        profile.setData({credit_card_number : "12345"})
        expect(profile.vm.credit_card_number).toEqual('12345')

        profile.vm.editing_credit_card = true;
        await next_tick(profile)
        expect(profile.vm.credit_card_number).toEqual('')
      })

      it("sets credit_card_cvc to ''", async () => {
        const profile = shallow_mount_vue(Profile)
        profile.setData({credit_card_cvc : "12345"})
        expect(profile.vm.credit_card_cvc).toEqual('12345')

        profile.vm.editing_credit_card = true;
        await next_tick(profile)
        expect(profile.vm.credit_card_cvc).toEqual('')
      })
    })

    describe("editing_fields", () => {
      describe("editing_fields", () => {
        it("emits 'editing'", async () => {
          const profile = shallow_mount_vue(Profile, {
            computed : {
              editing_fields : function(){
                return true;
              }
            }
          })

          profile.vm.$options.watch.editing_fields[0].call(profile.vm)
          expect(profile.emitted().editing).toBeTruthy()
        })
      })

      describe("not editing_fields", () => {
        it("emits 'not_editing'", async () => {
          const profile = shallow_mount_vue(Profile, {
            computed : {
              editing_fields : function(){
                return false;
              }
            }
          })

          profile.vm.$options.watch.editing_fields[0].call(profile.vm)
          expect(profile.emitted().not_editing).toBeTruthy();
        })
      })
    })
  })

  describe("methods", () => {
    var profile;

    beforeEach(function(){
      profile = shallow_mount_vue(Profile, {
        data : function(){
          return {
                  editing_email : true,
               editing_password : true,
            editing_credit_card : true
          }
        }
      })
    })

    describe("#reset", () => {
      it("sets editing_email to false", () => {
        profile.vm.reset();
        expect(profile.vm.editing_email).toBe(false)
      })

      it("sets editing_password to false", () => {
        profile.vm.reset();
        expect(profile.vm.editing_password).toBe(false)
      })

      it("sets editing_credit_card to false", () => {
        profile.vm.reset();
        expect(profile.vm.editing_credit_card).toBe(false)
      })
    })
  })

  describe("#created", () => {
    it("sets auth_email to ''", () => {
      const profile = shallow_mount_vue(Profile, {
        data : function(){
          return {
            auth_email : 'auth@ema.il'
          }
        }
      })

      expect(profile.vm.auth_email).toEqual('')
    })
  })
})
