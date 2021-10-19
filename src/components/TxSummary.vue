<!--
  * Tx Summary Component
  * Dispatches to Blockchain Specific Tx Summary Component
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div>
    <XRPTxSummary :tx="tx" v-if="xrp_active" />
    <XLMTxSummary :tx="tx" v-if="xlm_active" />
    <BTCTxSummary :tx="tx" v-if="btc_active" />
    <ETHTxSummary :tx="tx" v-if="eth_active" />
  </div>
</template>

<script>
import XRPTxSummary from './tx_summaries/XRP'
import XLMTxSummary from './tx_summaries/XLM'
import BTCTxSummary from './tx_summaries/BTC'
import ETHTxSummary from './tx_summaries/ETH'

import Blockchain   from '../mixins/blockchain'

export default {
  name: 'TxSummary',

  mixins : [Blockchain],

  components : {
    XRPTxSummary,
    XLMTxSummary,
    BTCTxSummary,
    ETHTxSummary
  },

  props : {
    tx : {
      type : Object,
      required : true
    }
  }
}
</script>
