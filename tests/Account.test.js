import {
  mount_vue,
  next_tick
}       from './setup'
import {stubbed_network} from './stubs'

import Account from '../src/Account.vue'

describe("Account Page", () => {
  var account

  beforeEach(() => {
    account = mount_vue(Account, {
      propsData : {
        id : 'account1'
      },

      data : function(){
        return {
          have_account : true,
               balance : 1001.23456789,
              sequence : 2002,
          previous_txn : 'tx0'
        }
      },

      mocks : {
        network : stubbed_network()
      }
    })
  })

  describe("dom", () => {
    describe("#back_icon", () => {
      describe("clicked", () => {
        it("navigates back", async () => {
          account.vm.$router.back = jest.fn()
          await account.find("#back_icon").trigger("click")
          expect(account.vm.$router.back).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe("#account_id", () => {
      it("contains id", () => {
        const account_id = account.find("#account_id")
        expect(account_id.text()).toEqual("account1")
      })
    })

    describe("have_account", () => {
      describe("#account_table > tr:nth-child(1) > .value", () => {
        it("contains rounded, deliminated balance", () => {
          const balance = account.find("#account_table > tr:nth-child(1) > .value")
          expect(balance.text()).toEqual("1,001.23457")
        })
      })

      describe("#account_table > tr:nth-child(2) > .value", () => {
        it("contains sequence", () => {
          const sequence = account.find("#account_table > tr:nth-child(2) > .value")
          expect(sequence.text()).toEqual("2002")
        })
      })

      describe("#account_table > tr:nth-child(3) > .value", () => {
        it("contains link to previous txn", () => {
          const txn = account.find("#account_table > tr:nth-child(3) > .value")
          expect(txn.text()).toEqual("tx0")
        })
      })
    })

    describe("!have_account", () => {
      it("renders Account not found", async () => {
        account.setData({have_account: false});
        await next_tick(account);
        expect(account.find("#no_account").text()).toBe('Account not found')
      })
    })
  })

  describe("methods", () => {
    describe("#on_account", () => {
      beforeEach(() => {
        account.vm.on_account({
               balance : 100,
              sequence : 200,
          previous_txn : 'tx1'
        })
      })

      it("sets have_account", () => {
        expect(account.vm.have_account).toBe(true)
      })

      it("sets balance", () => {
        expect(account.vm.balance).toEqual(100)
      })

      it("sets sequence", () => {
        expect(account.vm.sequence).toEqual(200)
      })

      it("sets previous_txn", () => {
        expect(account.vm.previous_txn).toEqual('tx1')
      })
    })
  })

  describe("#created", () => {
    it("persists blockchain", () => {
      let multi_blockchain = {
        methods: {
          persist_blockchain: jest.fn()
        }
      }
      let account = mount_vue(Account, {
        mixins: [multi_blockchain]
      })
      expect(multi_blockchain.methods.persist_blockchain).toHaveBeenCalledTimes(1)
    })

    it("retrieves network account", () => {
      expect(account.vm.network.account).toHaveBeenCalledTimes(1)
    })
  })
})
