<!--
  * Notifications Summary Component
  * Renders and overview of a notification
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div class="notification">
    <div class="timestamp">
      {{formatted_timestamp}}
    </div>

    <div class="filter">
      {{notification.Filter.name}}
    </div>

    <div class="target">
      {{notification.Sink.type}}: {{notification.Sink.target}}
    </div>

    <div class="transactions">
      {{notification.FilterMatches.length}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationSummary',

  props : {
    notification : {
      type : Object,
      required : true
    }
  },

  computed : {
    formatted_timestamp : function(){
      if(!this.notification.timestamp) return "";
      return this.$options.filters.moment(this.notification.timestamp, "YYYY-MM-DD HH:mm:ss");
    }
  }
}
</script>

<style scoped>
.notification{
  width: 100%;
  display: flex;
  align-items: center;
}

.timestamp{
  flex-basis: 20%;
  font-size: 0.9rem;
}

.filter{
  flex-basis: 20%;
}

.target{
  flex-basis: 40%;
}

.transactions{
  flex-basis: 20%;
}
</style>
