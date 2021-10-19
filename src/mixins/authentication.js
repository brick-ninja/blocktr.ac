/*
 * Authentication mixin providing high level definitions and
 * functions relating to user registration, state management
 * (login / logout), and other actions.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import zxcvbn  from "zxcvbn"

import config  from '../config/config'
import ziti    from '../config/ziti'
import util    from '../util'

export default {
  data : function(){
    return {
      auth_email : '',
      auth_password : '',
      auth_password_confirm : ''
    };
  },

  computed : {
    backend_url : function(){
      return config.BACKEND_URL;
    },

    auth_token : function(){
      return this.$cookies.authToken;
    },

    auth_header : function(){
      return {headers : {authorization : this.auth_token}};
    },

    logged_in : function(){
      return !!this.auth_token;
    },

    email : function(){
      return this.$store.state.user.email;
    },

    profile : function(){
      return this.$store.state.user.profile;
    },

    renewal_date : function(){
      return this.$store.state.user.renewal_date;
    },

    has_credit_card : function(){
      return this.$store.state.user.has_credit_card;
    },

    privileges : function(){
      return this.$store.state.user.privileges;
    },

    membership_level : function(){
      return this.$store.state.user.membership_level;
    },

    is_basic_member : function(){
      return this.membership_level == 'basic';
    },

    is_premium_member : function(){
      return this.membership_level == 'premium';
    },

    membership_features : function(){
      return ziti.membership_features[this.membership_level];
    },

    additional_filters : function(){
      return this.$store.state.user.additional_filters;
    },

    authorized_filters : function(){
      if(!this.membership_level) return 0;

      return this.membership_features.filters +
             this.additional_filters          +
             this.privilege('additional_filters', 'integer');
    },

    additional_sinks : function(){
      return this.$store.state.user.additional_sinks;
    },

    authorized_sinks : function(){
      if(!this.membership_level) return 0;

      return this.membership_features.sinks +
             this.additional_sinks          +
             this.privilege('additional_sinks', 'integer');
    },

    authorized_sinks_per_filter: function() {
      if(!this.membership_level) return 0;

      return this.membership_features.sinks_per_filter +
             this.privilege('additional_filter_sinks', 'integer');
    },

    advanced_sinks : function(){
      if(!this.membership_level) return false;

      return this.membership_features.advanced_sinks ||
             this.privilege('advanced_sinks', 'boolean');
    },

    ///

    have_email : function(){
      return !!this.auth_email;
    },

    invalid_email : function(){
      return this.have_email && !util.is_valid_email(this.auth_email);
    },

    have_password : function(){
      return !!this.auth_password;
    },

    have_passwords : function(){
      return !!this.auth_password &&
             !!this.auth_password_confirm;
    },

    password_strength : function(){
      return zxcvbn(this.auth_password);
    },

    weak_password : function(){
      return this.have_password &&
             (this.password_strength.score < ziti.min_password_score);
    },

    password_mismatch : function(){
      return this.have_passwords &&
            (this.auth_password != this.auth_password_confirm);
    },

    invalid_passwords : function(){
      return this.have_passwords &&
            (this.weak_password  ||
             this.password_mismatch);
    }
  },

  methods : {
    // XXX: copied from ziti (models/User#privilege)
    privilege : function(type, convert, default_value){
      const privileges = this.privileges || [];
      const privilege = privileges.find(function(p){
        return p.type == type
      })

      if(!privilege){
        if(default_value)
          return default_value

        else if(convert == 'integer')
          return 0;

        else if(convert == 'boolean')
          return false;

        return null;
      }

      if(convert == 'integer')
        return parseInt(privilege.value);
      else if(convert == 'boolean')
        return ['true', 't'].includes(privilege.value.toLowerCase())

      return privilege.value;
    },

    // Send register request to server.
    // Displays instructions on completion.
    register : function(){
      var params = {email : this.auth_email,
                 password : this.auth_password}

      if(this.$store.state.in_progress_filter.server)
        params.filter = this.$store.state.in_progress_filter.server

      this.$htttp().post(this.backend_url + "/register", params)
                   .then(function(response){
                     this.$store.commit('clear_in_progress_filter')
                     alert("Please check your email to complete registration")

                   }.bind(this)).catch(function(err){
                     const msg = util.capitalize(err.body.error)
                     alert("There was a problem registering: " + msg)
                   })
    },

    // Send login request to server.
    // Sets auth token and loads user on completion.
    login : function(){
      var params = {email : this.auth_email,
                 password : this.auth_password}

      if(this.$store.state.in_progress_filter.server)
        params.filter = this.$store.state.in_progress_filter.server

      this.$htttp().post(this.backend_url + "/login", params)
                   .then(function(response){
                     this.$store.commit('clear_in_progress_filter')
                     this.$setCookie("authToken", response.body.authToken);
                     this.load_user();

                   }.bind(this)).catch(function(err){
                     const msg = util.capitalize(err.body.error)
                     alert("Could not login: " + msg)
                   })
    },

    // Send request to get user from server.
    // Stores user information locally upon retrieval.
    // Delete user information on error and redirects to /txs on error.
    load_user : function(){
      return this.$htttp().get(this.backend_url + "/user", this.auth_header)
                          .then(function(response){
                            this.$store.commit('set_user', response.body);

                          }.bind(this)).catch(function(err){
                             alert("Session timed out, you have been logged out");

                             // If user cannot be loaded, clear
                             this.$removeCookie("authToken")
                             this.$store.commit('clear_user')

                             if(this.$route.path != "/txs")
                               this.$router.push("/txs");
                          }.bind(this))
    },

    // Send logout request to server.
    // Deletes local user information and redirects to /txs
    // on completion or error.
    logout : function(){
      this.$htttp().delete(this.backend_url + "/logout",
                   {headers : {authorization : this.auth_token}})
                   .then(function(response){
                     this.$removeCookie("authToken")
                     this.$store.commit('clear_user')

                     if(this.$route.path != "/txs")
                       this.$router.push("/txs");

                   }.bind(this)).catch(function(err){
                     this.$removeCookie("authToken")
                     this.$store.commit('clear_user')

                     if(this.$route.path != "/txs")
                       this.$router.push("/txs");
                   }.bind(this))

    },

    // Send reset_password request to server
    // Displays instructions on completion.
    reset_password : function(){
      var params = {email : this.auth_email}
      this.$htttp().put(this.backend_url + "/reset", params)
                   .then(function(response){
                     alert("Please check your email for password reset instructions")

                   }.bind(this)).catch(function(err){
                     const msg = util.capitalize(err.body.error)
                     alert("Could not reset password: " + msg)
                   })
    }
  }
}
