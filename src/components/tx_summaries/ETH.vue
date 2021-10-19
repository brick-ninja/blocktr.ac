<!--
  * ETH Tx Summary Component
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div class="eth_tx_summary" :title="title">
    <div class="from">
      <AccountLink :account="from"
                   :text="from"
                   :shorten="mq_lte_sm"
                   v-if="from" />
    </div>

    <div class="data"
         @click="nav_to_tx"
         v-if="smart_contract">
      <img src="../../assets/gear.png" />
      <div>Executed Smart Contract</div>
    </div>

    <div class="value"
         @click="nav_to_tx"
         v-else>
      <img src="../../assets/right-arrow-black.svg" />
      <ETHCurrencyAmount :amount="value" />
    </div>

    <div class="to">
      <AccountLink :account="to"
                   :text="to"
                   :shorten="mq_lte_sm"
                   v-if="to" />
    </div>
  </div>
</template>

<script>
import Meta       from './eth/meta'
import Blockchain from '../../mixins/blockchain'

import AccountLink       from '../AccountLink'
import ETHCurrencyAmount from '../currency_amount/ETH'

export default {
  name: 'ETHTxSummary',

  mixins : [
    Meta,
    Blockchain
  ],

  components : {
    AccountLink,
    ETHCurrencyAmount
  },

  computed : {
    title : function(){
      return this.formatted_date;
    }
  },

  methods : {
    nav_to_tx : function(){
      this.$router.push(`/${this.active_blockchain}/tx/` + this.hash);
    }
  }
}
</script>

<style scoped>
.eth_tx_summary{
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.data {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 22%;
  cursor: pointer;
  font-family: var(--theme-font4);
}

#main_layout.sm .data,
#main_layout.xs .data{
  flex-basis: 40%;
}

.data img{
  width: 18px;
  height: 18px;
}

.data div{
  font-size: 0.5rem;
}

.value{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 22%;
  cursor: pointer;
  font-family: var(--theme-font4);
}

#main_layout.sm .value,
#main_layout.xs .value{
  flex-basis: 40%;
}

.from,
.to{
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 39%;
}

#main_layout.sm .from,
#main_layout.xs .from,
#main_layout.sm .to,
#main_layout.xs .to{
  flex-basis: 30%;
}

.to{
  text-align: right;
}
</style>
