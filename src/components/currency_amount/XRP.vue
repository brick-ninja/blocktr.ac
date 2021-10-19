<!--
  * XRP Currency Amount Component
  * Renders a currency with icon and optional issuer as specified
  * by the given params.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <span>
    <span v-if="is_drops">
      <b v-if="!no_amount" class="amount">{{xrp_amount | abbrev}}</b>

      <span class="currency">
        <CurrencyIcon currency="XRP" />
      </span>
    </span>

    <span v-else>
      <b v-if="!no_amount" class="amount">{{amount["value"] | abbrev}}</b>

      <CurrencyIcon :currency="amount['currency']" />

      <sup v-if="!no_issuer">
        <AccountLink :account="amount['issuer']" shorten/>
      </sup>
    </span>
  </span>
</template>

<script>
import AccountLink  from '../AccountLink.vue'
import CurrencyIcon from '../CurrencyIcon.vue'

import config       from '../../config/config'

export default {
  name: 'XRPCurrencyAmount',

  props : {
    amount : {
      type : [String, Number, Object],
      required : true
    },

    no_amount : Boolean,
    no_issuer : Boolean
  },

  components : {
    AccountLink,
    CurrencyIcon
  },

  computed : {
    is_drops : function(){
      var t = typeof(this.amount);
      return t === "string" || t === "number";
    },

    is_iou : function(){
      return !this.is_drops;
    },

    xrp_amount : function(){
      return parseFloat(this.amount) / config.DROPS_PER_XRP;
    }
  }
}
</script>
