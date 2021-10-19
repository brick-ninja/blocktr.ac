<!--
  * Account Link Component
  * Renders link to account page
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <span class="account_link"
        @click="nav_to_account">
    {{text}}
  </span>
</template>

<script>
import config from '../config/config'
import Blockchain     from '../mixins/blockchain'

export default {
  name: 'AccountLink',

  mixins: [
    Blockchain
  ],

  props : {
    account : String,
    shorten : [Boolean, Number],
  },

  computed : {
    text : function(){
      if (this.shorten) {
        let length;
        if (Number.isInteger(this.shorten)) {
          length = this.shorten;
        } else {
          length = 7;
        }
        return this.account.substr(0, length) + "...";
      }
      return this.account;
    },
  },

  methods : {
    nav_to_account : function(){
      this.$router.push(`/${this.active_blockchain}/account/` + this.account);
    }
  }
}
</script>

<style scoped>
.account_link{
  font-size: 0.60rem;
  cursor: pointer;
  color: var(--theme-color1);
}
</style>
