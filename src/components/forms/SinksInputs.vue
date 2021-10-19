<!--
  * Sinks Inputs
  * Allows the user select, create, and delete sinks. If
  * selected_lifecycle flag is specified, dropdown selection
  * content will be tied to lifecycle of sink (creating new
  * sink will populate selection, removing selected item will
  * delete sink)
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <table class="form_table">
    <tr>
      <td>
        <b-form-checkbox v-if="!no_toggle"
                         v-model="enable_email"
                         class="form_switch"
                         switch>
          Email
        </b-form-checkbox>

        <span v-else>
          Email
        </span>
      </td>

      <td class="input_col">
        <multiselect :options="email_options_plus"
                    :disabled="!enable_email"
                  placeholder="Select Email"
                  selectLabel=""
                deselectLabel=""
                  :searchable="false"
                    :multiple="true"
                        label="text"
                     track-by="value"
                      v-model="selected['email']" />
      </td>
    </tr>

    <tr v-if="!advanced_sinks">
      <td></td>

      <td id="available_with_pro">
        Available with <span class="pro">Pro</span> plans
      </td>
    </tr>

    <tr>
      <td>
        <b-form-checkbox v-if="!no_toggle"
                         v-model="enable_sms"
                         class="form_switch"
                         switch
                         :disabled="!advanced_sinks">
          Text Message
        </b-form-checkbox>

        <span v-else>
          Text Message
        </span>
      </td>

      <td class="input_col">
        <multiselect :options="sms_options_plus"
                    :disabled="!enable_sms"
                  placeholder="Select Phone Number"
                  selectLabel=""
                deselectLabel=""
                  :searchable="false"
                    :multiple="true"
                        label="text"
                     track-by="value"
                      v-model="selected['sms']" />
      </td>
    </tr>

    <tr>
      <td>
        <b-form-checkbox v-if="!no_toggle"
                         v-model="enable_webhook"
                         class="form_switch"
                         switch
                         :disabled="!advanced_sinks">
          URL
        </b-form-checkbox>

        <span v-else>
          URL
        </span>
      </td>

      <td class="input_col">
        <multiselect :options="webhook_options_plus"
                    :disabled="!enable_webhook"
                  placeholder="Select URL"
                  selectLabel=""
                deselectLabel=""
                  :searchable="false"
                    :multiple="true"
                        label="text"
                     track-by="value"
                      v-model="selected['webhook']" />
      </td>
    </tr>

    <tr id="sinks_footer">
      <td colspan="2">
        <div>{{remaining_msg}}</div>
        <div>To create more, <router-link to="/plans" class="pro">upgrade</router-link> your plan.</div>
      </td>
    </tr>

    <CreateSinkModal id='create_email_modal'
                     type='email'
                     @created="created_sink" />

    <CreateSinkModal id='create_sms_modal'
                     type='sms'
                     @created="created_sink" />

    <CreateSinkModal id='create_webhook_modal'
                     type='webhook'
                     @created="created_sink" />
  </table>
</template>

<script>
import CreateSinkModal from '../modals/CreateSink'
import Authentication  from '../../mixins/authentication'
import ServerAPI       from '../../mixins/server_api'

import util from '../../util'

export default {
  name: 'SinksInputs',

  mixins : [Authentication, ServerAPI],

  components : {
    CreateSinkModal
  },

  props : {
    // hide toggle button
    no_toggle : Boolean,

    // tie selected sinks to sink lifecycle
    selected_lifecycle : Boolean,

    // ignore sinks_per_filter restrictions
    ignore_sinks_per_filter : Boolean,

    // sinks to preselect
    preselected : Array
  },

  data : function(){
    return {
      enable_email   : false,
      enable_sms     : false,
      enable_webhook : false,

      selected : {
          email : [],
            sms : [],
        webhook : []
      }
    };
  },

  computed : {
    remaining_sinks : function(){
      return this.authorized_sinks - this.sinks.length;
    },

   remaining_msg : function(){
      const remaining = this.ignore_sinks_per_filter ? this.remaining_sinks :
                                                       this.remaining_sinks_per_filter;

      if(remaining == 1)
        return "1 available sink is left"

      return remaining + " available sinks are left"
    },

    no_remaining_sinks_per_filter : function(){
      return this.remaining_sinks_per_filter == 0;
    },

    remaining_sinks_per_filter : function() {
      return this.authorized_sinks_per_filter - this.number_selected_sinks_filter
    },

    number_selected_sinks_filter: function() {
      return Object.keys(this.selected)
                   .map((s) => this.selected[s].length)
                   .reduce((s1, s2) => s1 + s2, 0);
    },


    ///

    email_sinks : function(){
      return this.sinks.filter(function(sink){
        return sink.type == "email"
      })
    },

    sms_sinks : function(){
      return this.sinks.filter(function(sink){
        return sink.type == "sms"
      })
    },

    webhook_sinks : function(){
      return this.sinks.filter(function(sink){
        return sink.type == "webhook"
      })
    },

    sinks_by_type : function(){
      return {
          email : this.email_sinks,
            sms : this.sms_sinks,
        webhook : this.webhook_sinks
      }
    },

    selected_ids : function(){
      return {
          email : this.selected.email.map((e) => e.value),
            sms : this.selected.sms.map((s) => s.value),
        webhook : this.selected.webhook.map((w) => w.value),
      }
    },

    ///

    email_options : function(){
      return this.email_sinks.map(function(email){
        if(!this.ignore_sinks_per_filter &&
            this.no_remaining_sinks_per_filter &&
           !this.selected_ids.email.includes(email.id))
          return null;

        return {text : email.target, value: email.id};
      }.bind(this)).filter((o) => !!o);
    },

    email_options_plus : function(){
      var options = this.email_options.slice();

      if(this.remaining_sinks > 0     &&
        (this.ignore_sinks_per_filter ||
         this.remaining_sinks_per_filter > 0))
        options.push({text : "+ Add Email", value : -1})

      return options;
    },

    sms_options : function(){
      return this.sms_sinks.map(function(sms){
        if(!this.ignore_sinks_per_filter &&
            this.no_remaining_sinks_per_filter &&
           !this.selected_ids.sms.includes(sms.id))
          return null;

        return {text : sms.target, value: sms.id}
      }.bind(this)).filter((o) => !!o);
    },

    sms_options_plus : function(){
      var options = this.sms_options.slice();

      if(this.remaining_sinks > 0     &&
        (this.ignore_sinks_per_filter ||
         this.remaining_sinks_per_filter > 0))
        options.push({text : "+ Add Phone Number", value : -1})

      return options;
    },

    webhook_options : function(){
      return this.webhook_sinks.map(function(webhook){
        if(!this.ignore_sinks_per_filter &&
            this.no_remaining_sinks_per_filter &&
           !this.selected_ids.webhook.includes(webhook.id))
          return null;

        return {text : webhook.target, value: webhook.id}
      }.bind(this)).filter((o) => !!o);
    },

    webhook_options_plus : function(){
      var options = this.webhook_options.slice();

      if(this.remaining_sinks > 0     &&
        (this.ignore_sinks_per_filter ||
         this.remaining_sinks_per_filter > 0))
        options.push({text : "+ Add URL", value : -1})

      return options;
    },
  },

  watch : {
    sinks : function(){
      if(this.selected_lifecycle){
        // Selected always contains all sinks
        this.selected.email   = this.email_options
        this.selected.sms     = this.sms_options
        this.selected.webhook = this.webhook_options
      }
    },

    selected : {
      handler : function(){
        this.sync_sinks('email')
        this.sync_sinks('sms')
        this.sync_sinks('webhook')
      },

      deep: true
    }
  },

  methods : {
    created_sink : function(sink){
      this.load_sinks()

      // Add newly created sink to selected
      if(!this.selected_lifecycle){
        this.selected[sink.type].push({
          text : sink.target,
          value : sink.id
        })
      }
    },

    sync_sinks : function(type){
      const add =
        this.selected[type].filter(function(sink){
          return sink.value == -1
        })[0]

      // If 'Add New' option selected, remove it from selected
      // list and launch CreateSink modal
      if(add){
        this.selected[type].splice(this.selected[type].indexOf(add), 1)
        this.$bvModal.show('create_' + type + '_modal')
      }

      if(this.selected_lifecycle){
        // If selected no longer contains all the sinks,
        // delete sink which was removed
        if(this.selected[type].length != this.sinks_by_type[type].length){
          const selected = this.selected[type].map(function(sink){
            return sink.value
          })

          const deleted = this.sinks_by_type[type].filter(function(sink){
            return !selected.includes(sink.id)
          })

          deleted.forEach(function(sink){
            this.delete_sink_(sink)
          }.bind(this))
        }
      }
    },

    delete_sink_ : function(sink){
      this.delete_sink(sink.id)
          .then(function(response){
            this.load_sinks()

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not delete sink: " + msg)
          })
    }
  },

  created : function(){
    if(this.preselected){
      this.preselected.forEach(function(preselected){
        this.selected[preselected.type].push({
           text : preselected.target,
          value : preselected.id
        })
      }.bind(this))
    }

    if(this.no_toggle){
      this.enable_email = true
      this.enable_sms = this.advanced_sinks;
      this.enable_webhook = this.advanced_sinks;

    }else{
      this.enable_email   = this.selected.email.length   != 0;
      this.enable_sms     = this.selected.sms.length     != 0;
      this.enable_webhook = this.selected.webhook.length != 0;
    }

    this.load_sinks()
  }
}
</script>

<style scoped>
.input_col{
  width: 75%;
}

#available_with_pro{
  font-family: var(--theme-font4);
}

.pro{
  border-radius: 15px;
  padding: 3px 10px;
  background-color: var(--theme-color5);
  color: white;
  opacity: 0.6;
  font-family: var(--theme-font2);
  font-size: 0.8rem;
}

.pro:hover{
  text-decoration: none;
}


#sinks_footer td{
  padding-top: 10px;
  font-size: 0.75rem;
  font-family: var(--theme-font4);
}
</style>
