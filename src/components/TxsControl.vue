<!--
  * Txs Control Buttons
  * Controls which affect the contents/rendering of the
  * LiveTxs stream.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <span id="txs_controls">
    <span id="txs_play_pause" class="txs_icon" v-on:click="play_pause()">
      <img v-if="paused" src="../assets/play.svg" />
      <img v-else        src="../assets/pause.svg" />
    </span>

    <span id="clear_txs" class="txs_icon" v-on:click="clear_txs()">
      <img src="../assets/trash-red.svg" />
    </span>

    <span v-if="logged_in && mq_lte_md"
          class="txs_icon"
          style="margin-left: 5px;"
          v-b-modal.settings_modal>
      <img src="../assets/gear-gray.svg" />
    </span>
  </span>
</template>

<script>
import Authentication from '../mixins/authentication'

export default {
  name: 'TxsControl',

  mixins : [Authentication],

  computed : {
    paused : function(){
      return this.$store.state.paused_txs;
    }
  },

  methods : {
    play_pause : function(){
      this.$store.commit('toggle_paused_txs');
    },

    clear_txs : function(){
      this.$store.commit('clear_txs');
    }
  }
}
</script>

<style scoped>
#txs_controls{
  margin-top: 5px;
}

.txs_icon {
  display: inline-block;
  cursor: pointer;
}

.txs_icon img{
  width: 30px;
}

#main_layout.xs .txs_icon img{
  width: 20px;
}

#clear_txs{
  margin-left: 5px;
}
</style>
