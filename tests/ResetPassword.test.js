import {
  mount_vue,
  next_tick,
  flush_promises
} from './setup'

import {
  stubbed_validatable,
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import ResetPassword from '../src/ResetPassword.vue'

describe("ResetPassword Page", () => {
  describe("dom", () => {
    describe("reset password form", () => {
      describe("validated event", () => {
        it("validates", () => {
          const validatable = stubbed_validatable()
          const rp = mount_vue(ResetPassword, {
            mixins : [validatable],
            propsData : {code : 'code'}
          })

          rp.find("#reset_password_form").vm.$emit('validated')
          expect(validatable.methods.validate).toHaveBeenCalledTimes(1)
        })
      })

      describe("submit event", () => {
        it("submits", () => {
          const submit = {
            methods : {
              submit : jest.fn()
            }
          }

          const rp = mount_vue(ResetPassword, {
            mixins : [submit],
            propsData : {code : 'code'}
          })

          rp.find("#reset_password_form").vm.$emit('submit')
          expect(submit.methods.submit).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe("reset button", () => {
      describe("clicked", () => {
        it("submits", async () => {
          const submit = {
            methods : {
              submit : jest.fn()
            }
          }

          const rp = mount_vue(ResetPassword, {
            mixins : [submit],
            propsData : {code : 'code'}
          })

          // XXX: enable button
          rp.setData({is_valid : true})
          await next_tick(rp)

          await rp.find("#reset button").trigger('click')
          expect(submit.methods.submit).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe("methods", () => {
    describe("#submit", () => {
      describe("not valid", () => {
        it("does nothing, just returns", () => {
          const server_api = {
            methods : {
              reset_password : jest.fn()
            }
          }

          const rp = mount_vue(ResetPassword, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          rp.setData({is_valid : false})
          rp.vm.submit();
          expect(server_api.methods.reset_password).not.toHaveBeenCalled();
        })
      })

      it("submits reset_password request", () => {
        const server_api = {
          methods : {
            reset_password : jest.fn().mockResolvedValue({})
          }
        }

        const rp = mount_vue(ResetPassword, {
          mixins : [server_api],
          propsData : {code : 'code'}
        })
        rp.find("#reset_password_form").setData({auth_password : 'password'})

        rp.setData({is_valid : true})
        rp.vm.submit();
        expect(server_api.methods.reset_password).toHaveBeenCalledTimes(1);
        expect(server_api.methods.reset_password.mock.calls[0][0]).toEqual({code : 'code', password : 'password'})
      })

      describe("successful response", () => {
        it("alerts success", async () => {
          const server_api = {
            methods : {
              reset_password : jest.fn().mockResolvedValue({})
            }
          }

          const rp = mount_vue(ResetPassword, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          rp.setData({is_valid : true})
          rp.vm.submit();
          await flush_promises()
          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Password successfully reset")
        })

        it("redirects to /txs", async () => {
          const server_api = {
            methods : {
              reset_password : jest.fn().mockResolvedValue({})
            }
          }

          const rp = mount_vue(ResetPassword, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          rp.setData({is_valid : true})
          rp.vm.submit();
          await flush_promises()
          expect(rp.vm.$route.path).toEqual("/txs")
        })
      })

      describe("failed response", () => {
        it("alerts err", async () => {
          const server_api = {
            methods : {
              reset_password : jest.fn().mockRejectedValue({body : { error : 'err1' }})
            }
          }

          const rp = mount_vue(ResetPassword, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          rp.setData({is_valid : true})
          rp.vm.submit();
          await flush_promises()
          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not reset password: Err1")
        })

        it("redirects to /txs", async () => {
          const server_api = {
            methods : {
              reset_password : jest.fn().mockRejectedValue({body : { error : 'err1' }})
            }
          }

          const rp = mount_vue(ResetPassword, {
            mixins : [server_api],
            propsData : {code : 'code'}
          })

          rp.setData({is_valid : true})
          rp.vm.submit();
          await flush_promises()
          expect(rp.vm.$route.path).toEqual("/txs")
        })
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(ResetPassword, {
          mixins : [_maintenance_mode],
          propsData : {code : 'code'}
        })
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })
  })
})
