import zxcvbn  from "zxcvbn"

import {
  shallow_mount_vue,
  flush_promises
} from '../setup'

import {stubbed_htttp} from '../stubs'
import Authentication from '../../src/mixins/authentication'

import config from '../../src/config/config'
import ziti   from '../../src/config/ziti'

const Component = {
  render() {},
  mixins : [Authentication]
}

describe("authentication", () => {
  var component, htttp

  beforeEach(() => {
    component = shallow_mount_vue(Component)

    htttp = stubbed_htttp();
    component.vm.$htttp = function(){
      return htttp;
    }
  })

  describe("computed", () => {
    describe("#backend_url", () => {
      it("is config.BACKEND_URL", () => {
        expect(component.vm.backend_url).toEqual(config.BACKEND_URL)
      })
    })

    describe("#auth_token", () => {
      it("is authToken cookie", () => {
        component.vm.$setCookie('authToken', 'foobar')
        expect(component.vm.auth_token).toEqual('foobar')
      })
    })

    describe("#auth_header", () => {
      it("constructs authorization header from auth_token", () => {
        component.vm.$setCookie('authToken', 'foobar')
        expect(component.vm.auth_header).toEqual({headers : {authorization : 'foobar'}})
      })
    })

    describe("#logged_in", () => {
      describe("have auth token", () => {
        it("is true", () => {
          component.vm.$setCookie('authToken', 'foobar')
          expect(component.vm.logged_in).toBe(true)
        })
      })

      describe("do not have auth token", () => {
        it("is false", () => {
          expect(component.vm.logged_in).toBe(false)
        })
      })
    })

    describe("#email", () => {
      it("is store.user.email", () => {
        component.vm.$store.commit('set_user', {email : 'e@ma.il'})
        expect(component.vm.email).toEqual('e@ma.il')
      })
    })

    describe("#profile", () => {
      it("is store.user.profile", () => {
        component.vm.$store.commit('set_user', {profile : {pro : 'file'}})
        expect(component.vm.profile).toEqual({pro : 'file'})
      })
    })

    describe("#renewal_date", () => {
      it("is store.user.renewal_date", () => {
        const now = new Date();
        component.vm.$store.commit('set_user', {renewal_date : now})
        expect(component.vm.renewal_date).toEqual(now)
      })
    })

    describe("#has_credit_card", () => {
      it("is store.user.has_credit_card", () => {
        component.vm.$store.commit('set_user', {has_credit_card : true})
        expect(component.vm.has_credit_card).toBe(true)
      })
    })

    describe("#privileges", () => {
      it("is store.user.privileges", () => {
        component.vm.$store.commit('set_user', {Privileges : ['p1', 'p2']})
        expect(component.vm.privileges).toEqual(['p1', 'p2'])
      })
    })

    describe("#membership_level", () => {
      it("is store.user.membership_level", () => {
        component.vm.$store.commit('set_user', {membership_level : 'membership_level'})
        expect(component.vm.membership_level).toEqual('membership_level')
      })
    })

    describe("#is_basic_member", () => {
      describe("membership_level == 'basic'", () => {
        it("is true", () => {
          component.vm.$store.commit('set_user', {membership_level : 'basic'})
          expect(component.vm.is_basic_member).toBe(true)
        })
      })

      describe("membership_level != 'basic'", () => {
        it("is false", () => {
          component.vm.$store.commit('set_user', {membership_level : 'premium'})
          expect(component.vm.is_basic_member).toBe(false)
        })
      })
    })

    describe("#is_premium_member", () => {
      describe("membership_level == 'premium'", () => {
        it("is true", () => {
          component.vm.$store.commit('set_user', {membership_level : 'premium'})
          expect(component.vm.is_premium_member).toBe(true)
        })
      })

      describe("membership_level != 'premium'", () => {
        it("is false", () => {
          component.vm.$store.commit('set_user', {membership_level : 'basic'})
          expect(component.vm.is_premium_member).toBe(false)
        })
      })
    })

    describe("#membership_features", () => {
      it("is membership_level's features", () => {
        component.vm.$store.commit('set_user', {membership_level : 'basic'})
        expect(component.vm.membership_features).toEqual(ziti.membership_features['basic'])
      })
    })

    describe("#additional_filters", () => {
      it("is store.user.additional_filters", () => {
        component.vm.$store.commit('set_user', {additional_filters : 5})
        expect(component.vm.additional_filters).toBe(5)
      })
    })

    describe("#authorized_filters", () => {
      it("is membership_features.filters + additional_filters + additional_filters privilege", () => {
        component.vm.$store.commit('set_user', {
          membership_level : 'basic',
          additional_filters : 5,
          Privileges : [
            {
              type : 'additional_filters',
              value : "7"
            }
          ]
        })

        expect(component.vm.authorized_filters).toEqual(ziti.membership_features['basic'].filters + 5 + 7)
      })
    })

    describe("#additional_sinks", () => {
      it("is store.user.additional_sinks", () => {
        component.vm.$store.commit('set_user', {additional_sinks : 5})
        expect(component.vm.additional_sinks).toBe(5)
      })
    })

    describe("#authroized_sinks", () => {
      it("is membership_features.sinks + additional_sinks + additional_sinks privilege", () => {
        component.vm.$store.commit('set_user', {
          membership_level : 'basic',
          additional_sinks : 5,
          Privileges : [
            {
              type : 'additional_sinks',
              value : "7"
            }
          ]
        })

        expect(component.vm.authorized_sinks).toEqual(ziti.membership_features['basic'].sinks + 5 + 7)
      })
    })

    describe("#advanced_sinks", () => {
      describe("no membership_level", () => {
        it("is false", () => {
          expect(component.vm.advanced_sinks).toBe(false)
        })
      })

      describe("membership_level.advanced_sinks", () => {
        it("is true", () => {
          component.vm.$store.commit('set_user', {membership_level : 'premium'})
          expect(component.vm.advanced_sinks).toBe(true)
        })
      })

      describe("advanced_sinks privilege", () => {
        it("is true", () => {
          component.vm.$store.commit('set_user', {
            membership_level : 'basic',
            Privileges : [
              {
                type : 'advanced_sinks',
                value : "true"
              }
            ]
          })

          expect(component.vm.advanced_sinks).toBe(true)
        })
      })
    })

    describe("#have_email", () => {
      describe("auth_email", () => {
        it("is true", () => {
          component.setData({auth_email : 'e@ma.il'})
          expect(component.vm.have_email).toBe(true)
        })
      })

      describe("!auth_email", () => {
        it("is false", () => {
          expect(component.vm.have_email).toBe(false)
        })
      })
    })

    describe("#invalid_email", () => {
      describe("do not have email", () => {
        it("is false", () => {
          expect(component.vm.invalid_email).toBe(false)
        })
      })

      describe("email is valid", () => {
        it("is false", () => {
          component.setData({auth_email : 'e@ma.il'})
          expect(component.vm.invalid_email).toBe(false)
        })
      })

      describe("have email and email invalid", () => {
        it("is true", () => {
          component.setData({auth_email : 'email'})
          expect(component.vm.invalid_email).toBe(true)
        })
      })
    })

    describe("#have_password", () => {
      describe("auth_password", () => {
        it("is true", () => {
          component.setData({auth_password : 'password'})
          expect(component.vm.have_password).toBe(true)
        })
      })

      describe("!auth_password", () => {
        it("is false", () => {
          expect(component.vm.have_password).toBe(false)
        })
      })
    })

    describe("#have_passwords", () => {
      describe("!auth_password", () => {
        it("is false", () => {
          expect(component.vm.have_passwords).toBe(false)
        })
      })

      describe("!!auth_password && !auth_password_confirm", () => {
        it("is false", () => {
          component.setData({auth_password : 'password'})
          expect(component.vm.have_passwords).toBe(false)
        })
      })

      describe("!!auth_password && !!auth_password_confirm", () => {
        it("is true", () => {
          component.setData({
            auth_password : 'password',
            auth_password_confirm : 'password'
          })

          expect(component.vm.have_passwords).toBe(true)
        })
      })
    })

    describe("#password_strength", () => {
      it("returns password strength", () => {
        component.setData({auth_password : 'password'})
        expect(component.vm.password_strength.score).toEqual(zxcvbn('password').score)
      })
    })

    describe("#weak_password", () => {
      describe("!have_password", () => {
        it("is false", () => {
          expect(component.vm.weak_password).toEqual(false)
        })
      })

      describe("password strength score < minimum", () => {
        it("is true", () => {
          component.setData({auth_password : 'password'})
          expect(component.vm.weak_password).toEqual(true)
        })
      })

      describe("password strength score >= minimum", () => {
        it("is false", () => {
          component.setData({auth_password : 'fal3lKgfdVZ@^#&4kaDlg0fdsf'})
          expect(component.vm.weak_password).toEqual(false)
        })
      })
    })

    describe("password_mismatch", () => {
      describe("!have_passowrds", () => {
        it("is false", () => {
          expect(component.vm.password_mismatch).toEqual(false)
        })
      })

      describe("auth_password == auth_password_confirm", () => {
        it("is false", () => {
          component.setData({
            auth_password : 'password',
            auth_password_confirm : 'password'
          })

          expect(component.vm.password_mismatch).toBe(false)
        })
      })

      describe("auth_password != auth_password_confirm", () => {
        it("is true", () => {
          component.setData({
            auth_password : 'password',
            auth_password_confirm : 'drowssap'
          })

          expect(component.vm.password_mismatch).toBe(true)
        })
      })
    })

    describe("#invalid_passwords", () => {
      describe("!have_passwords", () => {
        it("is false", () => {
          expect(component.vm.invalid_passwords).toEqual(false)
        })
      })

      describe("weak_password", () => {
        it("is true", () => {
          component.setData({
            auth_password : 'password',
            auth_password_confirm : 'password'
          })

          expect(component.vm.weak_password).toEqual(true)
        })
      })

      describe("password_mismatch", () => {
        it("is true", () => {
          component.setData({
            auth_password : 'password',
            auth_password_confirm : 'drowssap'
          })

          expect(component.vm.weak_password).toEqual(true)
        })
      })

      describe("have_passwords && !weak_password && !password_mismatch", () => {
        it("is false", () => {
          component.setData({
            auth_password : 'fal3lKgfdVZ@^#&4kaDlg0fdsf',
            auth_password_confirm : 'fal3lKgfdVZ@^#&4kaDlg0fdsf'
          })

          expect(component.vm.weak_password).toEqual(false)
        })
      })
    })
  })

  describe("methods", () => {
    describe("#privilege", () => {
      it("returns privilege", () => {
        component.vm.$store.commit('set_user', {
          Privileges : [
            {
              type : 'type1',
              value : "value1"
            }
          ]
        })

        expect(component.vm.privilege('type1')).toEqual('value1')
      })

      it("converts privilege to integer", () => {
        component.vm.$store.commit('set_user', {
          Privileges : [
            {
              type : 'type1',
              value : "123"
            }
          ]
        })

        expect(component.vm.privilege('type1', 'integer')).toBe(123)
      })

      it("converts privilege to boolean", () => {
        component.vm.$store.commit('set_user', {
          Privileges : [
            {
              type : 'type1',
              value : "true"
            }
          ]
        })

        expect(component.vm.privilege('type1', 'boolean')).toBe(true)

        component.vm.$store.commit('set_user', {
          Privileges : [
            {
              type : 'type1',
              value : "t"
            }
          ]
        })

        expect(component.vm.privilege('type1', 'boolean')).toBe(true)

        component.vm.$store.commit('set_user', {
          Privileges : [
            {
              type : 'type1',
              value : "false"
            }
          ]
        })

        expect(component.vm.privilege('type1', 'boolean')).toBe(false)
      })

      describe("privilege not found", () => {
        it("returns default_value", () => {
          expect(component.vm.privilege('type1', '', 'default')).toEqual('default')
        })

        it("returns null", () => {
          expect(component.vm.privilege('type1', '')).toBe(null)
        })

        it("returns integer 0", () => {
          expect(component.vm.privilege('type1', 'integer')).toBe(0)
        })

        it("returns boolean false", () => {
          expect(component.vm.privilege('type1', 'boolean')).toBe(false)
        })
      })
    })

    describe("#register", () => {
      beforeEach(function(){
        component.setData({auth_email : 'e@ma.il', auth_password : 'password'})
      })

      it("submits register request", () => {
        const expected_params = { email : 'e@ma.il', password : 'password'};

        htttp.post.mockResolvedValue({})

        component.vm.register();
        expect(htttp.post).toHaveBeenCalledTimes(1)
        expect(htttp.post.mock.calls[0][0]).toEqual(component.vm.backend_url + "/register")
        expect(htttp.post.mock.calls[0][1]).toEqual(expected_params)
      })

      describe("in progress filter set", () => {
        it("sets filter on request", () => {
          const expected_params = {
               email : 'e@ma.il',
            password : 'password',
              filter : 'filter1'
          };

          component.vm.$store.commit('set_in_progress_filter', {server : 'filter1'})

          htttp.post.mockResolvedValue({})
          component.vm.register();
          expect(htttp.post.mock.calls[0][1]).toEqual(expected_params)
        })
      })

      describe("success result", () => {
        it("clears in progress filter", async () => {
          component.vm.$store.commit('set_in_progress_filter', {server : 'filter1'})

          htttp.post.mockResolvedValue({})

          component.vm.register();
          await flush_promises();

          expect(component.vm.$store.state.in_progress_filter).toEqual({})
        })

        it("alerts success result", async () => {
          htttp.post.mockResolvedValue({})

          component.vm.register();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Please check your email to complete registration")
        })
      })

      describe("failed result", () => {
        it("alerts failed result", async () => {
          htttp.post.mockRejectedValue({body : {error : 'error1'}})

          component.vm.register();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("There was a problem registering: Error1")
        })
      })
    })

    describe("#login", () => {
      beforeEach(function(){
        component.setData({auth_email : 'e@ma.il', auth_password : 'password'})
        component.vm.load_user = jest.fn()
      })

      it("submits login request", () => {
        const expected_params = { email : 'e@ma.il', password : 'password'};

        htttp.post.mockResolvedValue({body : {authToken : 'token'}})

        component.vm.login();
        expect(htttp.post).toHaveBeenCalledTimes(1)
        expect(htttp.post.mock.calls[0][0]).toEqual(component.vm.backend_url + "/login")
        expect(htttp.post.mock.calls[0][1]).toEqual(expected_params)
      })

      describe("in progress filter set", () => {
        it("sets filter on request", () => {
          const expected_params = {
               email : 'e@ma.il',
            password : 'password',
              filter : 'filter1'
          };

          component.vm.$store.commit('set_in_progress_filter', {server : 'filter1'})

          htttp.post.mockResolvedValue({body : {authToken : 'token'}})
          component.vm.login();
          expect(htttp.post.mock.calls[0][1]).toEqual(expected_params)
        })
      })

      describe("success result", () => {
        it("clears in progress filter", async() => {
          component.vm.$store.commit('set_in_progress_filter', {server : 'filter1'})

          htttp.post.mockResolvedValue({body : {authToken : 'token'}})

          component.vm.login();
          await flush_promises();

          expect(component.vm.$store.state.in_progress_filter).toEqual({})
        })

        it("sets authToken cookie", async () => {
          component.vm.$store.commit('set_in_progress_filter', {server : 'filter1'})

          htttp.post.mockResolvedValue({body : {authToken : 'token'}})

          component.vm.login();
          await flush_promises();

          expect(component.vm.auth_token).toEqual("token")
        })

        it("loads user", async () => {
          component.vm.$store.commit('set_in_progress_filter', {server : 'filter1'})

          htttp.post.mockResolvedValue({body : {authToken : 'token'}})

          component.vm.login();
          await flush_promises();

          expect(component.vm.load_user).toHaveBeenCalledTimes(1)
        })
      })

      describe("failed result", () => {
        it("alerts failed result", async () => {
          htttp.post.mockRejectedValue({body : {error : 'error1'}})

          component.vm.login();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not login: Error1")
        })
      })
    })

    describe("#load_user", () => {
      it("submits user request", async () => {
        htttp.get.mockResolvedValue({body : {}})

        component.vm.load_user();
        await flush_promises();

        expect(htttp.get).toHaveBeenCalledTimes(1)
        expect(htttp.get.mock.calls[0][0]).toEqual(component.vm.backend_url + "/user")
        expect(htttp.get.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      describe("success result", () => {
        it("sets user", async () => {
          htttp.get.mockResolvedValue({body : {email : 'e@ma.il'}})

          component.vm.load_user();
          await flush_promises();

          expect(component.vm.$store.state.user.email).toEqual('e@ma.il')
        })
      })

      describe("failed result", () => {
        it("alerts session timeout", async () => {
          htttp.get.mockRejectedValue({})

          component.vm.load_user();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
        })

        it("removes authToken cookie", async () => {
          component.vm.$setCookie('authToken', 'foobar')
          htttp.get.mockRejectedValue({})

          component.vm.load_user();
          await flush_promises();

          expect(component.vm.auth_token).toBe(undefined)
        })

        it("clears user", async () => {
          component.vm.$store.commit('set_user', {email : 'em@ai.l'})
          htttp.get.mockRejectedValue({})

          component.vm.load_user();
          await flush_promises();

          expect(component.vm.$store.state.user.email).toEqual('');
        })

        it("redirects to /txs", async () => {
          htttp.get.mockRejectedValue({})

          component.vm.load_user();
          await flush_promises();

          expect(component.vm.$route.path).toEqual('/txs');
        })
      })
    })

    describe("#logout", () => {
      it("submits logout request", async () => {
        htttp.delete.mockResolvedValue({})

        component.vm.logout();
        await flush_promises();

        expect(htttp.delete).toHaveBeenCalledTimes(1)
        expect(htttp.delete.mock.calls[0][0]).toEqual(component.vm.backend_url + "/logout")
      })

      describe("success result", () => {
        it("removes authToken cookie", async () => {
          component.vm.$setCookie('authToken', 'foobar')
          htttp.delete.mockResolvedValue({})

          component.vm.logout();
          await flush_promises();

          expect(component.vm.auth_token).toBe(undefined)
        })

        it("clears user", async () => {
          component.vm.$store.commit('set_user', {email : 'em@ai.l'})
          htttp.delete.mockResolvedValue({})

          component.vm.logout();
          await flush_promises();

          expect(component.vm.$store.state.user.email).toEqual('');
        })

        it("redirects to /txs", async () => {
          htttp.delete.mockResolvedValue({})

          component.vm.logout();
          await flush_promises();

          expect(component.vm.$route.path).toEqual('/txs');
        })
      })

      describe("failed result", () => {
        it("removes authToken cookie", async () => {
          component.vm.$setCookie('authToken', 'foobar')
          htttp.delete.mockRejectedValue({})

          component.vm.logout();
          await flush_promises();

          expect(component.vm.auth_token).toBe(undefined)
        })

        it("clears user", async () => {
          component.vm.$store.commit('set_user', {email : 'em@ai.l'})
          htttp.delete.mockRejectedValue({})

          component.vm.logout();
          await flush_promises();

          expect(component.vm.$store.state.user.email).toEqual('');
        })

        it("redirects to /txs", async () => {
          htttp.delete.mockRejectedValue({})

          component.vm.logout();
          await flush_promises();

          expect(component.vm.$route.path).toEqual('/txs');
        })
      })
    })

    describe("#reset_password", () => {
      it("submits reset password request", async () => {
        component.setData({auth_email : 'e@ma.il'})

        htttp.put.mockResolvedValue({})

        component.vm.reset_password();
        await flush_promises();

        expect(htttp.put).toHaveBeenCalledTimes(1)
        expect(htttp.put.mock.calls[0][0]).toEqual(component.vm.backend_url + "/reset")
        expect(htttp.put.mock.calls[0][1]).toEqual({email : 'e@ma.il'})
      })

      describe("success result", () => {
        it("alerts password reset instructions", async () => {
          htttp.put.mockResolvedValue({})

          component.vm.reset_password();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Please check your email for password reset instructions")
        })
      })

      describe("failed result", () => {
        it("alerts error", async () => {
          htttp.put.mockRejectedValue({body : {error : 'error1'}})

          component.vm.reset_password();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not reset password: Error1")
        })
      })
    })
  })
})
