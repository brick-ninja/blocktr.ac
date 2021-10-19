import {
  shallow_mount_vue,
  flush_promises
} from '../setup'

import {stubbed_htttp} from '../stubs'

import config from '../../src/config/config'

import ServerAPI from '../../src/mixins/server_api'

const Component = {
  render() {},
  mixins : [ServerAPI]
}

describe("server_api", () => {
  var component, htttp

  beforeEach(function(){
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

    describe("#templates", () => {
      it("sets/gets templates", () => {
        const templates = ['t1', 't2']
        component.vm.templates = templates
        expect(component.vm.templates).toEqual(templates)
        expect(component.vm.$store.state.templates).toEqual(templates)
      })
    })

    describe("#sinks", () => {
      it("sets/gets sinks", () => {
        const sinks = ['s1', 's2']
        component.vm.sinks = sinks
        expect(component.vm.sinks).toEqual(sinks)
        expect(component.vm.$store.state.sinks).toEqual(sinks)
      })
    })

    describe("#filters", () => {
      it("sets/gets filters", () => {
        const filters = ['f1', 'f2']
        component.vm.filters = filters
        expect(component.vm.filters).toEqual(filters)
        expect(component.vm.$store.state.filters).toEqual(filters)
      })
    })

    describe("#notifications", () => {
      it("sets/gets notifications", () => {
        const notifications = ['n1', 'n2']
        component.vm.notifications = notifications
        expect(component.vm.notifications).toEqual(notifications)
        expect(component.vm.$store.state.notifications).toEqual(notifications)
      })
    })

    describe("#server_status", () => {
      it("sets/gets server_status", () => {
        const server_status = {stat : 'us'}
        component.vm.server_status = server_status
        expect(component.vm.server_status).toEqual(server_status)
        expect(component.vm.$store.state.server_status).toEqual(server_status)
      })
    })

    describe("#active_filter", () => {
      it("sets/gets active_filter", () => {
        const active_filter = {active : 'filter'}
        component.vm.active_filter = active_filter
        expect(component.vm.active_filter).toEqual(active_filter)
        expect(component.vm.$store.state.active_filter).toEqual(active_filter)
      })
    })
  })

  describe("methods", () => {
    describe("#not_authenticated", () => {
      describe("status == 401", () => {
        it("returns true", () => {
          expect(component.vm.not_authenticated({status : 401})).toBe(true)
        })
      })

      describe("status != 401", () => {
        it("returns false", () => {
          expect(component.vm.not_authenticated({status : 400})).toBe(false)
        })
      })
    })

    describe("#set_active_filter", () => {
      it("sets active filter", () => {
        const active_filter = {active : 'filter'}
        component.vm.set_active_filter(active_filter)
        expect(component.vm.active_filter).toEqual(active_filter)
      })

      describe("filters includes filter", () => {
        it("replaces filter", () => {
          const filter1 = {id : 1, name : 'filter1'}
          const filter2 = {id : 1, name : 'filter2'}
          component.vm.filters = [filter1]

          component.vm.set_active_filter(filter2)
          expect(component.vm.filters).toEqual([filter2])
        })
      })

      it("adds filter to filters", () => {
        const active_filter = {active : 'filter'}
        component.vm.set_active_filter(active_filter)
        expect(component.vm.filters).toEqual([active_filter])
      })

      it("redirects to /filter/filter.id", () => {
        const active_filter = {id : 1, active : 'filter'}
        component.vm.set_active_filter(active_filter)
        expect(component.vm.$route.path).toEqual("/filter/1")
      })
    })

    describe("#load_templates", () => {
      it("submits templates request", () => {
        htttp.get.mockResolvedValue({})
        component.vm.load_templates();
        expect(htttp.get).toHaveBeenCalledTimes(1)
        expect(htttp.get.mock.calls[0][0]).toEqual(component.vm.backend_url + "/templates")
      })

      describe("success result", () => {
        it("sets templates", async () => {
          const templates = ['t1', 't2']
          htttp.get.mockResolvedValue({body : templates})

          component.vm.load_templates();
          await flush_promises();

          expect(component.vm.templates).toEqual(templates)
        })
      })

      describe("failed result", () => {
        it("alerts error", async () => {
          htttp.get.mockRejectedValue({body : {error : 'error1'}})

          component.vm.load_templates();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not retrieve templates: Error1")
        })
      })
    })

    describe("#load_sinks", () => {
      it("submits sinks request", () => {
        htttp.get.mockResolvedValue({body : []})
        component.vm.load_sinks();
        expect(htttp.get).toHaveBeenCalledTimes(1)
        expect(htttp.get.mock.calls[0][0]).toEqual(component.vm.backend_url + "/sinks")
        expect(htttp.get.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      describe("success result", () => {
        it("sets sinks", async () => {
          const sinks = ['s1', 's2']
          htttp.get.mockResolvedValue({body : sinks})

          component.vm.load_sinks();
          await flush_promises();

          expect(component.vm.sinks).toEqual(sinks)
        })
      })

      describe("failed result", () => {
        it("alerts error", async () => {
          htttp.get.mockRejectedValue({body : {error : 'error1'}})

          component.vm.load_sinks();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not retrieve sinks: Error1")
        })
      })
    })

    describe("#load_filters", () => {
      it("submits filters request", () => {
        htttp.get.mockResolvedValue({})
        component.vm.load_filters();
        expect(htttp.get).toHaveBeenCalledTimes(1)
        expect(htttp.get.mock.calls[0][0]).toEqual(component.vm.backend_url + "/filters")
        expect(htttp.get.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      describe("success result", () => {
        it("sets filters", async () => {
          const filters = ['f1', 'f2']
          htttp.get.mockResolvedValue({body : filters})

          component.vm.load_filters();
          await flush_promises();

          expect(component.vm.filters).toEqual(filters)
        })
      })

      describe("failed result", () => {
        it("alerts error", async () => {
          htttp.get.mockRejectedValue({body : {error : 'error1'}})

          component.vm.load_filters();
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not retrieve filters: Error1")
        })
      })
    })

    describe("#load_filter", () => {
      it("submits filter request", () => {
        htttp.get.mockResolvedValue({})
        component.vm.load_filter(1);
        expect(htttp.get).toHaveBeenCalledTimes(1)
        expect(htttp.get.mock.calls[0][0]).toEqual(component.vm.backend_url + "/filter/1")
        expect(htttp.get.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      describe("success result", () => {
        it("sets active filter", async () => {
          const filter = {fil : 'ter'}
          htttp.get.mockResolvedValue({body : filter})

          component.vm.load_filter(1);
          await flush_promises();

          expect(component.vm.active_filter).toEqual(filter)
        })
      })

      describe("failed result", () => {
        it("alerts error", async () => {
          htttp.get.mockRejectedValue({body : {error : 'error1'}})

          component.vm.load_filter(1);
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not retrieve filter: Error1")
        })
      })
    })

    describe("#load_filter_matches", () => {
      it("submits filter_matches request", () => {
        htttp.get.mockResolvedValue({body : []})
        component.vm.load_filter_matches(1);
        expect(htttp.get).toHaveBeenCalledTimes(1)
        expect(htttp.get.mock.calls[0][0]).toEqual(component.vm.backend_url + "/filter/1/matches")
        expect(htttp.get.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      describe("success result", () => {
        it("sets filter_matches", async () => {
          const matches = [
            {
              Transaction : {
                raw : {
                  transaction : {tx : 1},
                },
                date : 'date1'}
            },

            {
              Transaction : {
                raw : {
                  transaction : {tx : 2},
                },
                date : 'date2'
              }
            }
          ]
          htttp.get.mockResolvedValue({body : matches})

          component.vm.load_filter_matches(1);
          await flush_promises();
          expect(component.vm.filter_matches).toEqual(matches)
        })
      })

      describe("failed result", () => {
        it("alerts error", async () => {
          htttp.get.mockRejectedValue({body : {error : 'error1'}})

          component.vm.load_filter_matches(1);
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not retrieve filter matches: Error1")
        })
      })
    })

    describe("#load_notifications", () => {
      it("submits notifications request", () => {
        htttp.get.mockResolvedValue({})
        component.vm.load_notifications(1);
        expect(htttp.get).toHaveBeenCalledTimes(1)
        expect(htttp.get.mock.calls[0][0]).toEqual(component.vm.backend_url + "/notifications")
        expect(htttp.get.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      describe("success result", () => {
        it("sets notifications", async () => {
          const notifications = ['n1', 'n2']
          htttp.get.mockResolvedValue({body : notifications})

          component.vm.load_notifications();
          await flush_promises();

          expect(component.vm.notifications).toEqual(notifications)
        })
      })

      describe("failed result", () => {
        it("alerts error", async () => {
          htttp.get.mockRejectedValue({body : {error : 'error1'}})

          component.vm.load_notifications(1);
          await flush_promises();

          expect(window.alert).toHaveBeenCalledTimes(1)
          expect(window.alert.mock.calls[0][0]).toEqual("Could not retrieve notifications: Error1")
        })
      })
    })

    describe("#load_txs", () => {
      test.todo("submits txs request")
      test.todo("returns request promise")
    })

    describe("#update_user", () => {
      it("submits user request", () => {
        const user = {us : 'er'}
        component.vm.update_user(user);
        expect(htttp.put).toHaveBeenCalledTimes(1)
        expect(htttp.put.mock.calls[0][0]).toEqual(component.vm.backend_url + "/user")
        expect(htttp.put.mock.calls[0][1]).toEqual(user)
        expect(htttp.put.mock.calls[0][2]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.put.mockReturnValue(promise)

        const user = {us : 'er'}
        expect(component.vm.update_user(user)).toEqual(promise);
      })
    })

    describe("#purchase_plan", () => {
      it("submits purchase request", () => {
        const plan = 'plan';
        component.vm.purchase_plan(plan);
        expect(htttp.post).toHaveBeenCalledTimes(1)
        expect(htttp.post.mock.calls[0][0]).toEqual(component.vm.backend_url + "/purchase")
        expect(htttp.post.mock.calls[0][1]).toEqual(plan)
        expect(htttp.post.mock.calls[0][2]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.post.mockReturnValue(promise)

        const plan = 'plan';
        expect(component.vm.purchase_plan(plan)).toEqual(promise);
      })
    })

    describe("#cancel_subscription", () => {
      it("submits cancel subscription request", () => {
        component.vm.cancel_subscription();
        expect(htttp.post).toHaveBeenCalledTimes(1)
        expect(htttp.post.mock.calls[0][0]).toEqual(component.vm.backend_url + "/cancel")
        expect(htttp.post.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.post.mockReturnValue(promise)

        expect(component.vm.cancel_subscription()).toEqual(promise);
      })
    })

    describe("#reset_password", () => {
      it("submits reset password request", () => {
        const params = {para : 'ms'}
        component.vm.reset_password(params);
        expect(htttp.put).toHaveBeenCalledTimes(1)
        expect(htttp.put.mock.calls[0][0]).toEqual(component.vm.backend_url + "/reset")
        expect(htttp.put.mock.calls[0][1]).toEqual(params)
        expect(htttp.put.mock.calls[0][2]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.put.mockReturnValue(promise)

        const params = {para : 'ms'}
        expect(component.vm.reset_password(params)).toEqual(promise);
      })
    })

    describe("#confirm_email", () => {
      it("submits confirm email request", () => {
        const params = {para : 'ms'}
        component.vm.confirm_email(params);
        expect(htttp.put).toHaveBeenCalledTimes(1)
        expect(htttp.put.mock.calls[0][0]).toEqual(component.vm.backend_url + "/confirm")
        expect(htttp.put.mock.calls[0][1]).toEqual(params)
        expect(htttp.put.mock.calls[0][2]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.put.mockReturnValue(promise)

        expect(component.vm.confirm_email()).toEqual(promise);
      })
    })

    describe("#contact", () => {
      it("submits contact request", () => {
        const params = {para : 'ms'};
        component.vm.contact(params);
        expect(htttp.post).toHaveBeenCalledTimes(1)
        expect(htttp.post.mock.calls[0][0]).toEqual(component.vm.backend_url + "/contact")
        expect(htttp.post.mock.calls[0][1]).toEqual(params);
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.post.mockReturnValue(promise)

        const params = {para : 'ms'}
        expect(component.vm.contact(params)).toEqual(promise);
      })
    })

    describe("#create_sink", () => {
      it("submits create sink request", () => {
        const params = {para : 'ms'};
        component.vm.create_sink(params);
        expect(htttp.post).toHaveBeenCalledTimes(1)
        expect(htttp.post.mock.calls[0][0]).toEqual(component.vm.backend_url + "/sink")
        expect(htttp.post.mock.calls[0][1]).toEqual(params);
        expect(htttp.post.mock.calls[0][2]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.post.mockReturnValue(promise)

        const params = {para : 'ms'}
        expect(component.vm.create_sink(params)).toEqual(promise);
      })
    })

    describe("#delete_sink", () => {
      it("submits delete sink request", () => {
        component.vm.delete_sink(1);
        expect(htttp.delete).toHaveBeenCalledTimes(1)
        expect(htttp.delete.mock.calls[0][0]).toEqual(component.vm.backend_url + "/sink/1")
        expect(htttp.delete.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.delete.mockReturnValue(promise)

        expect(component.vm.delete_sink(1)).toEqual(promise);
      })
    })

    describe("#create_filter", () => {
      it("submits create filter request", () => {
        const params = {para : 'ms'};
        component.vm.create_filter(params);
        expect(htttp.post).toHaveBeenCalledTimes(1)
        expect(htttp.post.mock.calls[0][0]).toEqual(component.vm.backend_url + "/filter")
        expect(htttp.post.mock.calls[0][1]).toEqual(params);
        expect(htttp.post.mock.calls[0][2]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.post.mockReturnValue(promise)

        const params = {para : 'ms'}
        expect(component.vm.create_filter(params)).toEqual(promise);
      })
    })

    describe("#update_filter", () => {
      it("submits update filter request", () => {
        const params = {para : 'ms'};
        component.vm.update_filter(1, params);
        expect(htttp.put).toHaveBeenCalledTimes(1)
        expect(htttp.put.mock.calls[0][0]).toEqual(component.vm.backend_url + "/filter/1")
        expect(htttp.put.mock.calls[0][1]).toEqual(params);
        expect(htttp.put.mock.calls[0][2]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.put.mockReturnValue(promise)

        const params = {para : 'ms'}
        expect(component.vm.update_filter(params)).toEqual(promise);
      })
    })

    describe("#delete_filter", () => {
      it("submits delete filter request", () => {
        component.vm.delete_filter(1);
        expect(htttp.delete).toHaveBeenCalledTimes(1)
        expect(htttp.delete.mock.calls[0][0]).toEqual(component.vm.backend_url + "/filter/1")
        expect(htttp.delete.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.delete.mockReturnValue(promise)

        expect(component.vm.delete_filter(1)).toEqual(promise);
      })
    })

    describe("#load_notifications", () => {
      it("submits notification request", () => {
        component.vm.load_notification(1);
        expect(htttp.get).toHaveBeenCalledTimes(1)
        expect(htttp.get.mock.calls[0][0]).toEqual(component.vm.backend_url + "/notification/1")
        expect(htttp.get.mock.calls[0][1]).toEqual(component.vm.auth_header)
      })

      it("returns request promise", () => {
        const promise = new Promise((resolve, reject) => {})
        htttp.get.mockReturnValue(promise)

        expect(component.vm.load_notification(1)).toEqual(promise);
      })
    })
  })
 })
