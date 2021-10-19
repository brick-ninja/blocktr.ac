<!--
  * Payment Channel Fund Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XRPTxContainer :tx="tx">
    <AccountDetail v-if="mq_gte_md"
                   :account="dst"
                   text="Destination" />

    <div class="currency_amount">
      <XRPCurrencyAmount :amount="amount" />
    </div>
  </XRPTxContainer>
</template>

<script>
import XRPTxContainer from './Container'
import Meta           from './meta'

import AccountDetail  from '../../AccountDetail'
import XRPCurrencyAmount from '../../currency_amount/XRP'

export default {
  name   : 'PaymentChannelFundTx',

  mixins : [Meta],

  components : {
    XRPTxContainer,
    AccountDetail,
    XRPCurrencyAmount
  },

  computed : {
    paychan : function(){
      return this.modified_fields("PayChannel");
    },

    amount : function(){
      return this.tx_obj["Amount"];
    },

    dst : function(){
      if(!this.paychan) return null

      return this.paychan["Destination"];
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
