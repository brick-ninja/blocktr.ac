/*
 * Helper mixin provider Ziti server API access and methods.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import config from '../config/config'
import util   from '../util'

// NOTE: some of these methods/data require the auth_header
//       provided by the 'authentication' mixin!

// XXX: hacks around not_authenticated checks below relate to commit
//      eeb5fed1252026eda17ab67e46a2f0dbf2e9124c
//      To supress authentication errs on session timeout.
//      Figure out workaround

export default {
  computed : {
    backend_url : function(){
      return config.BACKEND_URL;
    },

    templates : {
      set : function(templates){
        this.$store.commit('set_templates', templates);
      },

      get : function(){
        return this.$store.state.templates;
      }
    },

    sinks : {
      set : function(sinks){
        this.$store.commit('set_sinks', sinks);
      },

      get : function(){
        return this.$store.state.sinks;
      }
    },

    filters : {
      set : function(filters){
        this.$store.commit('set_filters', filters);
      },

      get : function(){
        return this.$store.state.filters;
      }
    },

    filter_matches : {
      set : function(filter_matches){
        this.$store.commit('set_filter_matches', filter_matches);
      },

      get : function(){
        return this.$store.state.filter_matches;
      }
    },

    notifications : {
      set : function(notifications){
        this.$store.commit('set_notifications', notifications);
      },

      get : function(){
        return this.$store.state.notifications;
      }
    },

    server_status : {
      set : function(server_status){
        this.$store.commit('set_server_status', server_status);
      },

      get : function(){
        return this.$store.state.server_status;
      }
    },

    active_filter : {
      set : function(filter){
        this.$store.commit('set_active_filter', filter);
      },

      get : function(){
        return this.$store.state.active_filter;
      }
    }
  },

  methods : {
    not_authenticated : function(err){
      return err.status == 401;
    },

    set_active_filter : function(filter){
      this.active_filter = filter;

      const replace = this.filters.find(function(f){
                        return f.id == filter.id;
                      });

      if(replace)
        this.filters.splice(this.filters.indexOf(replace),
                            1, this.active_filter);
      else
        this.filters.push(filter);

      if(this.$route.path != "/filter/" + filter.id)
        this.$router.push("/filter/" + filter.id);
    },

    ///

    // Handle these method callbacks here

    // Loads templates from server, storing the result
    load_templates : function(){
      this.$htttp().get(this.backend_url + "/templates")
                   .then(function(response){
                       // set templates
                       this.templates = response.body

                   }.bind(this)).catch(function(err){
                     const msg = util.capitalize(err.body.error)
                     alert("Could not retrieve templates: " + msg)
                   }.bind(this))
    },

    // Loads sinks from server, storing the result
    load_sinks : function(){
      this.$htttp().get(this.backend_url + "/sinks", this.auth_header)
                  .then(function(response){
                      // set sinks
                      this.sinks = response.body;

                  }.bind(this)).catch(function(err){
                    if(this.not_authenticated(err)) return; // XXX

                    const msg = util.capitalize(err.body.error)
                    alert("Could not retrieve sinks: " + msg)
                  }.bind(this))
    },

    // Loads filters from server, storing the result
    load_filters : function(){
      this.$htttp().get(this.backend_url + "/filters", this.auth_header)
                   .then(function(response){
                       // set filters
                       this.filters = response.body

                   }.bind(this)).catch(function(err){
                     if(this.not_authenticated(err)) return; // XXX

                     const msg = util.capitalize(err.body.error)
                     alert("Could not retrieve filters: " + msg)
                   }.bind(this))
    },

    // Loads filter from server, storing the result
    load_filter : function(id){
      return this.$htttp()
                 .get(this.backend_url + "/filter/" + id, this.auth_header)
                 .then(function(response){
                   // set active filter
                   this.active_filter = response.body;

                 }.bind(this)).catch(function(err){
                   if(this.not_authenticated(err)) return; // XXX

                   const msg = util.capitalize(err.body.error)
                   alert("Could not retrieve filter: " + msg)
                 }.bind(this))
    },


    // Loads filter matches from server, storing the result
    load_filter_matches : function(id){
      this.$htttp().get(this.backend_url + "/filter/" + id + "/matches",
                                                       this.auth_header)
                   .then(function(response){
                     // set matches
                     this.filter_matches = response.body;

                   }.bind(this)).catch(function(err){
                     if(this.not_authenticated(err)) return; // XXX

                     const msg = util.capitalize(err.body.error)
                     alert("Could not retrieve filter matches: " + msg)
                   }.bind(this))
    },

    // Loads notifications from server, storing the result
    load_notifications : function(){
      this.$htttp().get(this.backend_url + "/notifications", this.auth_header)
                   .then(function(response){
                     // set notifications
                     this.notifications = response.body

                   }.bind(this)).catch(function(err){
                     if(this.not_authenticated(err)) return; // XXX

                     const msg = util.capitalize(err.body.error)
                     alert("Could not retrieve notifications: " + msg)
                   }.bind(this))
    },

    // Load server status, storing the result
    load_server_status : function(){
      this.$htttp().get(this.backend_url + "/status", this.auth_header)
                   .then(function(response){
                     this.server_status = response.body;

                   }.bind(this)).catch(function(err){
                     if(this.not_authenticated(err)) return; // XXX

                     const msg = util.capitalize(err.body.error)
                     alert("Could not retrieve status: " + msg)
                   })
    },

    ///

    // Return promise, handle these methods callbacks in invoker

    // Load transactions from server, storing the result
    load_txs : function(blockchain){
      return this.$htttp().get(this.backend_url + "/" + blockchain + "/txs")
    },

    update_user : function(user){
      return this.$htttp().put(this.backend_url + "/user",
                                   user, this.auth_header)
    },

    purchase_plan : function(plan){
      return this.$htttp().post(this.backend_url + "/purchase",
                                        plan, this.auth_header)
    },

    cancel_subscription : function(){
      return this.$htttp().post(this.backend_url + "/cancel",
                                            this.auth_header)
    },

    reset_password : function(params){
      return this.$htttp().put(this.backend_url + "/reset", params)
    },

    confirm_email : function(params){
      return this.$htttp().put(this.backend_url + "/confirm", params)
    },

    contact : function(params){
      return this.$htttp().post(this.backend_url + "/contact", params)
    },

    create_sink : function(params){
      return this.$htttp().post(this.backend_url + "/sink",
                                  params, this.auth_header)
    },

    delete_sink : function(id){
      return this.$htttp().delete(this.backend_url + "/sink/" + id,
                                                  this.auth_header)
    },

    create_filter : function(params){
      return this.$htttp().post(this.backend_url + "/filter",
                                  params, this.auth_header)
    },

    update_filter : function(id, params){
      return this.$htttp().put(this.backend_url + "/filter/" + id,
                                         params, this.auth_header)
    },

    delete_filter : function(id){
      return this.$htttp().delete(this.backend_url + "/filter/" + id,
                                                    this.auth_header)
    },

    load_notification : function(id){
      return this.$htttp().get(this.backend_url + "/notification/" + id,
                                                       this.auth_header)
    }
  }
}
