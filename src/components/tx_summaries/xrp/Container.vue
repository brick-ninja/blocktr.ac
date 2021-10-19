<!--
  * XRP Tx Container
  * Wrapping container encapsulation every transaction, providing
  * slot for tx-type specific rendering.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div class="xrp_tx_container">
    <div class="tx_icon"
         @click="nav_to_tx">
      <div class="tx_icon_wrapper"
          :class="success ? 'success' : 'failed'">
        <img :src="tx_icon" />
      </div>
    </div>

    <div class="tx_timestamp_type">
      <div class="tx_timestamp tx_detail_label">
        {{formatted_date}}
      </div>

      <div class="tx_type">
        {{tx_short_type}}
      </div>
    </div>

    <AccountDetail v-if="mq_gte_md"
                   :account="account"
                   text="Account" />

    <slot></slot>
  </div>
</template>

<script>
import AccountDetail from '../../AccountDetail'
import Meta          from './meta'
import Blockchain    from '../../../mixins/blockchain'

export default {
  name: 'XRPTxContainer',

  mixins : [
    Meta,
    Blockchain
  ],

  components : {
    AccountDetail
  },

  computed : {
    tx_icon : function(){
      const color = this.success ? 'blue' : 'white';
      const asset = this.tx_category
                         .replace(" ", "-")
                         .toLowerCase() +
                    '-' + color + '.svg';

      return require('../../../assets/txs/' + asset);
    }
  },

  methods : {
    nav_to_tx : function(){
      this.$router.push(`/${this.active_blockchain}/tx/` + this.hash);
    }
  }
}
</script>

<style scoped>
.xrp_tx_container{
  display: flex;
}

.tx_icon{
  flex-basis: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.tx_icon img{
  width: 20px;
  height: 20px;
}

#main_layout.sm .tx_icon img,
#main_layout.xs .tx_icon img{
  width: 15px;
  height: 15px;
}

.tx_icon_wrapper{
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border-radius: 50%;
}

#main_layout.sm .tx_icon_wrapper,
#main_layout.xs .tx_icon_wrapper{
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

.tx_icon_wrapper.success{
  background-color: #ebf4ff;
}

.tx_icon_wrapper.failed{
  background-color: #d05136;
}

.tx_timestamp_type{
  flex-basis: 14%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.tx_timestamp{
  font-size: 0.6rem;
}

#main_layout.sm .tx_timestamp,
#main_layout.xs .tx_timestamp{
  white-space: nowrap;
}

.tx_type{
  font-size: 0.8rem;
}
</style>
