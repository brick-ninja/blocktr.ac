<!--
  * XLM Currency Amount Component
  * Renders a currency with icon and optional issuer as specified
  * by the given params.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <span>
    <span v-if="is_native">
      <b v-if="have_amount && !no_amount"
         class="amount">
        {{amount | abbrev}}
      </b>

      <span class="currency">
        <CurrencyIcon currency="XLM" />
      </span>
    </span>

    <span v-else>
      <b v-if="have_amount && !no_amount"
         class="amount">
        {{amount | abbrev}}
      </b>

      <CurrencyIcon :currency="asset_code" />

      <sup v-if="!simple_currency && !no_issuer">
        <AccountLink :account="issuer" shorten />
      </sup>
    </span>
  </span>
</template>

<script>
import AccountLink  from '../AccountLink'
import CurrencyIcon from '../CurrencyIcon'

export default {
  name: 'XLMCurrencyAmount',

  components : {
    AccountLink,
    CurrencyIcon
  },

  props : {
    currency : {
      type : [Object, String],
      required : true
    },

    amount : {
      type : Number,
    },

    no_amount : Boolean,
    no_issuer : Boolean
  },

  computed : {
    have_amount : function(){
      return !!this.amount || this.amount == 0;
    },

    is_native : function(){
      return this.currency == "assetTypeNative";
    },

    simple_currency : function(){
      return typeof(this.currency) === 'string';
    },

    asset_code : function(){
      return this.simple_currency ?
             this.currency :
             this.currency.assetCode;
    },

    issuer : function(){
      return this.currency.issuer;
    }
  }
}
</script>
