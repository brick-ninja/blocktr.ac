<!--
  * Txs Page
  * Encapsulates the TxsList component
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="txs">
    <TxsList />
  </TxsLayout>
</template>

<script>
import TxsLayout from './components/TxsLayout'
import TxsList   from './components/TxsList'

import Maintenance from './mixins/maintenance'

export default {
  name: 'Txs',

  mixins : [Maintenance],

  components: {
    TxsLayout,
    TxsList
  },

  created : function(){
    if(this.maintenance_mode){
      this.nav_to_maintenance();
      return;
    }
  }
}
</script>
