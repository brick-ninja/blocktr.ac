<!--
  * Create Filter Modal
  * Encapsulates RegistrationForm to create new user, creating
  * specified filter in the process
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="register_filter_modal"
           ref="register_filter_modal"
           title="Your filter is almost set"
           ok-title="Create Account"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @shown="shown"
           @ok="register"
           :ok-disabled="!is_valid"
           no-stacking>
    <div id="register_filter_details">
      <div id="register_filter_details_icon">
        <img src="../../assets/down-triangle-lines-white.svg" />
      </div>

      <FilterSummary :filter="filter" />
    </div>

    <div id="register_filter_info">
      In order to save your filter, please create an account
    </div>

    <RegistrationForm ref="form"
               @validated="validate($event)"
                  @submit="submit"/>
  </b-modal>
</template>

<script>
import FilterSummary    from '../FilterSummary'
import RegistrationForm from '../forms/Registration'
import Validatable      from '../../mixins/validatable'

export default {
  name: 'RegistrationModal',

  mixins : [Validatable],

  components : {
    FilterSummary,
    RegistrationForm
  },

  computed : {
    filter : function(){
      return this.$store.state.in_progress_filter.client;
    }
  },

  methods : {
    register : function(){
      this.$refs.form.register();
    },

    submit : function(){
      if(this.is_valid){
        this.register()
        this.$refs.register_filter_modal.hide()
      }
    },

    shown : function(){
      this.reset_validity()
      this.$refs.form.$refs.email.focus()
    }
  }
}
</script>

<style scoped>
#register_filter_details{
  padding: 20px;
  background-color: #97d59d;
  color: white;
  border-radius: 5px;
  font-family: var(--theme-font1);
  font-size: 1.2rem;

  display: flex;
  align-items: center;
}

#register_filter_details_icon{
  margin-right: 20px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #90cf9d;
  border-radius: 5px;
}

#register_filter_info{
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-family: var(--theme-font2);
}
</style>
