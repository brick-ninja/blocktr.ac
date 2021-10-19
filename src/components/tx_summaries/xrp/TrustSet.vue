<!--
  * Trust Set Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XRPTxContainer :tx="tx">
    <AccountDetail v-if="mq_gte_md"
                   :account="issuer"
                   text="Issuer" />

    <div class="currency_amount">
      <XRPCurrencyAmount :amount="limit_amount"
                         no_issuer
                         v-if="!revoked" />
      <span style="color: red" v-else>
        Revoked
      </span>
    </div>
  </XRPTxContainer>
</template>

<script>
import XRPTxContainer from './Container'
import Meta           from './meta'

import AccountDetail  from '../../AccountDetail'
import XRPCurrencyAmount from '../../currency_amount/XRP'

export default {
  name   : 'TrustSetTx',

  mixins : [Meta],

  components : {
    XRPTxContainer,
    AccountDetail,
    XRPCurrencyAmount
  },

  computed : {
    limit_amount : function(){
      return this.tx_obj["LimitAmount"];
    },

    issuer : function(){
      return this.limit_amount["issuer"];
    },

    value : function(){
      return this.limit_amount["value"];
    },

    currency : function(){
      return this.limit_amount["currency"];
    },

    revoked : function(){
      return this.value == "0";
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
