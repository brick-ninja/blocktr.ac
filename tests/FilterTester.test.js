import {
  mount_vue,
  next_tick
}    from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import {
  load_fixture,
  load_matched_tests_fixture
} from './fixtures'

import FilterTester from '../src/FilterTester.vue'
import TxSummary from '../src/components/TxSummary.vue'
import util from '../src/util'

///

// Filter 'retrieved' from the server
const filters = load_fixture('filters');
const filter = filters[0];

// Stub matched_tests and captured_txs
const xlm_matched_tests = load_matched_tests_fixture('xlm');
const captured_txs = require('../src/assets/captured_txs/' + filter.blockchain + '/captured_txs.json');

///

describe("FilterTester Page", () => {
  var server_api;

  beforeEach(function(){
    server_api = {
      methods : {
        load_filter : jest.fn(function(){
          this.active_filter = filter
        })
      }
    }
  })

  describe("dom", () => {
    describe("no matched_tests", () => {
      it("renders no matches content", () => {
        const filter_tester = mount_vue(FilterTester, {mixins : [server_api]})
        expect(filter_tester.find("#no_matches")).toExist()
      })

      describe("#duplicate_link", () => {
        test.todo("launches duplicate_filter modal")
      })
    })

    it("renders matched tests", async () => {
      const filter_tester = mount_vue(FilterTester, {mixins: [server_api]})
      filter_tester.setData({matched_tests: xlm_matched_tests})
      await next_tick(filter_tester)
      expect(filter_tester.findAllComponents(TxSummary).length).toBe(xlm_matched_tests.length)
    })
  })

  describe("computed", () => {
    describe("list", () => {
      it("returns list of captured_txs for active_filter", () => {        
        const filter_tester = mount_vue(FilterTester, {mixins: [server_api]})
        expect(filter_tester.vm.list).toEqual(captured_txs)
      })
    })

    describe("txs", () => {
      it("returns captured_txs for active_filter", () => {
        const filter_tester = mount_vue(FilterTester, {mixins: [server_api]})
        let txs = filter_tester.vm.txs;
        let key_values = Object.keys(txs)
        for(let i = 0; i < key_values.length; i++) {
          let tx  = require("../src/assets/captured_txs/" + filter_tester.vm.active_filter.blockchain + "/" + key_values[i])
          expect(captured_txs[i]).toContain(key_values[i])
          expect(txs[key_values[i]]).toEqual({transaction: tx})
        }
      })
    })
  })

  describe("watch", () => {
    describe("active_filter", () => {
      it("applies filter jsonpath to txs and populates matched_tests", () => {
        var jsonpath = require('../src/vendor/jsonpath')
        jsonpath.scope({parseInt: parseInt, parseFloat: parseFloat})
        const filter_tester = mount_vue(FilterTester, {mixins: [server_api]})
        var jp = util.filter_matcher(filter_tester.vm.active_filter)
        Object.keys(filter_tester.vm.txs).forEach(function(ctx){
          const json = filter_tester.vm.txs[ctx];
          if(jsonpath.query(json, jp).length != 0)
            expect(filter_tester.vm.matched_tests).toContain(json)
          else
            expect(filter_tester.vm.matched_tests).not.toContain(json)
        })
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", async() => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(FilterTester, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    it("loads filter", () => {
      mount_vue(FilterTester, {mixins : [server_api]})
      expect(server_api.methods.load_filter).toHaveBeenCalledTimes(1);
    })
  })
})
