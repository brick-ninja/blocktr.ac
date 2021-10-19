<!--
  * Notification Settings Form
  * Allows the user to set the notification time, the amount of
  * time to wait after a matched transaction before sending a
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="notification_settings">
    <h4 id="notification_time_title">Notification Time:</h4>

    <div id="notification_time_explanation">
    Controls the interval which you will receive notifications.
    </div>

    <div>
      <b-form-group>
        <b-form-radio-group id="notification_time"
                            v-model="notification_time"
                            :options="notification_times" buttons />
      </b-form-group>
    </div>

    <div id="notification_time_summary" v-if="notification_time == 0">
    Receive notifications instantly
    </div>

    <div id="notification_time_summary" v-else>
    Receive notifications after <b>{{notification_time}}</b> minutes
    </div>
  </div>
</template>

<script>
import Authentication from '../../mixins/authentication'

export default {
  name: 'NotificationSettingsForm',

  mixins : [Authentication],

  data : function(){
    return {
      notification_time : null
    }
  },

  computed : {
    // TODO also add privilege notification time if set
    notification_times : function(){
      return this.membership_features.notification_times.map(function(nt){
        return {
          value : nt,
          text : nt == 0 ? 'Instant' : nt.toString()
        }
      })
    }
  },

  created : function(){
    this.notification_time = this.profile.notification_time
  }
}
</script>

<style scoped>
#notification_settings{
  border-bottom: 1px solid var(--theme-color3);
  font-family: var(--theme-font1);
}

#notification_time_title{
  font-family: var(--theme-font5);
}

#notification_time{
  display: flex;
  margin-top: 10px;
}

#notification_time_summary{
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;
}
</style>

<style>
#notification_time .btn{
  background-color: var(--theme-color6);
  color: black;
  border: 1px solid #D7DDE0
}

#notification_time .btn.active{
  background-color: var(--theme-color1);
  color: white;
}
</style>
