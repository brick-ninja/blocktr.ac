<!--
  * Payment Channel Claim Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XRPTxContainer :tx="tx">
    <div class="balance_amount">
      <div class="tx_detail_label">
        <span v-if="has_amount">Amount</span>
        <span v-if="has_amount && has_balance">/</span>
        <span v-if="has_balance">Balance</span>
      </div>

      <span v-if="has_amount">{{amount}}</span>
      <span v-if="has_amount && has_balance">/</span>
      <span v-if="has_balance">{{balance}}</span>
    </div>

    <div class="status">
      <span v-if="renewed"     style="color: green">Renewed</span>
      <span v-else-if="closed" style="color: red">Closed</span>
    </div>
  </XRPTxContainer>
</template>

<script>
import XRPTxContainer from './Container'
import Meta           from './meta'

export default {
  name   : 'PaymentChannelClaimTx',

  mixins : [Meta],

  components : {
    XRPTxContainer,
  },

  computed : {
    amount : function(){
      return this.tx_obj["Amount"];
    },

    has_amount : function(){
      return !!this.amount;
    },

    balance : function(){
      return this.tx_obj["Balance"];
    },

    has_balance : function(){
      return !!this.balance;
    },

    flags : function(){
      return this.tx_obj["Flags"];
    },

    renewed : function(){
      return this.flags & 0x00010000;
    },

    closed : function(){
      return this.flags & 0x00020000;
    }
  }
}
</script>

<style scoped>
.balance_amount{
  flex-basis: 39%;
}

.status{
  flex-basis: 7%;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main_layout.sm .balance_amount,
#main_layout.xs .balance_amount{
  flex-basis: 67%;
}

#main_layout.sm .status,
#main_layout.xs .status{
  flex-basis: 11%;
}
</style>
