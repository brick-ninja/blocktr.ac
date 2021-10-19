<!--
  * Contact Form
  * Allows the user to send an inqury via email to us.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="contact_form">
    <div class="header">
      Email address:
    </div>

    <div>
      <input type="text"
             autocapitalize="none"
             @keyup.enter="submit"
             :value="email"
             @input="evnt=> email = evnt.target.value" />
    </div>

    <div v-if="have_email && !is_email_valid" id="email_invalid">
      Invalid Email
    </div>

    <div class="header">
      How can we help you?
    </div>

    <div>
      <textarea rows="20"
                @keyup.enter="submit"
                :value="inquiry"
                @input="evnt=> inquiry = evnt.target.value" />
    </div>

    <div id="submit">
      <button :disabled="!is_valid"
              @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import ServerAPI from '../../mixins/server_api'

import util from '../../util'

export default {
  name: 'ContactForm',

  mixins : [ServerAPI],

  data : function(){
    return {
      email : "",
      inquiry : ""
    }
  },

  computed : {
    have_email : function(){
      return this.email != ""
    },

    is_email_valid : function(){
      return this.have_email &&
             util.is_valid_email(this.email)
    },

    have_inquiry : function(){
      return this.inquiry != ""
    },

    is_inquiry_valid : function(){
      return this.have_inquiry
    },

    is_valid : function(){
      return this.is_email_valid &&
             this.is_inquiry_valid
    }
  },

  methods : {
    submit : function(){
      if(!this.is_valid) return

      const params = {email : this.email, inquiry : this.inquiry}
      this.contact(params)
          .then(function(response){
            alert("Your inquiry has been sent to us, " +
                  "we will get back to you as soon as possible")
            this.email = ""
            this.inquiry = ""

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not submit form: " + msg)
          })
    }
  }
}
</script>

<style scoped>
input,
textarea{
  width: 100%;
}

.header{
  margin-top: 10px;
}

#email_invalid{
  color: red;
  font-size: 0.9rem;
  font-family: var(--theme-font2);
  font-style: italic;
}

#submit{
  margin-top: 10px;
}

#submit button{
  display: block;
  margin: auto;
}
</style>
