<!--
  * ManageBuyOffer Transaction Details
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <div v-if="deleted" class="deleted">
      Deleted
    </div>

    <template v-else-if="mq_gte_md">
      <div class="buy_amount">
        <div class="tx_detail_label">Buying</div>
        <span class="currency_amount">
          <XLMCurrencyAmount :currency="buying"
                             :amount="amount"
                             no_issuer />
        </span>
      </div>

      <div class="sell_amount">
        <div class="tx_detail_label">Selling</div>

        <span class="currency_amount">
          <XLMCurrencyAmount :currency="selling"
                             :amount="selling_amount"
                             no_issuer />
        </span>
      </div>
    </template>

    <div v-else
         class="buy_sell_pair">
      <div class="tx_detail_label">Buying/Selling</div>

      <span class="currencies">
        <XLMCurrencyAmount :currency="buying"
                           :amount="amount"
                           no_amount no_issuer /> /
        <XLMCurrencyAmount :currency="selling"
                           :amount="selling_amount"
                           no_amount no_issuer />
      </span>
    </div>
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

import XLMCurrencyAmount from '../../currency_amount/XLM'

import config            from '../../../config/config'

export default {
  name : 'ManageBuyOfferTx',

  mixins : [Meta],

  components : {
    XLMTxContainer,
    XLMCurrencyAmount
  },

  computed : {
    op : function(){
      return this.operation;
    },

    selling : function(){
      return this.op.selling;
    },

    buying : function(){
      return this.op.buying;
    },

    amount : function(){
      return parseInt(this.op.buyAmount) / config.STROOPS_PER_XLM;
    },

    deleted : function(){
      return this.amount == 0;
    },

    price : function(){
      return this.op.price;
    },

    selling_amount : function(){
      return this.amount * this.price;
    }
  }
}
</script>

<style scoped>
.deleted{
  flex-basis: 46%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

#main_layout.sm .deleted,
#main_layout.xs .deleted{
  flex-basis: 78%;
}

.buy_amount,
.sell_amount{
  flex-basis: 23%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.buy_sell_pair{
  flex-basis: 78%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
