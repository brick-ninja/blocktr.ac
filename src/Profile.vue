<!--
  * Profile Page
  * Encapsulates the ProfileForm and allows user to update
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="profile">
    <div id="profile">
      <h1>Account:</h1>

      <div id="profile_content">
        <ProfileForm      ref="form"
                     @editing="enable_controls = true"
                 @not_editing="enable_controls = false"
                   @validated="validate($event)"/>

        <div v-show="enable_controls"
                id="controls_wrapper">
          <b-button id="profile_cancel"
                    @click="reset_form">
            Cancel
          </b-button>

          <b-button id="profile_save"
                    :disabled="!is_valid"
                    @click="save_profile">
            Save
          </b-button>
        </div>
      </div>

      <CancelSubscriptionModal @cancelled="load_user" />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout              from './components/MainLayout'
import ProfileForm             from './components/forms/Profile'
import CancelSubscriptionModal from './components/modals/CancelSubscription'

import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'
import Maintenance    from './mixins/maintenance'
import Validatable    from './mixins/validatable'

import config from './config/config'
import util   from './util'

export default {
  name: 'Profile',

  mixins : [
    Authentication,
    ServerAPI,
    Maintenance,
    Validatable
  ],

  components: {
    MainLayout,
    ProfileForm,
    CancelSubscriptionModal
  },

  data : function(){
    return {
      enable_controls : false
    }
  },

  methods : {
    reset_form : function(){
      this.$refs.form.reset()
    },

    save_profile : function(){
      var params = {}

      var editing_email = this.$refs.form.editing_email
      if(editing_email)
        params.email = this.$refs.form.auth_email

      var editing_password = this.$refs.form.editing_password
      if(editing_password)
        params.password = this.$refs.form.auth_password

      var editing_credit_card = this.$refs.form.editing_credit_card
      if(editing_credit_card)
        params.credit_card = this.$refs.form.credit_card_params

      this.update_user(params)
          .then(function(response){
            var msg = '';

            if(editing_password)
              msg += "Password was updated.\n"

            if(editing_credit_card)
              msg += "Credit card was updated.\n"

            if(editing_email)
              msg += 'Confirmation code was sent to your new email'

            this.reset_form()

            alert(msg)

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not save profile: " + msg)
          }.bind(this))
    }
  },

  created : function(){
    if(this.maintenance_mode){
      this.nav_to_maintenance();
      return;
    }

    // If not logged in, redirect to /txs
    if(!this.logged_in)
      this.$router.push("/txs")
  }
}
</script>

<style scoped>
#profile{
  width: 70%;
  margin: auto;
  margin-top: 20px;
  font-family: var(--theme-font4);
}

#main_layout.md #profile,
#main_layout.sm #profile,
#main_layout.xs #profile{
  width: unset;
}

#profile h1{
  font-family: var(--theme-font3);
}

#profile_content{
  background-color: white;
  border: 1px solid #ededed;
  padding: 25px;
  max-width: unset;
}

#main_layout.md #profile_content,
#main_layout.sm #profile_content,
#main_layout.xs #profile_content{
  padding: 10px;
}

#controls_wrapper{
  margin: 10px;
  text-align: right;
}

#controls_wrapper button{
  margin: 5px;
}
</style>

<style>
#main_layout.xs #main_subcontent.profile{
  width: 100%;
}
</style>
