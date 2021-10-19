<!--
  * Duplicate Filter Modal
  * Encapsulates CreateEditFilterForm to edit existing filter
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="edit_filter"
           title="Edit Filter"
           header-class="modal_header"
           centered
           @ok="on_ok"
           :ok-disabled="!is_valid">
    <CreateEditFilterForm ref="form"
                 :edit_filter="filter"
                   @validated="validate($event)" />
  </b-modal>
</template>

<script>
import Authentication       from '../../mixins/authentication'
import ServerAPI            from '../../mixins/server_api'

import CreateEditFilterForm from '../forms/CreateEditFilter'
import Validatable          from '../../mixins/validatable'

import util from '../../util'

export default {
  name: 'EditFilterModal',

  mixins : [Authentication, ServerAPI, Validatable],

  components : {
    CreateEditFilterForm
  },

  props : {
    filter : {
      type : Object,
      required : true
    }
  },

  methods : {
    on_ok : function(){
      this.edit_filter_();
    },

    edit_filter_ : function(){
      var params = this.$refs.form.server_params;

      this.update_filter(this.filter.id, params)
          .then(function(response){
            const filter = response.body;
            this.$emit('edited', filter);

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not update filter: " + msg)
          }.bind(this))
    }
  }
}
</script>
