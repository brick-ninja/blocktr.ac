<!--
  * Create Filter Modal
  * Encapsulates LoginForm to create new user session
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="login_modal"
           ref="login_modal"
           title="Login"
           ok-title="Login"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @shown="shown"
           @ok="submit"
           :ok-disabled="!is_valid"
           no-stacking>
    <LoginForm ref="form"
        @validated="validate($event)"
          @submit="submit" />
  </b-modal>
</template>

<script>
import LoginForm   from '../forms/Login'
import Validatable from '../../mixins/validatable'

// TODO: Style modal title (and other modals)

export default {
  name: 'LoginModal',

  mixins : [Validatable],

  components : {
    LoginForm
  },

  methods : {
    submit : function(){
      if(this.is_valid){
        this.$refs.form.submit()
        this.$refs.login_modal.hide()
      }
    },

    shown : function(){
      this.reset_validity()
      this.$refs.form.$refs.email.focus()
    }
  }
}
</script>
