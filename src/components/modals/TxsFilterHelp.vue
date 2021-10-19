<!--
  * Txs Filter Help Modal
  * Encapsulates Txs Filter Help content
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="txs_filter_help"
           ref="txs_filter_help"
           title="JSONPath Help"
           header-class="modal_header"
           size="lg"
           ok-only>
    <FilterHelp @set="set_filter"/>
  </b-modal>
</template>

<script>
import FilterHelp from '../FilterHelp'

export default {
  name: 'TxsFilterHelpModal',

  components : {
    FilterHelp
  },

  methods : {
    set_filter : function(filter){
      this.$store.commit('update_tx_filter', filter);
      this.$refs.txs_filter_help.hide()
    }
  }
}
</script>
