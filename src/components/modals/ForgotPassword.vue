<!--
  * Create Filter Modal
  * Encapsulates ForgotPasswordForm to reset user password
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="forgot_password_modal"
           ref="forgot_password_modal"
           title="Reset Password"
           ok-title="Reset"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @shown="shown"
           @ok="reset_password"
           :ok-disabled="!is_valid"
           no-stacking>
    <ForgotPasswordForm ref="form"
                 @validated="validate($event)"
                 @submit="submit"/>
  </b-modal>
</template>

<script>
import ForgotPasswordForm from '../forms/ForgotPassword'
import Validatable        from '../../mixins/validatable'

export default {
  name: 'ForgotPasswordModal',

  mixins : [Validatable],

  components : {
    ForgotPasswordForm
  },

  methods : {
    reset_password : function(){
      this.$refs.form.reset_password();
    },

    submit : function(){
      if(this.is_valid){
        this.reset_password()
        this.$refs.forgot_password_modal.hide()
      }
    },

    shown : function(){
      this.reset_validity()
      this.$refs.form.$refs.email.focus()
    }
  }
}
</script>
