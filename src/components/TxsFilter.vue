<!--
  * Txs Filter Input
  * Input which the user can enter JSONPath expression to be
  * applied against the live txs stream in their browser.
  * Contains controls to clear and save expression.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div>
    <div id="txs_filter">
      <span id="txs_filter_icon">
        <span class="text">{</span>
        <img src="../assets/search.svg" />
        <span class="text">}</span>
      </span>

      <input placeholder="JSONPath Expression..."
             :value="expression"
             @input="evnt=> expression = evnt.target.value" />

      <TxsFilterControls v-if="mq_gt_md" />

      <SaveFilterModal @created="load_filters"
                        :filter="save_filter" />
    </div>

    <div v-if="invalid" id="txs_filter_error">
      Invalid Expression
    </div>
  </div>
</template>

<script>
import Authentication    from '../mixins/authentication'
import ServerAPI         from '../mixins/server_api'
import TxsFilterControls from './TxsFilterControls'
import SaveFilterModal   from './modals/SaveFilter'

import util              from '../util'

export default {
  name: 'TxsFilter',

  mixins : [Authentication, ServerAPI],

  components : {
    TxsFilterControls,
    SaveFilterModal
  },

  data : function(){
    return {
      expression : null
    }
  },

  computed : {
    store_filter : {
      get : function(){
        return this.$store.state.tx_filter;
      },

      set : function(v){
        this.$store.commit('update_tx_filter', v);
      }
    },

    invalid : function(){
      return this.expression && !util.is_valid_jsonpath(this.expression)
    },

    save_filter : function(){
      return {jsonpath : this.expression};
    }
  },

  watch : {
    expression : function(){
      if(!this.invalid)
        this.store_filter = this.expression
    },

    store_filter : function(){
      this.expression = this.store_filter
    }
  },

  created : function(){
    if(this.store_filter)
      this.expression = this.store_filter
  }
}
</script>

<style scoped>
#txs_filter{
  position: relative;
}

input {
  width: 100%;
  padding-left: 55px;
  padding-top: 10px;
  padding-bottom: 7px;
  color: var(--theme-color4);
}

#txs_filter_icon{
  position: absolute;
  left: 10px;
  top: 5px;
  font-size: 1.2rem;
}

#txs_filter_icon img{
  padding-left: 3px;
  padding-right: 3px;
}

#txs_filter_icon .text{
  color: var(--theme-color4);
  opacity: 0.3;
}

#txs_filter_error{
  margin-left: 15px;
  margin-top: 5px;
  color: red;
  font-family: var(--theme-font2);
  font-style: italic;
  font-size: 0.8rem;
}
</style>
