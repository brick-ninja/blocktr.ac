import {shallow_mount_vue} from "../setup"

import MainNav from '../../src/components/MainNav'

describe("MainNav", () => {
  describe("dom", () => {
    describe("logged_in", () => {
      var mn;

      beforeEach(function(){
        mn = shallow_mount_vue(MainNav, {
          computed : {
            logged_in : function(){ return true;  }
          }
        });
      })

      describe("#main_nav", () => {
        it("is .logged_in", () => {
          expect(mn.find("#main_nav").classes()).toContain("logged_in")
        })
      })

      describe("#membership_level_link_container", () => {
        it("is rendered", () => {
          expect(mn.find("#membership_level_link_container")).toExist()
        })
      })

      describe("hamburger", () => {
        var auth;

        beforeEach(function(){
          auth = {
            methods : {
              logout : jest.fn()
            }
          }

          mn = shallow_mount_vue(MainNav, {
            propsData : {hamburger : true},
            mixins : [auth],
            computed : {
              logged_in : function(){ return true;  }
            }
          });
        })

        describe("#profile_link", () => {
          it("is rendered", () => {
            expect(mn.find("#profile_link")).toExist()
          })
        })

        describe("#logout_link", () => {
          it("is rendered", () => {
            expect(mn.find("#logout_link")).toExist()
          })

          describe("click event", () => {
            it("emits nav event", async () => {
              await mn.find("#logout_link").trigger('click')
              expect(mn.emitted().nav).toBeTruthy()
            })

            it("calls logout", async () => {
              await mn.find("#logout_link").trigger('click')
              expect(auth.methods.logout).toHaveBeenCalledTimes(1)
            })
          })
        })
      })

      describe("!hamburger", () => {
        beforeEach(function(){
          mn = shallow_mount_vue(MainNav, {
            propsData : {hamburger : false},
            computed : {
              logged_in : function(){ return true;  }
            }
          });
        })

        describe("#my_account_container", () => {
          it("is rendered", () => {
            expect(mn.find("#my_account_container")).toExist()
          })
        })
      })
    })

    describe("!logged_in", () => {
      var mn;

      beforeEach(function(){
        mn = shallow_mount_vue(MainNav, {
          computed : {
            logged_in : function(){ return false;  }
          }
        });
      })

      describe("#login_link", () => {
        it("is rendered", () => {
          expect(mn.find("#login_link")).toExist();
        })

        test.todo("launches login modal")

        describe("click event", () => {
          it("emits nav event", async () => {
            await mn.find("#login_link").trigger('click')
            expect(mn.emitted().nav).toBeTruthy()
          })
        })
      })

      describe("#register_link", () => {
        it("is rendered", () => {
          expect(mn.find("#register_link")).toExist();
        })

        test.todo("it launches register modal")

        describe("click event", () => {
          it("emits nav event", async () => {
            await mn.find("#register_link").trigger('click')
            expect(mn.emitted().nav).toBeTruthy()
          })
        })
      })
    })

    describe("#membership_level_link_container", () => {
      describe("is_premium_member", () => {
        test.todo("is .premium")
      })
    })

    describe("#membership_level_link", () => {
      test.todo("contains membership_level text")
    })

    describe("#my_account_link", () => {
      describe("my_account_visible", () => {
        test.todo("renders arrow-down-gray")
      })

      describe("!my_account_visible", () => {
        test.todo("renders arrow-up-blue")
      })
    })

    describe("#my_account_popover", () => {
      describe("show event", () => {
        test.todo("calls my_account_show")
      })

      describe("hide event", () => {
        test.todo("calls my_account_hide")
      })

      describe("#logout_link", () => {
        describe("click event", () => {
          test.todo("emits close event")
          test.todo("calls logout")
        })
      })
    })
  })

  describe("methods", () => {
    var mn;

    beforeEach(function(){
      mn = shallow_mount_vue(MainNav);
    })

    describe("my_account_show", () => {
      it("sets my_account_visisble to true", () => {
        mn.vm.my_account_show();
        expect(mn.vm.my_account_visible).toBe(true);
      })
    })

    describe("my_account_hide", () => {
      it("sets my_account_visisble to false", () => {
        mn.vm.my_account_visible = true;
        mn.vm.my_account_hide();
        expect(mn.vm.my_account_visible).toBe(false);
      })
    })
  })
})
