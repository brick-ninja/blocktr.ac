<!--
  * Create Sink Form
  * Allows the user to reset their password
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <table class="form_table">
    <tr>
      <td>Email address:</td>
      <td>
        <input ref="email"
               class="form_input"
               type="text"
               autocapitalize="none"
               @keyup.enter="$emit('submit')"
               :value="auth_email"
               @input="evnt=> auth_email = evnt.target.value" />
      </td>
    </tr>
  </table>
</template>

<script>
import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'

export default {
  name: 'ForgotPasswordForm',

  mixins : [Authentication, Validator],

  computed : {
    is_valid : function(){
      return this.have_email;
    }
  }
}
</script>


<style scoped>
input{
  width: 100%;
}
</style>
