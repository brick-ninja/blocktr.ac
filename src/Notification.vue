<!--
  * Notification Details Page
  * Renders a details about a particular notification sent to the user
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="notification">
    <div id="notification_header_wrapper">
      <NotificationHeader />
      <NotificationSummary :notification="notification" />
    </div>

    <b-list-group>
      <b-list-group-item id="matched_txs_explanation">
        <img src="./assets/info.svg" />
        <span>
          The following transactions were included in this notification.
        </span>
      </b-list-group-item>

      <b-list-group-item v-for="match in notification.FilterMatches"
                         :key="match.hash"
                         class="tx_summary_container">
        <TxSummary :tx="match" />
      </b-list-group-item>
    </b-list-group>
  </TxsLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'
import Maintenance    from './mixins/maintenance'

import TxsLayout           from './components/TxsLayout'
import NotificationHeader  from './components/NotificationHeader'
import NotificationSummary from './components/NotificationSummary'
import TxSummary           from './components/TxSummary'

import config from './config/config'

export default {
  name: 'Notification',

  mixins : [Authentication, ServerAPI, Maintenance],

  components : {
    TxsLayout,
    NotificationHeader,
    NotificationSummary,
    TxSummary
  },

  props : {
    id : Number
  },

  data : function(){
    return {
      notification : {
        Filter : {},
        Sink : {},
        FilterMatches : []
      }
    }
  },

  created : function(){
    if(this.maintenance_mode){
      this.nav_to_maintenance();
      return;
    }

    this.load_notification(this.id)
        .then(function(response){
          this.notification = response.body

          this.notification.FilterMatches.forEach(function(filter_match, t){
            var tx = filter_match.Transaction.raw
                tx.transaction.date = filter_match.Transaction.date
            this.notification.FilterMatches[t] = tx
          }.bind(this))

        }.bind(this)).catch(function(err){
          // ...
        })
  }

}
</script>

<style scoped>
#notification_header_wrapper{
  background-color: white;
  border-bottom: 1px solid var(--theme-color3);
  padding: 10px;
}

#matched_txs_explanation{
  display: flex;
  align-items: center;
}

#main_layout.sm #matched_txs_explanation,
#main_layout.xs #matched_txs_explanation{
  padding: 10px;
}

#matched_txs_explanation span{
  opacity: 0.6;
  font-size: 0.9rem;
  font-family: var(--theme-font4);
  color: var(--theme-color2);
}

#matched_txs_explanation img{
  margin-right: 5px;
  min-width: 20px;
}

.tx_summary_container{
  padding: 0px;
}
</style>
