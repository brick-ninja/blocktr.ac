<!--
  * Profile Form
  * High level user account settings and options. Here the user
  * can change their email, password, and billing information.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-container id="profile_form">
    <b-row class="header_row">
      <b-col class="label">
        My profile
      </b-col>
    </b-row>

    <b-row id="email_row"
           class="input_row">
      <b-col  class="label" cols=4>
        Email address
      </b-col>

      <b-col v-if="!editing_email"
             class="value">
        {{email}}
      </b-col>

      <b-col v-else class="input">
        <input class="form_input" type="text"
               autocapitalize="none"
               :value="auth_email"
               @input="evnt=> auth_email = evnt.target.value" />

        <div class="form_text form_error">
          <span v-if="invalid_email">Invalid Email</span>
          <span v-else class="placeholder" />
        </div>
      </b-col>

      <b-col v-if="mq_gt_md"
             @click="editing_email = !editing_email"
             class="action" cols=3>
        <span v-if="!editing_email">Update</span>
        <span v-else>Cancel</span>
      </b-col>

      <b-col v-else
             @click="editing_email = !editing_email"
             class="action" :cols="mq_xs ? 1 : 2">
        <img src="../../assets/pencil-blue.svg" />
      </b-col>
    </b-row>

    <b-row id="password_row"
           class="input_row">
      <b-col class="label" cols=4>
        Password
      </b-col>

      <b-col v-if="!editing_password"
             class="value">
       *********
      </b-col>

      <b-col class="input" v-else>
        <input class="form_input" type="password"
               :value="auth_password"
               @input="evnt=> auth_password = evnt.target.value" />

        <div class="form_text form_error">
          <span v-if="weak_password">Weak password</span>
          <span v-else class="placeholder" />
        </div>
      </b-col>

      <b-col v-if="mq_gt_md"
             @click="editing_password = !editing_password"
             class="action" cols=3>
        <span v-if="!editing_password">Change Password</span>
        <span v-else>Cancel</span>
      </b-col>

      <b-col v-else
             @click="editing_password = !editing_password"
             class="action" :cols="mq_xs ? 1 : 2">
        <img src="../../assets/pencil-blue.svg" />
      </b-col>
    </b-row>

    <b-row v-if="editing_password"
           id="confirm_password_row"
           class="input_row">
      <b-col class="label" cols=4>
        Confirm Password
      </b-col>

      <b-col class="input">
        <input class="form_input" type="password"
               :value="auth_password_confirm"
               @input="evnt=> auth_password_confirm = evnt.target.value" />

        <div class="form_text form_error">
          <span v-if="password_mismatch">Passwords do not match</span>
          <span v-else class="placeholder" />
        </div>
      </b-col>

      <b-col :cols="mq_gt_md ? 3 : 2">
        &nbsp;
      </b-col>
    </b-row>

    <b-row class="header_row">
      <b-col class="label">
        Plan details
      </b-col>
    </b-row>

    <b-row class="input_row">
      <b-col class="label" cols=4>
        Plan details
      </b-col>

      <b-col id="membership_level" class="value">
        {{membership_level}}
      </b-col>

      <b-col v-if="mq_gt_md"
             class="action" cols=3>
        <div v-if="!is_premium_member">
          <router-link to="/plans">Change plan</router-link>
        </div>

        <div v-if="!is_basic_member"
              v-b-modal.cancel_subscription>
          Cancel subscription
        </div>
      </b-col>

      <b-col v-else
             class="action" :cols="mq_xs ? 1 : 2">
        <span v-if="!is_basic_member">
          <img src="../../assets/red-x.svg"
               style="width: 15px; margin-right: 10px"
               v-b-modal.cancel_subscription />
        </span>

        <span v-if="!is_premium_member">
          <router-link to="/plans">
            <img src="../../assets/pencil-blue.svg" />
          </router-link>
        </span>
      </b-col>
    </b-row>

    <b-row class="header_row">
      <b-col class="label">
        Billing
      </b-col>
    </b-row>

    <b-row id="credit_card_number_row"
           class="input_row">
      <b-col class="label" cols=4>
        Credit Card
      </b-col>

      <b-col v-if="!editing_credit_card"
             class="value">
       ****************
      </b-col>

      <b-col v-else
             class="input"
             id="credit_card_number_wrapper">
        <input id="credit_card_number"
               class="form_input"
               type="text"
               maxlength="19"
               size="19"
               :value="credit_card_number_with_dashes"
               @input="set_credit_card_number($event.target.value)" />

        <div class="form_text form_error">
          <span v-if="invalid_credit_card_number">Must be 14 to 16 digits</span>
          <span v-else class="placeholder" />
        </div>
      </b-col>

      <b-col v-if="mq_gt_md"
             @click="editing_credit_card = !editing_credit_card"
             class="action" cols=3>
        <span v-if="!editing_credit_card">Update</span>
        <span v-else>Cancel</span>
      </b-col>

      <b-col v-else
             @click="editing_credit_card = !editing_credit_card"
             class="action" :cols="mq_xs ? 1 : 2">
        <img src="../../assets/pencil-blue.svg" />
      </b-col>
    </b-row>

    <b-row v-if="editing_credit_card"
           id="credit_card_cvc_row"
           class="input_row">
      <b-col class="label" cols=4>
        CVC
      </b-col>

      <b-col id="credit_card_cvc_wrapper" class="input">
        <input id="credit_card_cvc"
               class="form_input"
               type="text"
               maxlength="3"
               size="3"
               :value="credit_card_cvc"
               @input="evnt=> credit_card_cvc = evnt.target.value" />

        <div class="form_text form_error">
          <span v-if="invalid_credit_card_cvc">Must be 3 digits</span>
          <span v-else class="placeholder" />
        </div>
      </b-col>

      <b-col class="action" :cols="mq_gt_md ? 3 : mq_xs ? 1 : 2">
        &nbsp;
      </b-col>
    </b-row>

    <b-row v-if="editing_credit_card"
           id="credit_card_expiration_row"
           class="input_row">
      <b-col class="label" cols=4>
        Expiration
      </b-col>

      <b-col id="credit_card_expiration_wrapper" class="input">
        <b-form-select id="credit_card_month"
                       v-model="credit_card_month"
                       :options="credit_card_months" />
        <br v-if="mq_xs" />

        <b-form-select id="credit_card_year"
                       v-model="credit_card_year"
                       :options="credit_card_years" />
      </b-col>

      <b-col class="action" :cols="mq_gt_md ? 3 : mq_xs ? 1 : 2">
        &nbsp;
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Authentication from '../../mixins/authentication'
import HasCreditCard  from '../../mixins/has_credit_card'
import Validator      from '../../mixins/validator'

// TODO credit card mobile styling

export default {
  name: 'Profile',

  mixins : [Authentication, HasCreditCard, Validator],

  data : function(){
    return {
      editing_email : false,
      editing_password : false,
      editing_credit_card : false
    }
  },

  computed : {
    editing_fields : function(){
      return this.editing_email || this.editing_password || this.editing_credit_card;
    },

    is_valid_email : function(){
      return !this.editing_email ||
             (this.have_email &&
             !this.invalid_email);
    },

    is_valid_password : function(){
      return !this.editing_password ||
             (this.have_passwords &&
             !this.invalid_passwords);
    },

    is_valid_credit_card : function(){
      return !this.editing_credit_card ||
             (this.have_credit_card_number &&
             !this.invalid_credit_card_number &&
              this.have_credit_card_cvc &&
             !this.invalid_credit_card_cvc);
    },

    is_valid : function(){
      return this.is_valid_email &&
             this.is_valid_password &&
             this.is_valid_credit_card;
    }
  },

  watch : {
    editing_email : function(){
      this.auth_email = ''
    },

    editing_password : function(){
      this.auth_password = ''
      this.auth_password_confirm = ''
    },

    editing_credit_card : function(){
      this.credit_card_number = '';
      this.credit_card_cvc = '';
    },

    editing_fields : function(){
      if(this.editing_fields)
        this.$emit('editing')
      else
        this.$emit('not_editing')
    }
  },

  methods : {
    reset : function(){
      this.editing_email = false
      this.editing_password = false
      this.editing_credit_card = false
    }
  },

  created : function(){
    this.auth_email = ''
  }
}
</script>

<style scoped>
#profile_form{
  max-width: unset;
}

#main_layout.xs #profile_form{
  max-width: unset;
  padding: 0;
}

.label,
.value,
.input{
  padding: 0;
}

#main_layout.md .label,
#main_layout.sm .label,
#main_layout.xs .label,
#main_layout.md .value,
#main_layout.sm .value,
#main_layout.xs .value{
  font-size: 3.2vw;
}

.header_row{
  margin: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ededed;
  font-weight: bold;
}

#main_layout.md .header_row,
#main_layout.sm .header_row,
#main_layout.xs .header_row{
  margin: 10px 0;
}

.input_row{
  margin: 20px;
}

#main_layout.md .input_row,
#main_layout.sm .input_row,
#main_layout.xs .input_row{
  margin: 20px 0;
}

#password_row,
#credit_card_number_row,
#credit_card_cvc_row{
  margin-bottom: 0;
}

#confirm_password_row,
#credit_card_cvc_row,
#credit_card_expiration_row{
  margin-top: 5px;
}

.action{
  min-width: 25px;
  color: blue;
  cursor: pointer;
  padding: 0;
  text-align: right;
}

.action a{
  color: blue;
}

.action a:hover{
  text-decoration: none;
}

#membership_level{
  text-transform: capitalize;
}

#credit_card_number_wrapper{
  text-align: right;
}

#credit_card_number{
  text-align: right;
}

#credit_card_cvc_wrapper{
  text-align: right;
}

#credit_card_cvc{
  text-align: right;
  width: unset;
}

#credit_card_expiration_wrapper{
  text-align: right;
}

#credit_card_month{
  width: 102px;
  margin-right: 5px;
  text-align: right;
}

#main_layout.xs #credit_card_month{
  margin-right: unset;
  margin-bottom: 5px;
}

#credit_card_year{
  width: 100px;
  text-align: right;
}
</style>
