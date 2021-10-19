<!--
  * Create Account Transaction Details
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <XLMTxContainer :tx="tx">
    <AccountDetail :account="created"
                   text="Created"
                   :shorten="42" />
  </XLMTxContainer>
</template>

<script>
import XLMTxContainer from './Container'
import Meta           from './meta'

import AccountDetail    from '../../AccountDetail'

export default {
  name : 'CreateAccountTx',

  mixins : [Meta],

  components : {
    XLMTxContainer,
    AccountDetail
  },

  computed : {
    created : function(){
      return this.operation.destination;
    }
  }
}
</script>

<style scoped>
</style>
