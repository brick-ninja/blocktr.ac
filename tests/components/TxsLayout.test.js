import {
  shallow_mount_vue,
  next_tick
} from '../setup'

import TxsLayout     from '../../src/components/TxsLayout'
import {breakpoints} from '../../src/mq'

describe("TxsLayout", () => {
  describe("dom", () => {
    describe("#txs_title", () => {
      it("renders title", () => {
        var tl = shallow_mount_vue(TxsLayout, {
          propsData : {
            section : 'account'
          },

          computed : {
            title : function(){
              return 'ABC'
            }
          }
        })

        expect(tl.find("#txs_title").text()).toEqual("ABC")
      })
    })

    describe("#txs_sidebar_container", () => {
      describe("mq > md", () => {
        it("is rendered", async () => {
          global.innerWidth = breakpoints.md + 1;

          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'account'
            }
          })

          await next_tick(tl);
          expect(tl.find("#txs_sidebar_container")).toExist()
        })
      })

      describe("mq <= md", () => {
        it("is not rendered", async () => {
          global.innerWidth = breakpoints.md - 1;

          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'account'
            }
          })

          await next_tick(tl);
          expect(tl.find("#txs_sidebar_container")).not.toExist()
        })
      })
    })
  })

  describe("computed", () => {
    describe("#account", () => {
      describe("section == 'account'", () => {
        it("is true", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'account'
            }
          })

          expect(tl.vm.account).toBe(true)
        })
      })

      describe("section != 'account'", () => {
        it("is false", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'notifications'
            }
          })

          expect(tl.vm.account).toBe(false)
        })
      })
    })

    describe("#notifications", () => {
      describe("section == 'notifications'", () => {
        it("is true", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'notifications'
            }
          })

          expect(tl.vm.notifications).toBe(true)
        })
      })

      describe("section == 'notification'", () => {
        it("is true", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'notification'
            }
          })

          expect(tl.vm.notifications).toBe(true)
        })
      })

      describe("section != 'notifications' && section != 'notification'", () => {
        it("is false", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'account'
            }
          })

          expect(tl.vm.notifications).toBe(false)
        })
      })
    })

    describe("#live", () => {
      describe("section == 'txs'", () => {
        it("is true", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'txs'
            }
          })

          expect(tl.vm.live).toBe(true)
        })
      })

      describe("section != 'txs'", () => {
        it("is false", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'account'
            }
          })

          expect(tl.vm.live).toBe(false)
        })
      })
    })

    describe("#title", () => {
      describe("account section", () => {
        it("is 'Accounts'", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'account'
            }
          })

          expect(tl.vm.title).toEqual('Accounts')
        })
      })

      describe("notifications section", () => {
        it("is 'Notifications'", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'notifications'
            }
          })

          expect(tl.vm.title).toEqual('Notifications')
        })
      })

      describe("live section", () => {
        it("is 'Live Transactions'", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'txs'
            }
          })

          expect(tl.vm.title).toEqual('Live Transactions')
        })
      })

      describe("other section", () => {
        it("is 'Transactions'", () => {
          var tl = shallow_mount_vue(TxsLayout, {
            propsData : {
              section : 'foobar'
            }
          })

          expect(tl.vm.title).toEqual('Transactions')
        })
      })
    })
  })
})
