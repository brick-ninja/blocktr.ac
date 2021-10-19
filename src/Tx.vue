<!--
  * Tx Page
  * Renders information about a single transaction,
  * specified by hash
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="tx">
    <div id="tx">
      <div id="tx_header">
        <div id="back_icon" @click="$router.back()">
          <img src="./assets/left-arrow-blue.svg" />
        </div>

        <div id="tx_subheader">
          <div id="tx_title">Transaction</div>
          <div id="tx_hash"><h5>{{hash}}</h5></div>
        </div>
      </div>

      <div v-if="has_tx" id="tx_details">
        <div>
          <TxSummary :tx="tx.transaction" />
        </div>

        <div id="rendered_tx">
          <renderjson :data="tx" level="2" />
        </div>
      </div>

      <div id="no_transaction" v-else>
        Transaction not found
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import TxsLayout       from './components/TxsLayout'
import TxSummary       from './components/TxSummary'
import MultiBlockchain from './mixins/multi_blockchain'

import renderjson from './vendor/renderjson/renderjson.vue'

export default {
  name: 'Tx',

  mixins : [
    MultiBlockchain
  ],

  components: {
    TxsLayout,
    TxSummary,
    renderjson
  },

  props : {
    hash : String
  },

  data : function(){
    return {
      tx : null
    };
  },

  computed : {
    has_tx : function(){
      return !!this.tx;
    }
  },

  methods : {
    on_tx : function(tx){
      this.tx = tx;
    }
  },

  created : function(){
    this.persist_blockchain();
    this.network.tx(this.hash, this.on_tx)
  }
}
</script>

<style scoped>
#tx_header{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

#no_transaction {
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

#tx_header img{
  width: 55px;
  background-color: white;
  padding: 15px;
  border-radius: 35px;
}

#tx_subheader{
  word-wrap: anywhere;
}

#tx_title{
  color: var(--theme-color2);
  opacity: 0.6;
  font-family: var(--theme-font2);
}

#tx_hash{
  font-family: var(--theme-font3);
  color: var(--theme-color2);
  font-weight: bold;
}

#tx_details{
  border: 1px solid var(--theme-color3);
  background-color: white;
}

#rendered_tx{
  border-top: 1px solid var(--theme-color3);
  padding: 15px;
}
</style>

<style>
#rendered_tx pre{
  margin-bottom: 0;
}
</style>
