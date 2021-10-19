<!--
  * Cancel Subscription Modal
  * Warns / prompts user to verify subscription cancellation action
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-modal id="cancel_subscription"
           title="Cancel Subscription"
           header-class="modal_header"
           @ok="cancel_subscription_"
           centered>
    <h3>Are you sure?</h3>
    <h5>
      <i>Your subscription will immediately be cancelled</i><br/>
      <b>This cannot be undone</b>
    </h5>
  </b-modal>
</template>

<script>
import Authentication from '../../mixins/authentication'
import ServerAPI      from '../../mixins/server_api'

import util from '../../util'

export default {
  name: 'CancelSubscriptionModal',

  mixins : [Authentication, ServerAPI],

  methods : {
    cancel_subscription_ : function(){
      this.cancel_subscription()
          .then(function(response){
            this.$emit('cancelled')

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not cancel subscription: " + msg)
          })
    }
  }
}
</script>
