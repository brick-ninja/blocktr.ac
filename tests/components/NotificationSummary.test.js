import {shallow_mount_vue} from '../setup'

import {load_fixture} from '../fixtures'

import NotificationSummary from '../../src/components/NotificationSummary'

const notification = load_fixture('notifications')[0]

describe("NotificationSummary", () => {
  var ns;

  beforeEach(function(){
    ns = shallow_mount_vue(NotificationSummary, {
      propsData : {
        notification : notification
      }
    })
  })

  describe("dom", () => {
    describe(".timestamp", () => {
      it("renders formatted timestamp", () => {
        expect(ns.find(".timestamp").text()).toEqual(ns.vm.formatted_timestamp)
      })
    })

    describe(".filter", () => {
      it("renders filter name", () => {
        expect(ns.find(".filter").text()).toEqual(notification.Filter.name)
      })
    })

    describe(".target", () => {
      it("renders sink type: sink target", () => {
        expect(ns.find(".target").text()).toEqual(notification.Sink.type + ": " + notification.Sink.target)
      })
    })

    describe(".transactions", () => {
      it("renders filter matches length", () => {
        expect(ns.find(".transactions").text()).toEqual(notification.FilterMatches.length.toString())
      })
    })
  })

  describe("computed", () => {
    describe("#formatted_timestamp", () => {
      describe("!notification_timestamp", () => {
        test.todo("is ''")
      })

      test.todo("is timestamp formatted as YYYY-MM-DD HH:mm:ss")
    })
  })
})
