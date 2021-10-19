<!--
  * Txs Filter Example
  * Clickable example displayed under Txs Filter, along with
  * modal containing TxsFilterHelp content
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="txs_filter_example">
    <div id="txs_filter_example_label">
      Example:
    </div>

    <div id="txs_filter_example_jsonpath">
      <span @click="set_filter(example)">{{example}}</span>

      <img id="txs_filter_example_icon"
           v-b-modal.txs_filter_help
           src="../assets/question.svg" />
    </div>

    <FilterHelpModal />
  </div>
</template>

<script>
import FilterHelpModal from './modals/TxsFilterHelp'
import Blockchain      from '../mixins/blockchain'

export default {
  name: 'TxFilterExample',

  mixins : [Blockchain],

  components : {
    FilterHelpModal
  },

  computed : {
    example : function(){
      return this.blockchain_jsonpath_example.expression;
    }
  },

  methods : {
    set_filter : function(filter){
      this.$store.commit('update_tx_filter', filter);
    }
  }
}
</script>

<style scoped>
#txs_filter_example{
  margin-top: 15px;
  margin-bottom: 15px;
  font-family: var(--theme-font1);
  display: flex;
  align-items: center;
}

#main_layout.sm #txs_filter_example,
#main_layout.xs #txs_filter_example{
  font-size: 0.85rem;
  display: block;
}


#txs_filter_example_label{
  color: var(--theme-color4);
  margin-right: 5px;
  margin-top: 3px;
  opacity: 0.7;
}

#txs_filter_example_jsonpath{
  color: var(--theme-color1);
  margin-right: 5px;
  margin-top: 3px;
  cursor: pointer;

  display: flex;
  align-items: center;
}

#txs_filter_example_icon{
  margin-left: 5px;
}
</style>
