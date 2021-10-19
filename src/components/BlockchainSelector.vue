<!--
  * Blockchain Selector
  * Allows user to select the active blockchain to view on the website.
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <multiselect v-model="selected"
               :options="blockchains"
               :allow-empty="false"
               :multiple="false"
               :searchable="false"
               selectLabel=""
               deselectLabel=""
               selectedLabel="">
    <template slot="singleLabel" slot-scope="props">
      <CurrencyIcon :currency="props.option.toUpperCase()" />
      {{props.option.toUpperCase()}}
    </template>

    <template slot="option" slot-scope="props">
      <div class="option">
      <CurrencyIcon :currency="props.option.toUpperCase()" />
      {{props.option.toUpperCase()}}
      </div>
    </template>
  </multiselect>
</template>

<script>
import CurrencyIcon    from '../components/CurrencyIcon'
import config          from '../config/config'
import network_config  from '../config/network'
import MultiBlockchain from '../mixins/multi_blockchain'

export default {
  name: 'BlockchainSelector',

  mixins : [
    MultiBlockchain
  ],

  components : {
    CurrencyIcon
  },

  computed : {
    blockchains : function(){
      return network_config.BLOCKCHAINS;
    },

    stored : {
      get : function(){
        return this.$cookies.selected_blockchain;
      },

      set : function(s){
        this.$setCookie('selected_blockchain', s);
      }
    },

    selected : {
      get : function(){
        return this.$store.state.selected_blockchain;
      },

      set : function(selected){
        this.$store.commit('set_selected_blockchain', selected);
      }
   }
  },

  watch : {
    selected : function(){
      this.stored = this.selected;
    }
  },

  created : function(){
    // XXX: Invoke on next tick so that if stored blockchain
    // is different than default watchers / handlers can be
    // registered before we switch over.
    this.$nextTick(function(){
      this.persist_blockchain(this.stored);
    }.bind(this))
  }
}
</script>

<style scoped>
.multiselect{
  width: unset;
  margin-left: 10px;
}

.multiselect__option--selected .option{
  background-color: #f3f3f3;
}

.multiselect__option--selected.multiselect__option--highlight .option{
  background-color: #ff6a6a;
}
</style>
