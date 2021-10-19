<!--
  * Duplicate Filter Modal
  * Encapsulates CreateEditFilterForm to copy existing filter
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="duplicate_filter"
           title="Duplicate Filter"
           header-class="modal_header"
           centered
           @ok="on_ok"
           :ok-disabled="!is_valid">
    <CreateEditFilterForm ref="form"
            :duplicate_filter="filter"
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
  name: 'DuplicateFilterModal',

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
