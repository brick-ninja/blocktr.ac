import {
  shallow_mount_vue,
  next_tick
} from '../../setup'

import ForgotPassword from '../../../src/components/forms/ForgotPassword'

describe("ForgotPassword", () => {
  var fp

  beforeEach(function(){
    fp = shallow_mount_vue(ForgotPassword)
  })

  describe("dom", () => {
    describe("input", () => {
      var input

      beforeEach(function(){
        input = fp.find("input")
      })

      describe("enter event", () => {
        it("emits submit event", () => {
          input.trigger('keyup.enter')
          expect(fp.emitted().submit).toBeTruthy()
        })
      })

      it("is tied to auth_email", async () => {
        fp.vm.auth_email = 'foo@bar.com'
        await next_tick(fp)
        expect(input.element.value).toEqual('foo@bar.com')
      })
    })
  })

  describe("computed", () => {
    describe("#is_valid", () => {
      describe("have email", () => {
        it("is true", () => {
          fp = shallow_mount_vue(ForgotPassword, {
            computed : {
              have_email : function(){ return true }
            }
          })

          expect(fp.vm.is_valid).toBe(true)
        })
      })

      describe("do not have email", () => {
        it("is false", () => {
          fp = shallow_mount_vue(ForgotPassword, {
            computed : {
              have_email : function(){ return false }
            }
          })

          expect(fp.vm.is_valid).toBe(false)
        })
      })
    })
  })
})
