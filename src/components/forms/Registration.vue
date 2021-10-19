<!--
  * Create Sink Form
  * Allows the user to register / create a new application account.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <table class="form_table">
    <tr>
      <td class="form_text">Email address:</td>
      <td>
        <input ref="email"
               class="form_input"
               type="text"
               autocapitalize="none"
               @keyup.enter="$emit('submit')"
               :value="auth_email"
               @input="evnt=> auth_email = evnt.target.value" />

        <div class="form_text form_error">
          <span v-if="invalid_email">Invalid Email</span>
          <span v-else class="placeholder" />
        </div>
      </td>
    </tr>

    <tr>
      <td class="form_text">Password:</td>
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

    <tr>
      <td colspan="2" id="tos_agree">
        <b-form-checkbox v-model="tos_agree">
        I agree to the <router-link to="/terms" target="_blank">Terms of Service</router-link>
        </b-form-checkbox>
      </td>
    </tr>

    <tr>
      <td></td>
      <td id="existing_account"
          class="form_text"
          v-b-modal.login_modal>
        Already have an account?
      </td>
    </tr>
  </table>
</template>

<script>
// TODO autofill email suggestion

import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'
import Maintenance    from '../../mixins/maintenance'

import config         from '../../config/config'

export default {
  name: 'RegistrationForm',

  mixins : [Authentication, Validator, Maintenance],

  data : function(){
    return {
      tos_agree : false
    }
  },

  computed : {
    is_valid : function(){
      return this.have_email        &&
            !this.invalid_email     &&
             this.have_passwords    &&
            !this.invalid_passwords &&
             this.tos_agree;
    }
  },

  created : function(){
    if(this.maintenance_mode &&
      !this.on_maintenance_page)
       this.nav_to_maintenance();
  }
}
</script>

<style scoped>
#tos_agree{
  text-align: right;
  padding-bottom: 10px;
}

#existing_account{
  cursor: pointer;
  text-align: right;
}
</style>
