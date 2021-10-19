import {
  mount_vue,
  flush_promises
} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import {
  load_fixture,
} from './fixtures'

import Notification from '../src/Notification.vue'

const notifications = load_fixture('notifications');

describe("Notification Page", () => {
  var data, server_api;

  beforeEach(function(){
    // Mocked notification (deep copy)
    data = JSON.parse(JSON.stringify(notifications[0]))

    // Stubbed server_api call
    server_api = {
      methods : {
        load_notification : jest.fn().mockResolvedValue(
          {
            body : data
          }
        )
      }
    };
  })

  describe("dom", () => {
    it("renders notification filter matches", async () => {
      const notification = mount_vue(Notification, { mixins : [server_api] })
      await flush_promises()

      const matches = notification.findAll(".tx_summary_container")
      expect(matches.length).toEqual(data.FilterMatches.length)
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Notification, {mixins : [server_api, _maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    it("loads notification", async() => {
      const notification = mount_vue(Notification, { mixins : [server_api] })
      await flush_promises()
      expect(server_api.methods.load_notification).toHaveBeenCalledTimes(1)
    })

    describe("notification response", () => {
      it("transforms and sets filter matches", async () => {
        // Preserve original via deep copy
        const orig = JSON.parse(JSON.stringify(data))

        const notification = mount_vue(Notification, { mixins : [server_api] })
        await flush_promises()

        expect(notification.vm.notification.FilterMatches.length).toEqual(orig.FilterMatches.length)
        for(var fm = 0; fm < orig.FilterMatches.length; fm += 1){
          const match  = notification.vm.notification.FilterMatches[fm];
          const omatch = orig.FilterMatches[fm].Transaction.raw;
                omatch.transaction.date = orig.FilterMatches[fm].Transaction.date;
          expect(match).toEqual(omatch)
        }
      })
    })
  })
})
