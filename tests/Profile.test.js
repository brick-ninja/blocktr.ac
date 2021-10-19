import {
  mount_vue,
  next_tick,
  flush_promises
} from './setup'

import {stubbed_validatable} from './stubs'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import Profile from '../src/Profile.vue'

describe("Profile Page", () => {
  var profile

  beforeEach(function(){
    profile = mount_vue(Profile)
  })

  describe("dom", () => {
    describe("profile form", () => {
      describe("editing", () => {
        it("sets enable_controls = true", () => {
          profile.find("#profile_form").vm.$emit('editing')
          expect(profile.vm.enable_controls).toBe(true)
        })
      })

      describe("not editing", () => {
        it("enable_controls = false", () => {
          profile.find("#profile_form").vm.$emit('editing')
          profile.find("#profile_form").vm.$emit('not_editing')
          expect(profile.vm.enable_controls).toBe(false)
        })
      })

      describe("validated event", () => {
        it("validates", () => {
          const validatable = stubbed_validatable()
          profile = mount_vue(Profile, {
            mixins : [validatable]
          })

          profile.find("#profile_form").vm.$emit('validated')
          expect(profile.vm.enable_controls).toBe(false)
          expect(validatable.methods.validate).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe("controls wrapper", () => {
      describe("controls are enabled", () => {
        it("is rendered", async () => {
          profile.setData({enable_controls : true})
          await next_tick(profile);
          expect(profile.find("#controls_wrapper")).toBeVisible()
        })
      })

      describe("controls are not enabled", () => {
        it("is not rendered", async () => {
          profile.setData({enable_controls : false})
          await next_tick(profile);
          expect(profile.find("#controls_wrapper")).not.toBeVisible()
        })
      })

      describe("#profile_cancel", () => {

        describe("clicked", () => {
          it("resets form", async () => {
            const actions = {
              methods : {
                  reset_form : jest.fn()
              }
            }
            profile = mount_vue(Profile, {
              mixins : [actions]
            })

            profile.setData({enable_controls : true})
            await next_tick(profile);
            profile.find("#profile_cancel").trigger("click")
            expect(actions.methods.reset_form).toHaveBeenCalledTimes(1)
          })
        })
      })

      describe("#profile_save", () => {
        describe("clicked", () => {
          it("saves profile", async () => {
            const actions = {
              methods : {
                  reset_form : jest.fn()
              }
            }
            profile = mount_vue(Profile, {
              mixins : [actions]
            })

            profile.find("#profile_cancel").trigger("click")
            expect(actions.methods.reset_form).toHaveBeenCalledTimes(1)
          })
        })
      })
    })

    describe("CancelSubscriptionModal", () => {
      describe("cancelled", () => {
        test.todo("calls load_user")
      })
    })
  })

  describe("methods", () => {
    describe("#reset_form", () => {
      it("resets form", () => {
        profile.vm.$refs.form.reset = jest.fn();
        profile.vm.reset_form();
        expect(profile.vm.$refs.form.reset).toHaveBeenCalledTimes(1)
      })
    })

    describe("#save_profile", () => {
      var response, server_api;

      beforeEach(function(){
        response = {res : 'ponse'};

        server_api = {
          methods : {
            update_user : jest.fn().mockResolvedValue(response)
          }
        }

        profile = mount_vue(Profile, {
          mixins : [server_api]
        })
      })

      it("submits update_user request", () => {
        profile.vm.save_profile()
        expect(server_api.methods.update_user).toHaveBeenCalledTimes(1)
        expect(server_api.methods.update_user.mock.calls[0][0]).toEqual({})
      })

      describe("editing email", () => {
        it("specifies email", () => {
          profile.vm.$refs.form.editing_email = true;
          profile.vm.$refs.form.auth_email = 'em@ai.l';
          profile.vm.save_profile()
          expect(server_api.methods.update_user.mock.calls[0][0]).toEqual({email : 'em@ai.l'})
        })
      })

      describe("editing password", () => {
        it("specifies password", () => {
          profile.vm.$refs.form.editing_password = true;
          profile.vm.$refs.form.auth_password = 'pass.word';
          profile.vm.save_profile()
          expect(server_api.methods.update_user.mock.calls[0][0]).toEqual({password : 'pass.word'})
        })
      })

      describe("editing credit_card", () => {
        it("specifies credit_card", () => {
          profile.vm.$refs.form.credit_card_number = '12345';
          profile.vm.$refs.form.editing_credit_card = true;
          profile.vm.save_profile()
          expect(server_api.methods.update_user.mock.calls[0][0]).toEqual({credit_card : profile.vm.$refs.form.credit_card_params})
          expect(server_api.methods.update_user.mock.calls[0][0].credit_card.number).toEqual('12345')
        })
      })

      describe("successful response", () => {
        it("resets form", async () => {
          profile.vm.reset_form = jest.fn()
          profile.vm.save_profile()
          await flush_promises();
          expect(profile.vm.reset_form).toHaveBeenCalledTimes(1)
        })

        it("alerts success", async () => {
          profile.vm.save_profile()
          await flush_promises();
          expect(window.alert).toHaveBeenCalledTimes(1)
        })

        describe("editing password", () => {
          it("alerts password success", async () => {
            profile.vm.$refs.form.editing_password = true;
            profile.vm.save_profile()
            await flush_promises();
            expect(window.alert.mock.calls[0][0]).toEqual('Password was updated.\n')
          })
        })

        describe("editing credit_card", () => {
          it("alerts credit_card success", async () => {
            profile.vm.$refs.form.editing_credit_card = true;
            profile.vm.save_profile()
            await flush_promises();
            expect(window.alert.mock.calls[0][0]).toEqual('Credit card was updated.\n')
          })
        })

        describe("editing email", () => {
          it("alerts email success", async () => {
            profile.vm.$refs.form.editing_email = true;
            profile.vm.save_profile()
            await flush_promises();
            expect(window.alert.mock.calls[0][0]).toEqual('Confirmation code was sent to your new email')
          })
        })
      })

      describe("response failure", () => {
        var err;
        it("alerts error", async () => {
          err = {body : {error : 'error1'}}

          server_api = {
            methods : {
              update_user : jest.fn().mockRejectedValue(err)
            }
          }

          profile = mount_vue(Profile, {
            mixins : [server_api]
          })

          profile.vm.save_profile()
          await flush_promises();
          expect(window.alert).toHaveBeenCalledTimes(1);
          expect(window.alert.mock.calls[0][0]).toEqual('Could not save profile: Error1')
        })
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Profile, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    describe("not logged in", () => {
      it("redirects to /txs", () => {
        const profile = mount_vue(Profile, {
          mixins : [{
            computed : {
              logged_in : function(){
                return false;
              }
            }
          }]
        })

        expect(profile.vm.$route.path).toEqual("/txs")
      })
    })
  })
})
