import {shallow_mount_vue} from '../setup'
import Blockchain from '../../src/mixins/blockchain'

const Component = {
  render() {},
  mixins : [Blockchain]
}

describe("network mixin", () => {
  describe("computed", () => {
    describe("configured_blockchain_upper", () => {
      it("upper case version of the configured blockchain", () => {
        const component = shallow_mount_vue(Component, {
          computed : {
            configured_blockchain : function(){
              return 'xrp';
            }
          }
        })

        expect(component.vm.configured_blockchain_upper).toEqual("XRP")
      })
    })

    describe("blockchain_configured", () => {
      describe("configured_blockchain is null", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return null;
              }
            }
          })

          expect(component.vm.blockchain_configured).toBe(false);
        })
      })

      describe("configured_blockchain is not null", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xrp';
              }
            }
          })

          expect(component.vm.blockchain_configured).toBe(true);
        })
      })
    })

    describe("no_blockchain_configured", () => {
      describe("configured_blockchain is null", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return null;
              }
            }
          })

          expect(component.vm.no_blockchain_configured).toBe(true);
        })
      })

      describe("configured_blockchain is not null", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xrp';
              }
            }
          })

          expect(component.vm.no_blockchain_configured).toBe(false);
        })
      })
    })

    describe("xrp_configured", () => {
      describe("configured_blockchain == 'xrp'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xrp';
              }
            }
          })

          expect(component.vm.xrp_configured).toBe(true);
        })
      })

      describe("configured_blockchain != 'xrp'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xlm';
              }
            }
          })

          expect(component.vm.xrp_configured).toBe(false);
        })
      })
    })

    describe("xlm_configured", () => {
      describe("configured_blockchain == 'xlm'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xlm';
              }
            }
          })

          expect(component.vm.xlm_configured).toBe(true);
        })
      })

      describe("configured_blockchain != 'xlm'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xrp';
              }
            }
          })

          expect(component.vm.xlm_configured).toBe(false);
        })
      })
    })

    describe("btc_configured", () => {
      describe("configured_blockchain == 'btc'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'btc';
              }
            }
          })

          expect(component.vm.btc_configured).toBe(true);
        })
      })

      describe("configured_blockchain != 'btc'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xlm';
              }
            }
          })

          expect(component.vm.btc_configured).toBe(false);
        })
      })
    })

    describe("eth_configured", () => {
      describe("configured_blockchain == 'eth'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'eth';
              }
            }
          })

          expect(component.vm.eth_configured).toBe(true);
        })
      })

      describe("configured_blockchain != 'eth'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xlm';
              }
            }
          })

          expect(component.vm.eth_configured).toBe(false);
        })
      })
    })

    ///

    describe("selected_blockchain", () => {
      it("is selected blockchain from store", () => {
        const component = shallow_mount_vue(Component)
        component.vm.$store.commit('set_selected_blockchain', 'xrp')
        expect(component.vm.selected_blockchain).toEqual('xrp')
      })
    })

    describe("selected_blockchain_upper", () => {
      it("is selected blockchain upper case", () => {
        const component = shallow_mount_vue(Component)
        component.vm.$store.commit('set_selected_blockchain', 'xrp')
        expect(component.vm.selected_blockchain_upper).toEqual('XRP')
      })
    })

    describe("xrp_selected", () => {
      describe("selected_blockchain == 'xrp'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'xrp')
          expect(component.vm.xrp_selected).toEqual(true)
        })
      })

      describe("selected_blockchain != 'xrp'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'xlm')
          expect(component.vm.xrp_selected).toEqual(false)
        })
      })
    })

    describe("xlm_selected", () => {
      describe("selected_blockchain == 'xlm'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'xlm')
          expect(component.vm.xlm_selected).toEqual(true)
        })
      })

      describe("selected_blockchain != 'xlm'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'xrp')
          expect(component.vm.xlm_selected).toEqual(false)
        })
      })
    })

    describe("btc_selected", () => {
      describe("selected_blockchain == 'btc'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'btc')
          expect(component.vm.btc_selected).toEqual(true)
        })
      })

      describe("selected_blockchain != 'btc'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'xlm')
          expect(component.vm.btc_selected).toEqual(false)
        })
      })
    })

    describe("eth_selected", () => {
      describe("selected_blockchain == 'eth'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'eth')
          expect(component.vm.eth_selected).toEqual(true)
        })
      })

      describe("selected_blockchain != 'eth'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'xlm')
          expect(component.vm.eth_selected).toEqual(false)
        })
      })
    })

    ///

    describe("active_blockchain", () => {
      describe("blockchain configured", () => {
        it("is configured blockchain", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_blockchain : function(){
                return 'xrp';
              }
            }
          })

          expect(component.vm.active_blockchain).toEqual("xrp")
        })
      })

      describe("no blockchain configured", () => {
        it("is selected blockchain", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$store.commit('set_selected_blockchain', 'xrp')
          expect(component.vm.active_blockchain).toEqual('xrp')
        })
      })
    })

    describe("active_blockchain_upper", () => {
      it("is active_blockchain upper case", () => {
        const component = shallow_mount_vue(Component, {
          computed : {
            active_blockchain : function(){
              return 'xrp';
            }
          }
        })

        expect(component.vm.active_blockchain_upper).toEqual("XRP")
      })
    })

    describe("xrp_active", () => {
      describe("active_blockchain == 'xrp'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              active_blockchain : function(){
                return 'xrp';
              }
            }
          })

          expect(component.vm.xrp_active).toEqual(true);
        })
      })

      describe("active_blockchain != 'xrp'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              active_blockchain : function(){
                return 'xlm';
              }
            }
          })

          expect(component.vm.xrp_active).toEqual(false);
        })
      })
    })

    describe("xlm_active", () => {
      describe("active_blockchain == 'xlm'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              active_blockchain : function(){
                return 'xlm';
              }
            }
          })

          expect(component.vm.xlm_active).toEqual(true);
        })
      })

      describe("active_blockchain != 'xlm'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              active_blockchain : function(){
                return 'xrp';
              }
            }
          })

          expect(component.vm.xlm_active).toEqual(false);
        })
      })
    })

    describe("btc_active", () => {
      describe("active_blockchain == 'btc'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              active_blockchain : function(){
                return 'btc';
              }
            }
          })

          expect(component.vm.btc_active).toEqual(true);
        })
      })

      describe("active_blockchain != 'btc'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              active_blockchain : function(){
                return 'xlm';
              }
            }
          })

          expect(component.vm.btc_active).toEqual(false);
        })
      })
    })

    describe("eth_active", () => {
      describe("active_blockchain == 'eth'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              active_blockchain : function(){
                return 'eth';
              }
            }
          })

          expect(component.vm.eth_active).toEqual(true);
        })
      })

      describe("active_blockchain != 'eth'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              active_blockchain : function(){
                return 'xlm';
              }
            }
          })

          expect(component.vm.eth_active).toEqual(false);
        })
      })
    })

    ///

    describe("blockchain_icon", () => {
      test.todo("is ../assets/currencies/active_blockchain_upper.svg")
    })

    describe("blockchain_jsonpath_examples", () => {
      test.todo("is jsonpath_examples for active_blockchain")
    })

    describe("blockchain_jsonpath_example", () => {
      test.todo("is first jsonpath_example for active_blockchain")
    })

    describe("blockchain_jsonpath_help_examples", () => {
      test.todo("is jsonpath_help_examples for active_blockchain")
    })

    describe("blockchain_jsonpath_dot_notation_example", () => {
      test.todo("is jsonpath_dot_notation_example for active_blockchain")
    })

    describe("blockchain_jsonpath_bracket_notation_example", () => {
      test.todo("is jsonpath_bracket_notation_example for active_blockchain")
    })

    describe("blockchain_jsonpath_script_expression_example", () => {
      test.todo("is jsonpath_script_expression_example for active_blockchain")
    })

    describe("blockchain_jsonpath_filter_expression_example", () => {
      test.todo("is jsonpath_filter_expression_example for active_blockchain")
    })

    describe("blockchain_jsonpath_expression_example1", () => {
      test.todo("is jsonpath_expression_example1 for active_blockchain")
    })

    describe("blockchain_jsonpath_expression_example1_explanation", () => {
      test.todo("is jsonpath_expression_example1_explanation for active_blockchain")
    })

    describe("blockchain_jsonpath_expression_example2", () => {
      test.todo("is jsonpath_expression_example2 for active_blockchain")
    })

    describe("blockchain_jsonpath_expression_example2_explanation", () => {
      test.todo("is jsonpath_expression_example2_explanation for active_blockchain")
    })

    describe("blockchain_jsonpath_expression_example3", () => {
      test.todo("is jsonpath_expression_example3 for active_blockchain")
    })

    describe("blockchain_jsonpath_expression_example3_explanation", () => {
      test.todo("is jsonpath_expression_example3_explanation for active_blockchain")
    })

    describe("blockchain_description", () => {
      test.todo("is description for active blockchain")
    })

    describe("blockchain_moreinfo", () => {
      test.todo("is moreinfo for active blockchain")
    })
  })
})
