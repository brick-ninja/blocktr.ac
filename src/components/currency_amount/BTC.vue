<!--
  * BTC Currency Amount Component
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <span>
    <b v-if="!no_amount">{{btc_amount | abbrev(mq_lte_sm ? 3 : null)}}</b>

    <span class="currency">
      <CurrencyIcon currency="BTC" />
    </span>
  </span>
</template>

<script>
import CurrencyIcon from '../CurrencyIcon'
import config       from '../../config/config.js'

export default {
  name: 'BTCCurrencyAmount',

  props : {
    amount : {
      type : [String, Number],
      required : true
    },

    no_amount : Boolean
  },

  components : {
    CurrencyIcon
  },

  computed : {
    btc_amount : function(){
      return parseFloat(this.amount) / config.SATOSHIS_PER_BTC;
    }
  }
}
</script>
