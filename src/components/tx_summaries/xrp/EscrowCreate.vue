<!--
  * Escrow Create Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XRPTxContainer :tx="tx">
    <div class="currency_amount">
      <XRPCurrencyAmount :amount="amount" />
    </div>
  </XRPTxContainer>
</template>

<script>
import XRPTxContainer from './Container'
import Meta           from './meta'

import XRPCurrencyAmount from '../../currency_amount/XRP'

export default {
  name   : 'EscrowCreateTx',

  mixins : [Meta],

  components : {
    XRPTxContainer,
    XRPCurrencyAmount
  },

  computed : {
    amount : function(){
      return this.tx_obj["Amount"];
    }
  }
}
</script>

<style scoped>
.currency_amount{
  flex-basis: 46%;
  font-size: 0.8rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#main_layout.sm .currency_amount,
#main_layout.xs .currency_amount{
  flex-basis: 78%;
}
</style>
