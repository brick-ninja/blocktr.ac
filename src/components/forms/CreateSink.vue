<!--
  * Create Sink Form
  * Allows the user to create a new server-side notification sink.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <table id="create_sink_form">
    <tr>
      <td class="form_text">{{type_text}}:</td>
      <td>
        <input class="form_input"
               type="text"
               autocapitalize="none"
               :value="target"
               @input="evnt=> target = evnt.target.value" />

        <div v-if="!have_target"
             class="form_text form_error">
          {{type_text}} is required
        </div>

        <div v-else-if="!valid_target"
             class="form_text form_error">
          {{type_text}} is invalid
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import Validator from '../../mixins/validator'

import util from '../../util'

export default {
  name: 'CreateSinkForm',

  mixins : [Validator],

  props : {
    type : {
      type : String,
      required : true
    }
  },

  data : function(){
    return {
      target : ''
    }
  },

  computed : {
    type_text : function(){
      return util.capitalize(this.type)
    },

    have_target : function(){
      return this.target != '';
    },

    valid_target : function(){
      if(this.type == 'email')
        return util.is_valid_email(this.target)
      else if(this.type == 'sms')
        return util.is_valid_sms(this.target)
      else if(this.type == 'webhook')
        return util.is_valid_url(this.target)

      // XXX: should never get here
      throw "unknown sink type"
    },

    is_valid : function(){
      return this.have_target && this.valid_target;
    }
  }
}
</script>

<style scoped>
#create_sink_form{
  width: 100%;
}
</style>
