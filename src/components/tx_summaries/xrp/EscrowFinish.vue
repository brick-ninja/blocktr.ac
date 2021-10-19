<!--
  * Escrow Finish Transaction Details
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XRPTxContainer :tx="tx">
    <div class="amount" v-if="amount">
      <span>
        {{amount}}
        <CurrencyIcon currency="XRP" />
      </span>
    </div>

    <div class="sequence" v-else>
      <div class="tx_detail_label">Sequence</div>
      <div>{{sequence}}</div>
    </div>
  </XRPTxContainer>
</template>

<script>
import XRPTxContainer from './Container'
import Meta           from './meta'

import CurrencyIcon from '../../CurrencyIcon'
import config       from '../../../config/config'

export default {
  name   : 'EscrowFinishTx',

  mixins : [Meta],

  components : {
    XRPTxContainer,
    CurrencyIcon
  },

  computed : {
    sequence : function(){
      return this.tx_obj["OfferSequence"];
    },

    escrow : function(){
      return this.deleted_fields('Escrow')
    },

    amount : function(){
      if(!this.escrow) return null;
      return parseFloat(this.escrow["Amount"]) / config.DROPS_PER_XRP;
    }
  }
}
</script>

<style scoped>
.amount{
  flex-basis: 46%;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.sequence{
  flex-basis: 46%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#main_layout.sm .amount,
#main_layout.xs .amount,
#main_layout.sm .sequence,
#main_layout.xs .sequence{
  flex-basis: 78%;
}
</style>
