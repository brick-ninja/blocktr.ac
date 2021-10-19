<!--
  * Account Set Transaction Details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XRPTxContainer :tx="tx">
    <div class="domain" v-if="domain">
      <div class="tx_detail_label">Domain</div>
      <div>{{domain}}</div>
    </div>
  </XRPTxContainer>
</template>

<script>
import XRPTxContainer from './Container'
import Meta           from './meta'

import util           from '../../../util'

// TODO: also SetFlag, ClearFlag, EmailHash, MessageKey, TransferRate, TickSize

export default {
  name   : 'AccountSet',

  mixins : [Meta],

  components : {
    XRPTxContainer
  },

  computed : {
    domain : function(){
      if(!this.tx_obj.Domain) return null;

      const decoded = util.hex_to_ascii(this.tx_obj.Domain);
      if(decoded.length < 15) return decoded;

      return decoded.substr(0, 15) + "...";
    }
  }
}
</script>

<style scoped>
.domain{
  flex-basis: 7%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#main_layout.sm .domain,
#main_layout.xs .domain{
  flex-basis: 78%;
}
</style>
