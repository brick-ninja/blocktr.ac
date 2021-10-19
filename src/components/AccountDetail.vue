<!--
  * Account Detail Component
  * Renders account detail icon, link to account page,
  * and configurable text.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div class="account_detail">
    <div class="tx_detail_label">
      <img src="../assets/person.svg" />&nbsp;
      <span>{{text}}</span>
    </div>

    <AccountLink :account="account" :shorten="shorten" />
  </div>
</template>

<script>
import AccountLink from './AccountLink'

export default {
  name: 'AccountDetail',

  components : {
    AccountLink
  },

  props : {
    text : {
      type : String,
      required : true
    },

    account : {
       type : String,
       required : true
    },

    shorten : {
      type : [Boolean, Number],
      default : false
    }
  }
}
</script>

<style scoped>
.account_detail{
  flex-basis: 32%;
  font-size: 0.8rem;
}
</style>
