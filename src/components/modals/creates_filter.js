/*
 * Create Filter Mixin
 * Defines common logic used by modals which create filter.
 * If user is not logged in on confirmation, temporarily
 * store 'in_progress' filter, else create filter as intended.
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */
import util from '../../util'

export default {
  methods : {
    on_ok : function(){
      if(!this.logged_in){
        const client = this.$refs.form.client_params;
        const server = this.$refs.form.server_params;
        const filter = {client, server};

        this.$store.commit('set_in_progress_filter', filter);
        this.$bvModal.show("register_filter_modal");

      }else
        this.create_filter_();
    },

    create_filter_ : function(){
      var params = this.$refs.form.server_params;

      this.create_filter(params)
          .then(function(response){
            const filter = response.body;
            this.$emit('created', filter)

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not create filter: " + msg)
          }.bind(this))
    }
  }
}
