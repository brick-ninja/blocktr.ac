<!--
  * ResetPassword Form
  * Embedded on the ResetPassword Page, contains password a
  * confirm password fields
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <table id="reset_password_form">
    <tr>
      <td class="form_text">New Password:</td>
    </tr>

    <tr>
      <td>
        <input class="form_input"
               type="password"
               @keyup.enter="$emit('submit')"
               :value="auth_password"
               @input="evnt=> auth_password = evnt.target.value" />

        <div class="form_text form_error">
          <span v-if="weak_password">Weak password</span>
          <span v-else class="placeholder" />
        </div>
       </td>
    </tr>

    <tr>
      <td class="form_text">Confirm Password:</td>
    </tr>

    <tr>
      <td>
        <input class="form_input"
               type="password"
               @keyup.enter="$emit('submit')"
               :value="auth_password_confirm"
               @input="evnt=> auth_password_confirm = evnt.target.value" />

        <div class="form_text form_error">
          <span v-if="password_mismatch">Passwords do not match</span>
          <span v-else class="placeholder" />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'

export default {
  name: 'ResetPasswordForm',

  mixins : [Authentication, Validator],

  computed : {
    is_valid : function(){
      return this.have_passwords    &&
            !this.invalid_passwords;
    }
  }
}
</script>

<style scoped>
#reset_password_form{
  width: 100%;
}
</style>
