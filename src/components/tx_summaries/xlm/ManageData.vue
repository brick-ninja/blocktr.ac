<!--
  * ManageData Transaction Details
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <div class="manage_data">
      <div>
        <span>{{name}}: </span>

        <span v-if="deleted">
          Deleted
        </span>

        <span v-else>
          {{value_string}}
        </span>
      </div>
    </div>

  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

export default {
  name : 'ManageDataTx',

  mixins : [Meta],

  components : {
    XLMTxContainer,
  },

  computed : {
    op : function(){
      return this.operation;
    },

    name : function(){
      return this.op.dataName;
    },

    value : function(){
      return this.op.dataValue;
    },

    value_string : function(){
      const vstr = this.value.toString();
      return vstr == "" ? typeof(this.value) : vstr;
    },

    deleted : function(){
      return this.value == "undefined";
    }
  }
}
</script>

<style scoped>
.manage_data{
  flex-basis: 46%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#main_layout.sm .manage_data,
#main_layout.md .manage_data{
  flex-basis: 78%;
}
</style>
