<!--
  * Filter Tester Page
  * Renders test transactions for a single filter, specified by ID.
  * Test transactions are precaptured live-transactions which serve
  * as a static database to test filters against.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="filter_tester">
    <div id="filter_tester">
      <FilterHeader />

      <div v-if="matched_tests.length == 0" id="no_matches">
        <img id="no_matches_icon"
             src="./assets/yellow-alert.svg" />

        <div>No test transactions match</div>

        <div>It might be incorrect filter composition</div>

        <div id="change_parameters">
          Change the filter parameters to get results
        </div>

        <div id="duplicate_link"
             v-b-modal.duplicate_filter>
          <img id="duplicate_link_icon"
               src="./assets/duplicate.svg">
          <span>Duplicate and edit</span>
        </div>
      </div>

      <div v-else>
        <b-list-group>
          <b-list-group-item id="filter_test_explanation">
            <img src="./assets/info.svg" />
            <span>The following are pre-captured transactions that your filter matches.
            If this is not what you expect, edit your filter.</span>
          </b-list-group-item>

          <b-list-group-item v-for="tx in matched_tests"
                             :key="tx.transaction.hash"
                             class="tx_summary_container">
            <TxSummary :tx="tx.transaction" />
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'
import Maintenance    from './mixins/maintenance'

import TxsLayout      from './components/TxsLayout'
import FilterHeader   from './components/FilterHeader'
import TxSummary      from './components/TxSummary'

import util           from './util'
import config         from './config/config'

var jsonpath = require('./vendor/jsonpath')
jsonpath.scope({parseInt: parseInt, parseFloat: parseFloat})

// FIXME: more captured assets for xlm,btc,eth blockchains

export default {
  name: 'FilterTester',

  mixins : [
    Authentication,
    ServerAPI,
    Maintenance
  ],

  components: {
    TxsLayout,
    FilterHeader,
    TxSummary
  },

  props : {
    id : Number
  },

  data : function(){
    return {
      matched_tests : []
    }
  },

  computed : {
    list : function(){
      return require('./assets/captured_txs/' + this.active_filter.blockchain + '/captured_txs.json')
    },

    txs : function(){
      return this.list.reduce(function(ct, ctx){
        const key = ctx.replace(".json", "");
        const tx  = require("./assets/captured_txs/" + this.active_filter.blockchain + "/" + ctx)

        ct[key] = Object.freeze(util.wrap_tx(tx))
        return ct;
      }.bind(this), {});
    }
  },

  watch : {
    active_filter : function(){
      var jp = util.filter_matcher(this.active_filter);

      Object.keys(this.txs).forEach(function(ctx){
        const json = this.txs[ctx];
        if(jsonpath.query(json, jp).length != 0)
          this.matched_tests.push(json);
      }.bind(this));
    },
    sinks: function(){
      if(this.active_filter) {
        this.load_filter(this.active_filter.id)
      }
    }
  },

  created : function(){
    if(this.maintenance_mode){
      this.nav_to_maintenance();
      return;
    }

    this.load_filter(this.id)
  }
}
</script>

<style scoped>
#filter_tester{
  background-color: white;
  height: 100%;

  display: flex;
  flex-direction: column;
}

#no_matches{
  padding: 25px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#no_matches_icon{
  margin-bottom: 25px;
}

#change_parameters{
  font-size:0.8rem;
  margin-top: 30px;
  font-family: var(--theme-font4);
}

#duplicate_link{
  padding: 5px 65px;
  margin-top: 5px;

  border-radius: 15px;
  color: white;
  background-color: var(--theme-color1);

  display: flex;
  cursor: pointer;
}

#duplicate_link_icon{
  margin-right: 10px;
}

#filter_test_explanation{
  display: flex;
  align-items: center;
}

#main_layout.sm #filter_test_explanation,
#main_layout.xs #filter_test_explanation{
  padding: 10px;
}

#filter_test_explanation span{
  opacity: 0.6;
  font-size: 0.9rem;
  font-family: var(--theme-font4);
  color: var(--theme-color2);
}

#filter_test_explanation img{
  margin-right: 5px;
  min-width: 20px;
}

.tx_summary_container{
  padding: 0px;
}
</style>
