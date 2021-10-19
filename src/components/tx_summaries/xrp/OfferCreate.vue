<!--
  * Offer Create Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XRPTxContainer :tx="tx">
    <template v-if="mq_gte_md">
      <div class="buy_amount">
        <div class="tx_detail_label">Buying</div>

        <span class="currency_amount">
          <XRPCurrencyAmount :amount="pays" no_issuer />
        </span>
      </div>

      <div class="sell_amount">
        <div class="tx_detail_label">Selling</div>

        <span class="currency_amount">
          <XRPCurrencyAmount :amount="gets" no_issuer />
        </span>
      </div>
    </template>

    <div v-else
         class="buy_sell_pair">
      <div class="tx_detail_label">Buying/Selling</div>

      <span class="currencies">
        <XRPCurrencyAmount :amount="pays" no_amount no_issuer /> /
        <XRPCurrencyAmount :amount="gets" no_amount no_issuer />
      </span>
    </div>
  </XRPTxContainer>
</template>

<script>
import XRPTxContainer from './Container'
import Meta           from './meta'

import XRPCurrencyAmount from '../../currency_amount/XRP'

export default {
  name   : 'OfferCreateTx',

  mixins : [Meta],

  components : {
    XRPTxContainer,
    XRPCurrencyAmount
  },

  computed : {
    offer : function(){
      // need to pull fields from tx_obj for failed OfferCreates
      return this.created_fields('Offer') || this.tx_obj;
    },

    gets : function(){
      return this.offer["TakerGets"];
    },

    pays : function(){
      return this.offer["TakerPays"];
    }
  }
}
</script>

<style scoped>
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
