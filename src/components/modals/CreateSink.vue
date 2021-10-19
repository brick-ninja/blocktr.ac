<!--
  * Create Sink Modal
  * Encapsulates CreateSinkForm to create new sink
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal :id="id"
           :title="'Create ' + type_text"
           centered
           @shown="reset_validity"
           @ok="create_sink_"
           :ok-disabled="!is_valid">
    <CreateSinkForm ref="form"
                  :type="type"
             @validated="validate($event)" />
  </b-modal>
</template>

<script>
import Authentication from '../../mixins/authentication'
import ServerAPI      from '../../mixins/server_api'

import CreateSinkForm from '../forms/CreateSink'
import Validatable    from '../../mixins/validatable'

import util from '../../util'

export default {
  name: 'CreateSinkModal',

  mixins : [Authentication, ServerAPI, Validatable],

  props : {
    id : {
      type : String,
      required : true
    },

    type : {
      type : String,
      required : true
    }
  },

  components : {
    CreateSinkForm
  },

  computed : {
    type_text : function(){
      return util.capitalize(this.type)
    },
  },

  methods : {
    create_sink_ : function(){
      const params = { type : this.type, target : this.$refs.form.target }

      this.create_sink(params)
          .then(function(response){
            this.$emit('created', response.body)

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not create sink: " + msg)
          })
    }
  }
}
</script>
