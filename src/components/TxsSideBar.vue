<!--
  * Txs SideBar
  * Only displayed on larger resolutions, encapsulates
  * MyFilters and AccountMonitor component
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-container>
    <b-row v-if="logged_in"
           id="live_nav"
           :class="{active : on_txs_page}">
      <b-col class="p-0">
        <router-link to="/txs">
          <div>
            <span id="live_leader">Live</span>
            <span>All Transactions</span>
          </div>

          <div>
            <img src="../assets/right-arrow.svg" />
          </div>
        </router-link>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="p-0">
        <MyFilters />
      </b-col>
    </b-row>

    <b-row class="mt-4" v-if="!logged_in">
      <b-col>
        <AccountMonitor />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MyFilters      from './MyFilters'
import AccountMonitor from './AccountMonitor'

import Authentication from '../mixins/authentication'

export default {
  name: 'TxsSideBar',

  mixins : [Authentication],

  components: {
    MyFilters,
    AccountMonitor,
  },

  computed : {
    on_txs_page : function(){
      return this.$route.path == "/txs";
    }
  }
}
</script>

<style scoped>
#live_nav{
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;

  text-align: center;
  font-weight: bold;
  font-family: var(--theme-font1);
  font-size: 0.8rem;
  border-radius: 3px;
}

#live_nav a{
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
}

#live_nav #live_leader{
  background-color: var(--theme-color5);
  color: white;
  font-family: var(--theme-font3);
  padding: 3px 5px;
  margin-right: 10px;
  border-radius: 10px;
}

#live_nav.active{
  background-color: var(--theme-color6);
  border: 1px solid var(--theme-color1);
  border-radius: 5px;
  color: #415166;
}
</style>
