<!--
  * Txs Filter Controls
  * Controls to clear and save the LiveTxs filter expression.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="txs_filter_controls">
    <b-button id="txs_filter_clear"
              class="txs_filter_control"
              :disabled="!filter"
              @click="filter = ''">
      <img src="../assets/x-black.svg" />
      <span>Clear</span>
    </b-button>

    <b-button id="txs_filter_save"
              class="txs_filter_control"
              :disabled="!filter"
              v-b-modal.save_filter>
      <img src="../assets/down-triangle-lines-plus.svg" />
      <span>Save to filter</span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'TxsFilterControls',

  computed : {
    filter : {
      get : function(){
        return this.$store.state.tx_filter;
      },

      set : function(v){
        this.$store.commit('update_tx_filter', v);
      }
    },
  }
}
</script>

<style scoped>
#txs_filter_controls{
  position: absolute;
  top: 5px;
  right: 5px;
  height: 75%;
}

#main_layout.md #txs_filter_controls,
#main_layout.sm #txs_filter_controls,
#main_layout.xs #txs_filter_controls{
  position: unset;
  margin-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column-reverse;
  border-bottom: 1px solid var(--theme-color3);
}

.txs_filter_control{
  height: 100%;
  padding: 0 5px;
}

#main_layout.md .txs_filter_control,
#main_layout.sm .txs_filter_control,
#main_layout.xs .txs_filter_control{
  width: 100%;
  margin: 5px 0;
}

#txs_filter_save{
  background-color: var(--theme-color5);
}

#txs_filter_clear{
  background-color: var(--theme-color3);
  color: black;
  margin-right: 5px;
  padding: 0px 20px;
}

.txs_filter_control img{
  margin-right: 5px;
}
</style>
