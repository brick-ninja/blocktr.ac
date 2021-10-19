<!--
  * Signer List Set Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XRPTxContainer :tx="tx">
    <div class="signers">
      <div class="tx_detail_label">Signers</div>
      <span>{{num}}</span>
    </div>

    <div class="quorum">
      <div class="tx_detail_label">Quorum</div>
      <span>{{quorum}}</span>
    </div>
  </XRPTxContainer>
</template>

<script>
import XRPTxContainer from './Container'
import Meta           from './meta'

export default {
  name   : 'SignerListSetTx',

  mixins : [Meta],

  components : {
    XRPTxContainer
  },

  computed : {
    num : function(){
      return this.tx_obj["SignerEntries"].length;
    },

    quorum : function(){
      return this.tx_obj["SignerQuorum"];
    }
  }
}
</script>

<style scoped>
.signers,
.quorum{
  flex-basis: 23%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#main_layout.sm .signers,
#main_layout.xs .signers,
#main_layout.sm .quorum,
#main_layout.xs .quorum{
  flex-basis: 39%;
}
</style>
