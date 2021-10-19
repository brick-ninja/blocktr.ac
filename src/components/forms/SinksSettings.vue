<!--
  * Sink Settings Form
  * Encapsulates Sink Inputs.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="sinks">
    <h4 id="sinks_title">Notifications:</h4>

    <div>
    Send me notifications via
    </div>

    <SinksInputs no_toggle
                 selected_lifecycle
                 ignore_sinks_per_filter />
  </div>
</template>

<script>
import SinksInputs    from './SinksInputs'
import Authentication from '../../mixins/authentication'

export default {
  name: 'SinksSettingsForm',

  mixins : [Authentication],

  components : {
    SinksInputs
  }
}
</script>

<style scoped>
#sinks{
  margin-top: 10px;
  font-family: var(--theme-font1);
}

#sinks_title{
  font-family: var(--theme-font5);
}
</style>
