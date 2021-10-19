<!--
  * BumpSequence Transaction Details
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <div class="bump_sequence">
      <div class="tx_detail_label">
        Bumped To
      </div>

      <div class="bumped_to">
        {{bumped_to}}
      </div>
    </div>
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

export default {
  name : 'BumpSequenceTx',

  mixins : [Meta],

  components : {
    XLMTxContainer,
  },

  computed : {
    bumped_to : function(){
      return this.operation.bumpTo;
    }
  }
}
</script>

<style scoped>
.bump_sequence{
  font-size: 0.8rem;
  flex-basis: 46%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#main_layout.sm .bump_sequence,
#main_layout.xs .bump_sequence{
  flex-basis: 78%;
}
</style>
