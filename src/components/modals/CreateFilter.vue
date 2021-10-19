<!--
  * Create Filter Modal
  * Encapsulates CreateEditFilterForm to create new filters
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="create_filter"
           title="Create New Filter"
           ok-title="Create Filter"
           header-class="modal_header"
           centered
           @shown="reset_validity"
           @ok="on_ok"
           :ok-disabled="!is_valid">
    <CreateEditFilterForm ref="form"
                   @validated="validate($event)" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import ServerAPI            from '../../mixins/server_api'
import Validatable          from '../../mixins/validatable'
import CreatesFilter        from './creates_filter'

import CreateEditFilterForm from '../forms/CreateEditFilter'

export default {
  name: 'CreateFilterModal',

  mixins : [
    Authentication,
    ServerAPI,
    CreatesFilter,
    Validatable
  ],

  components : {
    CreateEditFilterForm
  }
}
</script>
