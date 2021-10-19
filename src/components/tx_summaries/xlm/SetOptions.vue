<!--
  * SetOptions Transaction Details
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <div class="options">
      <div v-for="option in human_options" :key="option">
        {{option}}
      </div>
    </div>
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

var Inflector = require('inflector-js')

export default {
  name : 'SetOptionsTx',

  mixins : [Meta],

  components : {
    XLMTxContainer,
  },

  computed : {
    op : function(){
      return this.operation;
    },

    options : function(){
      return Object.keys(this.op).filter((k) => this.op[k] != undefined);
    },

    human_options : function(){
      return this.options.map((o) => Inflector.humanize(Inflector.underscore(o)));
    }
  }
}
</script>

<style scoped>
.options{
  flex-basis: 46%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#main_layout.sm .options,
#main_layout.xs .options{
  flex-basis: 78%;
}
</style>
