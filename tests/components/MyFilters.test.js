import {shallow_mount_vue} from '../setup'

import MyFilters from '../../src/components/MyFilters'

describe("MyFilters", () => {
  describe("dom", () => {
    describe("#my_filters_anon", () => {
      describe("logged in", () => {
        test.todo("is not rendered")
      })

      describe("not logged in", () => {
        test.todo("is rendered")
      })
    })

    describe("#my_filters_logged_in", () => {
      describe("logged in", () => {
        test.todo("is rendered")
      })

      describe("not logged in", () => {
        test.todo("is not rendered")
      })
    })

    describe("#add_new_filter", () => {
      describe("remaining_filters > 0", () => {
        it("is rendered", () => {
          const mf = shallow_mount_vue(MyFilters, {
            computed : {
              auth_token : function(){
                return 'auth_token';
              },

              remaining_filters : function(){
                return 1;
              }
            }
          })

          expect(mf.find("#add_new_filter")).toExist()
        })
      })

      describe("remaining_filters == 0", () => {
        it("is not rendered", () => {
          const mf = shallow_mount_vue(MyFilters, {
            computed : {
              auth_token : function(){
                return 'auth_token';
              },

              remaining_filters : function(){
                return 0;
              }
            }
          })

          expect(mf.find("#add_new_filter")).not.toExist()
        })
      })

      test.todo("launches create_filter modal")
    })

    describe("#remaining_filters", () => {
      it("renders remaining_filters_msg", () => {
        const mf = shallow_mount_vue(MyFilters, {
          computed : {
            auth_token : function(){
              return 'auth_token';
            },

            remaining_filters_msg : function(){
              return 'blah BLARG';
            }
          }
        })

        expect(mf.find("#remaining_filters").text()).toEqual("blah BLARG Get a pro account")
      })
    })

    describe("CreateFilterModal", () => {
      describe("created event", () => {
        test.todo("loads filters")
      })
    })
  })
})
