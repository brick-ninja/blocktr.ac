<!--
  * BlockEstimate Component
  * Displays estimated countdown to next block w/ leader text
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="block_estimate">
    <span v-if="mq_gt_sm">
      The latest {{txs.length}} {{active_blockchain_upper}} transactions are displayed.
    </span>

    <span v-else>
      {{txs.length}} {{active_blockchain_upper}} TXs
    </span>

    <span>
      Next block <span v-if="mq_gt_sm">@ (approx)</span><span v-else>: ~</span>

      <span id="block_estimated_time"
        :class="{elapsed : estimated_time_elapsed,
                    soon : estimated_time_soon}">
          {{(estimated_time_remaining / 1000) | round(0)}} sec<span v-if="mq_gt_sm">ond</span>s
      </span>
    </span>
  </div>
</template>

<script>
import Blockchain from '../mixins/blockchain'

export default {
  name: 'BlockEstimate',

  mixins : [Blockchain],

  data : function(){
    return {
               estimated_timer : null,
                estimated_time : null,
      estimated_time_remaining : 0
    }
  },

  computed : {
    txs : function(){
      return this.$store.state.txs;
    },

    estimated_time_elapsed : function(){
      if(!this.estimated_time) return false;
      return this.estimated_time_remaining < 0;
    },

    estimated_time_soon : function(){
      if(!this.estimated_time) return false;

      // < one minute is considered 'soon'
      return this.estimated_time_remaining < 60000;
    }
  },

  created : function(){
    this.estimated_time = this.network.next_block_time();

    if(this.estimated_time)
      this.estimated_time_remaining = this.estimated_time.getTime() - new Date().getTime();

    this.estimated_timer =
      setInterval(function(){
        this.estimated_time = this.network.next_block_time();

        if(this.estimated_time)
          this.estimated_time_remaining = this.estimated_time.getTime() - new Date().getTime();
      }.bind(this), 1000);
  },

  destroyed : function(){
    clearInterval(this.estimated_timer);
  }
}
</script>

<style scoped>
#block_estimate{
  padding: 10px;
  font-family: var(--theme-font2);
  display: flex;
  justify-content: space-between;
}

#main_layout.sm #block_estimate,
#main_layout.xs #block_estimate{
  font-size: 0.9rem;
  text-align: center;
}

#block_estimated_time.elapsed{
  color: red;
}

#block_estimated_time.soon{
  animation: blinker 2s linear infinite;
}

</style>
