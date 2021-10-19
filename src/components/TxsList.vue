<!--
  * Txs List Component
  * Main Live Txs List, renders live transacitons as they are
  * received locally by websocket.
  *
  * Also encapsulates other components including TxsFilter,
  * TxsExample, and TxsCategories[Dropdown]
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->

<!-- TODO slide control to connect txs list to testnet (and test filter against it) -->
<template>
  <div>
    <!-- TODO: graph components: tx type/operations by time, by percent of total) -->

    <TxsFilter />
    <TxsFilterExample />

    <template v-if="mq_lte_md">
      <TxsFilterControls />

      <FilterListDropdown v-if="logged_in"
                          ref="my_filters" />

      <div v-if="!logged_in || remaining_filters > 0"
           id="create_filter"
           :class="{logged_in : logged_in}"
           v-b-modal.create_filter>
        <div v-if="!logged_in">
          Create Personalized Filter
        </div>

        <div v-else>
          + Add New Filter
        </div>
      </div>

      <CreateFilterModal @created="$refs.my_filters.load_filters()" />
    </template>

    <TxsCategoriesDropdown v-if="mq_lt_md && categories_enabled" />

    <div id="txs_list">
      <TxsCategories v-if="mq_gte_md && categories_enabled" />

      <BlockEstimate v-if="block_estimate_enabled" />

      <b-list-group v-if="have_txs">
        <b-list-group-item v-for="tx in txs"
                            :key="tx.hash"
                           class="tx_summary_container">
          <TxSummary :tx="tx.transaction" />
        </b-list-group-item>
      </b-list-group>

      <div class="text-center m-3" v-else>
        <b-spinner />
      </div>
    </div>
  </div>
</template>

<script>
import TxsFilter             from './TxsFilter'
import TxsFilterExample      from './TxsFilterExample'
import TxsFilterControls     from './TxsFilterControls'
import TxsCategories         from './TxsCategories'
import TxsCategoriesDropdown from './TxsCategoriesDropdown'
import BlockEstimate         from './BlockEstimate'
import TxSummary             from './TxSummary'
import FilterListDropdown    from './FilterListDropdown'
import CreateFilterModal     from './modals/CreateFilter'

import Authentication        from '../mixins/authentication'
import HasFilters            from '../mixins/has_filters'
import Blockchain            from '../mixins/blockchain'

import txs_config            from '../config/txs'

export default {
  name: 'TxsList',

  mixins : [Authentication, HasFilters, Blockchain],

  components : {
    TxsFilter,
    TxsFilterExample,
    TxsFilterControls,
    TxsCategories,
    TxsCategoriesDropdown,
    BlockEstimate,
    TxSummary,
    FilterListDropdown,
    CreateFilterModal
  },

  computed : {
    categories_enabled : function(){
      return txs_config.ENABLE_TX_CATEGORIES[this.active_blockchain]
    },

    block_estimate_enabled : function(){
      return txs_config.ENABLE_BLOCK_ESTIMATE[this.active_blockchain]
    },

    txs : function(){
      return this.$store.state.txs;
    },

    have_txs : function(){
      return this.txs.length != 0;
    }
  },

  watch : {
    active_blockchain : function(){
      this.$store.commit('clear_txs');
      this.network.off_connection(this.stream_txs);
      this.network.on_connection(this.stream_txs);
    }
  },

  methods : {
    msg_cb : function(tx){
      this.$store.commit('add_tx', tx);
    },

    stream_txs : function(){
      this.network.stream_txs(this.msg_cb);
    }
  },

  created : function(){
    this.network.on_connection(this.stream_txs);
  },

  destroyed : function(){
    this.network.off_connection(this.stream_txs);
    this.network.stop_streaming_txs();
  }
}
</script>

<style scoped>
#txs_list{
  border: 1px solid #f5f5f6;
  background-color: white;
}

#create_filter{
  background-color: var(--theme-color1);
  color: white;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
  text-align: center;
}

#create_filter:not(.logged_in){
  margin-top: 10px;
}

.tx_summary_container{
  padding: 0px;
}

.tx_summary_container:first-child{
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
