<!--
  * Duplicate Filter Modal
  * Encapsulates CreateEditFilterForm to save TxsFilter expression
  * to new filter.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="save_filter"
           title="Save Filter"
           header-class="modal_header"
           centered
           @shown="reset_validity"
           @ok="on_ok"
           :ok-disabled="!is_valid">
    <CreateEditFilterForm ref="form"
                 :save_filter="filter"
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
  name: 'SaveFilterModal',

  mixins : [
    Authentication,
    ServerAPI,
    CreatesFilter,
    Validatable
  ],

  components : {
    CreateEditFilterForm
  },

  props : {
    filter : {
      type : Object,
      required : true
    }
  }
}
</script>
