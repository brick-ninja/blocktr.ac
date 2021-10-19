<!--
  * Notifications List Page
  * Renders a list of notifications sent to the user
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="notifications">
    <b-list-group>
      <b-list-group-item>
        <NotificationHeader />
      </b-list-group-item>

      <b-list-group-item v-for="notification in notifications"
                         :key="notification.id"
                         class="notification_wrapper">
        <router-link :to="'/notification/' + notification.id">
          <NotificationSummary :notification="notification" />
        </router-link>
      </b-list-group-item>
    </b-list-group>
  </TxsLayout>
</template>

<script>
import Authentication      from './mixins/authentication'
import ServerAPI           from './mixins/server_api'
import Maintenance         from './mixins/maintenance'

import TxsLayout           from './components/TxsLayout'
import NotificationHeader  from './components/NotificationHeader'
import NotificationSummary from './components/NotificationSummary'
import config              from './config/config'

export default {
  name: 'Notifications',

  mixins : [Authentication, ServerAPI, Maintenance],

  components : {
    TxsLayout,
    NotificationHeader,
    NotificationSummary
  },

  created : function(){
    if(this.maintenance_mode){
      this.nav_to_maintenance();
      return;
    }

    this.load_notifications()
  }
}
</script>

<style scoped>
.notification_wrapper{
  padding: 0;
}

.notification_wrapper a{
  padding: 10px;
  display: flex;
  color: black;
}

.notification_wrapper a:hover{
  text-decoration: none;
}
</style>
