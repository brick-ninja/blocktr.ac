import {
  shallow_mount_vue,
  flush_promises
} from '../setup'

import {breakpoints} from '../../src/mq'

import MainHeader from '../../src/components/MainHeader'
import BlockchainSelector from '../../src/components/BlockchainSelector'
import HamburgerNav from '../../src/components/HamburgerNav'
import MainNav from '../../src/components/MainNav'

describe("MainHeader", () => {
  describe("dom", () => {
    describe("landing page", () => {
      it("does not render BlockchainSelector", () => {
        const header_test = shallow_mount_vue(MainHeader, {
          computed: {
            is_landing: function(){
              return true
            },
            no_blockchain_configured: function(){
              return true
            }
          }
        })
        expect(header_test.findComponent(BlockchainSelector)).not.toExist()
      })
    })

    describe("blockchain is configured", () => {
      it("does not render BlockchainSelector", () => {
        const header_test = shallow_mount_vue(MainHeader, {
          computed: {
            is_landing: function() {
              return false
            },
            no_blockchain_configured: function() {
              return false
            }
          }
        })
        expect(header_test.findComponent(BlockchainSelector)).not.toExist()
      })
    })

    describe("not landing page and blockchain is not configured", () => {
      it("renders BlockchainSelector", () => {
        const header_test = shallow_mount_vue(MainHeader, {
          computed: {
            is_landing: function() {
              return false
            },
            no_blockchain_configured: function() {
              return true
            }
          }
        })
        expect(header_test.findComponent(BlockchainSelector)).toExist()
      })
    })

    describe("mq < lg", () => {
      let header_test
      beforeEach(function(){
        global.innerWidth = breakpoints.md - 1;
        header_test = shallow_mount_vue(MainHeader);
      })

      it("renders hamburger nav", () => {
        expect(header_test.findComponent(HamburgerNav)).toExist()
      })

      it("does not render main nav", () => {
        expect(header_test.findComponent(MainNav)).not.toExist()
      })
    })

    describe("mq >= lg", () => {
      let header_test
      beforeEach(function(){
        global.innerWidth = breakpoints.lg + 1;
        header_test = shallow_mount_vue(MainHeader)
      })

      it("does not render hamburger menu", () => {
        expect(header_test.findComponent(HamburgerNav)).not.toExist()
      })

      it("renders main nav", () => {
        expect(header_test.findComponent(MainNav)).toExist()
      })
    })
  })

  describe("computed", () => {
    let header_test
    beforeEach(function(){
      header_test = shallow_mount_vue(MainHeader)
    })

    describe("#is_landing", () => {
      describe("path == '/'", () => {
        it("is true", () => {
          header_test.vm.$router.push({path: "/"})
          flush_promises()
          expect(header_test.vm.is_landing).toBe(true)
        })
      })

      describe("path != '/'", () => {
        it("is false", () => {
          header_test.vm.$router.push({path: "/tx"})
          flush_promises()
          expect(header_test.vm.is_landing).toBe(false)
        })
      })
    })
  })
})
