<!--
  * ChangeTrust Transaction Details
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <AccountDetail v-if="mq_gte_md"
                   :account="issuer"
                   text="Issuer" />

    <XLMCurrencyAmount :currency="asset"
                       :amount="limit"
                       no_issuer />
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

import AccountDetail  from '../../AccountDetail'
import XLMCurrencyAmount from '../../currency_amount/XLM'

import config from '../../../config/config'

export default {
  name : 'ChangeTrustTx',

  mixins : [Meta],

  components : {
    XLMTxContainer,
    AccountDetail,
    XLMCurrencyAmount
  },

  computed : {
    op : function(){
      return this.operation;
    },

    line : function(){
      return this.op.line;
    },

    asset : function(){
      return this.line.assetCode;
    },

    issuer : function(){
      return this.line.issuer;
    },

    limit : function(){
      return parseInt(this.op.limit) / config.STROOPS_PER_XLM;
    }
  }
}
</script>

<style scoped>
</style>
