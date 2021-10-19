<!--
  * Create Filter Modal
  * Encapsulates RegistrationForm to create new user
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="register_modal"
           ref="register_modal"
           title="Register"
           ok-title="Register"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @shown="shown"
           @ok="register"
           :ok-disabled="!is_valid"
           no-stacking>
    <RegistrationForm ref="form"
               @validated="validate($event)"
               @submit="submit" />
  </b-modal>
</template>

<script>
import RegistrationForm from '../forms/Registration'
import Validatable      from '../../mixins/validatable'

export default {
  name: 'RegistrationModal',

  mixins : [Validatable],

  components : {
    RegistrationForm
  },

  methods : {
    register : function(){
      this.$refs.form.register();
    },

    submit : function(){
      if(this.is_valid){
        this.register()
        this.$refs.register_modal.hide()
      }
    },

    shown : function(){
      this.reset_validity()
      this.$refs.form.$refs.email.focus()
    }
  }
}
</script>
