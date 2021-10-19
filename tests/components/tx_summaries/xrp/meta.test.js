import {shallow_mount_vue} from '../../../setup'

import {load_streamed_tx_fixture} from '../../../fixtures'

import Meta from '../../../../src/components/tx_summaries/xrp/meta'

const Component = {
  render() {},
  mixins : [Meta]
}

const tx = load_streamed_tx_fixture('xrp')[0].transaction

describe("tx_summaries xrp meta mixin", () => {
  var meta

  beforeEach(() => {
    meta = shallow_mount_vue(Component, {
      propsData : {
        tx : tx
      }
    })
  })

  describe("computed", () => {
    describe("#tx_obj", () => {
      it("is tx['transaction']", () => {
        expect(meta.vm.tx_obj).toEqual(tx.transaction)
      })

      test.todo("is tx['tx']")
    })

    describe("#tx_meta", () => {
      it("is tx['meta']", () => {
        expect(meta.vm.tx_meta).toEqual(tx.meta)
      })
    })

    describe("#affected_nodes", () => {
      it("is tx_meta['AffectedNodes']", () => {
        expect(meta.vm.affected_nodes).toEqual(meta.vm.tx_meta['AffectedNodes'])
        expect(meta.vm.affected_nodes).toEqual(tx.meta['AffectedNodes'])
      })
    })

    describe("#tx_type", () => {
      it("is tx_obj['TransactionType']", () => {
        expect(meta.vm.tx_type).toEqual(meta.vm.tx_obj['TransactionType'])
        expect(meta.vm.tx_type).toEqual(tx.transaction['TransactionType'])
      })
    })

    describe("#tx_short_type", () => {
      test.todo("replaces tx_type 'PaymentChannel' with 'PayChan'")
    })

    describe("#hash", () => {
      it("is tx_obj['hash']", () => {
        expect(meta.vm.hash).toEqual(meta.vm.tx_obj['hash'])
        expect(meta.vm.hash).toEqual(tx.transaction['hash'])
      })
    })

    describe("#account", () => {
      it("is tx_obj['Account']", () => {
        expect(meta.vm.account).toEqual(meta.vm.tx_obj['Account'])
        expect(meta.vm.account).toEqual(tx.transaction['Account'])
      })
    })

    describe("#tx_category", () => {
      test.todo("is tx category for tx_type")
    })

    describe("#tx_result", () => {
      it("is tx_meta['TransactionResult']", () => {
        expect(meta.vm.tx_result).toEqual(meta.vm.tx_meta['TransactionResult'])
        expect(meta.vm.tx_result).toEqual(tx.meta['TransactionResult'])
      })
    })

    describe("#success", () => {
      describe("tx_result == 'tesSUCCESS'", () => {
        test.todo("is true")
      })

      describe("tx_result != 'tesSUCCESS'", () => {
        test.todo("is false")
      })
    })

    describe("#unix_date", () => {
      describe("tx_obj['date'] is a string", () => {
        test.todo("parses tx_obj['date']")
      })

      test.todo("converts tx_obj['date'] from ledger time to unix time")
    })

    describe("#formatted_date", () => {
      test.todo("formats unix_date")
    })
  })

  describe("methods", () => {
    describe("#created_nodes", () => {
      test.todo("is created affected_nodes of specified type")
    })

    describe("#created_node", () => {
      test.todo("is first created node")
    })

    describe("created_fields", () => {
      test.todo("is new fields of created node")
    })

    describe("modified_nodes", () => {
      test.todo("is modified affected_nodes of specified type")
    })

    describe("#modified_node", () => {
      test.todo("is first modified node")
    })

    describe("modified_fields", () => {
      test.todo("is final fields of modified node")
    })

    describe("deleted_nodes", () => {
      test.todo("is deleted affected_nodes of specified type")
    })

    describe("#deleted_node", () => {
      test.todo("is first deleted node")
    })

    describe("deleted_fields", () => {
      test.todo("is final fields of deleted node")
    })
  })
})
