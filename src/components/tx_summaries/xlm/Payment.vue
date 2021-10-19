<!--
  * Payment Transaction Details
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <AccountDetail v-if="mq_gte_md"
                   :account="dst"
                   text="Destination" />

    <div class="currency_amount">
      <XLMCurrencyAmount :currency="asset"
                         :amount="amount"
                         no_issuer />
    </div>
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

import XLMCurrencyAmount from '../../currency_amount/XLM'
import AccountDetail  from '../../AccountDetail'

export default {
  name : 'PaymentTx',

  mixins : [Meta],

  components : {
    XLMTxContainer,
    XLMCurrencyAmount,
    AccountDetail
  },

  computed : {
    op : function(){
      return this.operation;
    },

    dst : function(){
      return this.op.destination;
    },

    asset : function(){
      return this.op.asset;
    },

    amount : function(){
      return parseInt(this.op.amount);
    }
  }
}
</script>

<style scoped>
.currency_amount{
  flex-basis: 14%;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main_layout.sm .currency_amount,
#main_layout.xs .currency_amount{
  flex-basis: 78%;
}
</style>
