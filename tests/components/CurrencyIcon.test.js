import {shallow_mount_vue} from '../setup'
import CurrencyIcon from '../../src/components/CurrencyIcon.vue'

const CURRENCY_ICONS = require("../../src/assets/currencies.json")

describe("CurrencyIcon", () => {
  describe("dom", () => {
    describe("have icon", () => {
      test.todo("renders icon")
    })

    describe("do not have icon", () => {
      test.todo("renders currency text")
    })
  })

  describe("computed", () => {
    describe("have_icon", () => {
      describe("have currency icon", () => {
        it("returns true", () => {
          const currency_icon = shallow_mount_vue(CurrencyIcon, {
            propsData : {
              currency : CURRENCY_ICONS[0]
            }
          });

          expect(currency_icon.vm.have_icon).toBe(true)
        })
      })

      describe("have invalid currency icon", () => {
        it("returns false", () => {
          const currency_icon = shallow_mount_vue(CurrencyIcon, {
            propsData : {
              currency : "FOOBAR"
            }
          });

          expect(currency_icon.vm.have_icon).toBe(false)
        })
      })
    })

    describe("src", () => {
      test.todo("requires and returns currency icon")
    })
  })
})
