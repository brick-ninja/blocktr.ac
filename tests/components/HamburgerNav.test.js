import {shallow_mount_vue} from '../setup'

import HamburgerNav from '../../src/components/HamburgerNav'

describe("HamburgerNav", () => {
  var hn

  beforeEach(function(){
    hn = shallow_mount_vue(HamburgerNav)
  })

  it("is not visible", () => {
    expect(hn.vm.hamburger_visible).toBe(false)
  })

  describe("dom", () => {
    describe("#main_hamburger_open_icon", () => {
      describe("click event", () => {
        it("sets hamburger_visible = true", () => {
          hn.find("#main_hamburger_open_icon").trigger('click')
          expect(hn.vm.hamburger_visible).toBe(true)
        })
      })
    })

    describe("#main_hamburger_close_icon", () => {
      describe("click event", () => {
        it("sets hamburger_visible = false", () => {
          hn.setData({hamburger_visible : true})
          hn.find("#main_hamburger_close_icon").trigger('click')
          expect(hn.vm.hamburger_visible).toBe(false)
        })
      })
    })

    describe("MainNav", () => {
      describe("nav event", () => {
        it("sets hamburger_visible = false", () => {
          hn.setData({hamburger_visible : true})
          hn.find("mainnav-stub").vm.$emit('nav')
          expect(hn.vm.hamburger_visible).toBe(false)
        })
      })
    })
  })
})
