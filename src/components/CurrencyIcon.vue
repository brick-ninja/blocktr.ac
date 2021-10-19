<!--
  * Currency Icon Component
  * Renders graphical currency icon if it is available, else
  * just render currency text.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <span class="currency">
    <template v-if="have_icon">
      <img :src="src" />
    </template>

    <template v-else>
        <b>{{currency}}</b>
    </template>
  </span>
</template>

<script>
const CURRENCY_ICONS = require("../assets/currencies.json")

export default {
  name: 'CurrencyIcon',

  props : {
    currency: {
      type : String,
      required : true
    },
  },

  computed : {
    have_icon : function(){
      return CURRENCY_ICONS.includes(this.currency);
    },

    src : function(){
      return require("@/assets/currencies/" + this.currency + ".svg");
    }
  }
}
</script>

<style scoped>
.currency{
  margin-left: 3px;
}

.currency img{
  height: 15px;
  width: 15px;
  margin-bottom: 2px
}
</style>
