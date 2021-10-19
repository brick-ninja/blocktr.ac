import {mount_vue} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import {
  load_fixture
} from './fixtures'

import Notifications from '../src/Notifications.vue'

const notifications = load_fixture('notifications');

describe("Notifications Page", () => {
  var server_api;

  beforeEach(function(){
    // Stubbed server_api call
    server_api = {
      methods : {
        load_notifications : jest.fn(function(){
          this.notifications = notifications;
        })
      }
    };
  })

  describe("dom", () => {
    it("renders notification summaries", async () => {
      const _notifications = mount_vue(Notifications, {mixins : [server_api]})
      expect(_notifications.findAll(".notification_wrapper").length).toBe(notifications.length)
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Notifications, {mixins : [server_api, _maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    it("loads notifications", () => {
      mount_vue(Notifications, {mixins : [server_api]})
      expect(server_api.methods.load_notifications).toHaveBeenCalledTimes(1);
    })
  })
})
