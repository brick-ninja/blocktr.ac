import {shallow_mount_vue} from '../setup'

import FilterActions from '../../src/components/FilterActions'

describe("FilterActions", () => {
  describe("dom", () => {
    describe("!filter_page", () => {
      it("render live_link", () => {
        const fa = shallow_mount_vue(FilterActions, {
          computed : {
            is_filter_page : function(){
              return false;
            }
          }
        })

        expect(fa.find("#live_link")).toExist()
      })
    })

    describe("!test_page", () => {
      it("render test_link", () => {
        const fa = shallow_mount_vue(FilterActions, {
          computed : {
            is_test_page : function(){
              return false;
            }
          }
        })

        expect(fa.find("#test_link")).toExist()
      })
    })

    describe("#edit_link", () => {
      describe("click", () => {
        it("runs edit_filter action", () => {
          const run_action = {
            methods : {
              run_action : jest.fn()
            }
          }

          const fa = shallow_mount_vue(FilterActions, {
            mixins : [run_action]
          })

          const el = fa.find("#edit_link");
          el.trigger('click');
          expect(run_action.methods.run_action).toHaveBeenCalledTimes(1)
          expect(run_action.methods.run_action.mock.calls[0][0]).toEqual('edit_filter')
        })
      })
    })

    describe("#duplicate_link", () => {
      describe("click", () => {
        it("runs duplicate_filter action", () => {
          const run_action = {
            methods : {
              run_action : jest.fn()
            }
          }

          const fa = shallow_mount_vue(FilterActions, {
            mixins : [run_action]
          })

          const dl = fa.find("#duplicate_link");
          dl.trigger('click');
          expect(run_action.methods.run_action).toHaveBeenCalledTimes(1)
          expect(run_action.methods.run_action.mock.calls[0][0]).toEqual('duplicate_filter')
        })
      })
    })

    describe("#delete_link", () => {
      describe("click", () => {
        it("runs delete_filter action", () => {
          const run_action = {
            methods : {
              run_action : jest.fn()
            }
          }

          const fa = shallow_mount_vue(FilterActions, {
            mixins : [run_action]
          })

          const dl = fa.find("#delete_link");
          dl.trigger('click');
          expect(run_action.methods.run_action).toHaveBeenCalledTimes(1)
          expect(run_action.methods.run_action.mock.calls[0][0]).toEqual('delete_filter')
        })
      })
    })
  })

  describe("methods", () => {
    describe("#run_action", () => {
      it("hides parent", () => {
        const fa = shallow_mount_vue(FilterActions)
        fa.vm.$parent.hide = jest.fn();
        fa.vm.run_action('modal')
        expect(fa.vm.$parent.hide).toHaveBeenCalledTimes(1)
      })

      it("shows specified modal", () => {
        const fa = shallow_mount_vue(FilterActions)
        fa.vm.$bvModal.show = jest.fn();
        fa.vm.run_action('modal')
        expect(fa.vm.$bvModal.show).toHaveBeenCalledTimes(1)
        expect(fa.vm.$bvModal.show.mock.calls[0][0]).toEqual('modal')
      })
    })
  })
})
