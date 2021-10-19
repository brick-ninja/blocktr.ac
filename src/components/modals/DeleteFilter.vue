<!--
  * Delete Filter Modal
  * Warns / prompts user to verify deleting filter action
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="delete_filter"
           title="Delete Filter"
           header-class="modal_header"
           @ok="delete_filter_">
    <h3>Are you sure?</h3>
    <h5><i>This cannot be undone</i></h5>
  </b-modal>
</template>

<script>
import Authentication from '../../mixins/authentication'
import ServerAPI      from '../../mixins/server_api'

import util from '../../util'

export default {
  name: 'DeleteFilterModal',

  mixins : [Authentication, ServerAPI],

  props : {
    filter : {
      type : Object,
      required : true
    }
  },

  methods : {
    delete_filter_ : function(){
      this.delete_filter(this.filter.id)
          .then(function(response){
            this.$emit('deleted')

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not delete filter: " + msg)
          })
    }
  }
}
</script>
