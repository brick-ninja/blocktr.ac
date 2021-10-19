<!--
  * Account Page
  * Renders information about a single account, specified by ID
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="account">
    <div id="account">
      <div id="account_header">
        <div id="back_icon" @click="$router.back()">
          <img src="./assets/left-arrow-blue.svg" />
        </div>

        <div id="account_subheader">
          <div id="account_title">Account</div>
          <div id="account_id"><h5>{{id}}</h5></div>
        </div>
      </div>

      <div v-if="have_account" id="account_details">
        <table id="account_table">
          <tr>
            <td class="label">Balance</td>
            <td class="value">
              {{balance | round | delim}}
              <img :src="blockchain_icon" width="15px" />
            </td>
          </tr>

          <tr>
            <td class="label">Sequence</td>
            <td class="value">
              {{sequence}}
            </td>
          </tr>

          <tr>
            <td class="label">Last TX</td>
            <td class="value">
              <router-link :to="`/${active_blockchain}/tx/` + previous_txn">
                {{previous_txn | ellipsis(mq_lte_sm ? 20 : null)}}
              </router-link>
            </td>
          </tr>
        </table>
      </div>

      <div id="no_account" v-else>
        Account not found
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import TxsLayout       from './components/TxsLayout'
import Blockchain      from './mixins/blockchain'
import MultiBlockchain from './mixins/multi_blockchain'

import config     from "./config/config"

export default {
  name: 'Account',

  mixins : [
    Blockchain,
    MultiBlockchain
  ],

  components: {
    TxsLayout
  },

  props : {
    id : String
  },

  data : function(){
    return {
      have_account : false,
      balance : 0,
      sequence : 0,
      previous_txn : ''
    }
  },

  methods : {
    on_account : function(account){
      this.have_account = true;
      this.balance      = account.balance;
      this.sequence     = account.sequence;
      this.previous_txn = account.previous_txn;
    }
  },

  created : function(){
    this.persist_blockchain();
    this.network.account(this.id, this.on_account)
  }
}
</script>

<style scoped>
#account{
  height: 100%;
  display: flex;
  flex-direction: column;
}

#account_header{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

#no_account {
  color: red;
  font-family: var(--theme-font2);
  font-style: italic;
  font-size: 1.2rem;
  text-align: center;
}

#back_icon{
  flex-basis: 7%;
  cursor: pointer;
  margin-right: 5px;
}

#account_header img{
  width: 55px;
  background-color: white;
  padding: 15px;
  border-radius: 35px;
}

#account_subheader{
  word-wrap: anywhere;
}

#account_title{
  color: var(--theme-color2);
  opacity: 0.6;
  font-family: var(--theme-font2);
}

#account_id{
  font-family: var(--theme-font3);
  color: var(--theme-color2);
  font-weight: bold;
}

#account_details{
  border: 1px solid var(--theme-color3);
  background-color: white;
  padding: 25px;
  flex-grow: 1;
}

#account_table{
  width: 100%;
}

.label{
  font-weight: bold;
}

.value{
  text-align: right;
}
</style>
