import {
  shallow_mount_vue,
  next_tick
} from '../setup'

import TxsSideBar from '../../src/components/TxsSideBar'

describe("TxsSideBar", () => {
  describe("dom", () => {
    describe("live_nav", () => {
      describe("logged in and on_txs_page", () => {
        it("is .active", () => {
          const ts = shallow_mount_vue(TxsSideBar, {
            computed : {
              logged_in : function(){
                return true;
              },

              on_txs_page : function(){
                return true;
              }
            }
          })

          expect(ts.find("#live_nav").classes()).toContain("active")
        })
      })

      describe("logged in and not on_txs_page", () => {
        it("is not .active", () => {
          const ts = shallow_mount_vue(TxsSideBar, {
            computed : {
              logged_in : function(){
                return true;
              },

              on_txs_page : function(){
                return false;
              }
            }
          })

          expect(ts.find("#live_nav").classes()).not.toContain("active")
        })
      })

      describe("not logged in", () => {
        it("is not rendered", () => {
          const ts = shallow_mount_vue(TxsSideBar, {
            computed : {
              logged_in : function(){
                return false;
              }
            }
          })

          expect(ts.find("#live_nav")).not.toExist()
        })
      })
    })

    describe("!logged_in", () => {
      it("renders AccountMonitor" , () => {
        const ts = shallow_mount_vue(TxsSideBar, {
          computed : {
            logged_in : function(){
              return false;
            }
          }
        })

        expect(ts.find('accountmonitor-stub')).toExist()
      })
    })

    describe("logged_in", () => {
      it("does not render AccountMonitor" , () => {
        const ts = shallow_mount_vue(TxsSideBar, {
          computed : {
            logged_in : function(){
              return true;
            }
          }
        })

        expect(ts.find('accountmonitor-stub')).not.toExist()
      })
    })
  })

  describe("computed", () => {
    describe("on_txs_page", () => {
      describe("path == '/txs'", () => {
        it("is true", async () => {
          const ts = shallow_mount_vue(TxsSideBar)
          ts.vm.$router.push({path : "/txs"})
          await next_tick(ts)
          expect(ts.vm.on_txs_page).toBe(true)
        })
      })

      describe("path != '/txs'", () => {
        it("is false", () => {
          const ts = shallow_mount_vue(TxsSideBar)
          expect(ts.vm.on_txs_page).toBe(false)
        })
      })
    })
  })
})
