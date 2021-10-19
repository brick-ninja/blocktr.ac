<!--
  * Notification Header
  * Rendered at the top of the notification list / notification details
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="notification_header">
    <div id="timestamp_header">
      Timestamp
    </div>
  
    <div id="filter_header">
      Filter
    </div>
  
    <div id="target_header">
      Target
    </div>
  
    <div id="transactions_header">
      Transactions
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationHeader'
}
</script>

<style scoped>
#notification_header{
  display: flex;
  font-weight: bold;
}

#timestamp_header{
  flex-basis: 20%;
}

#filter_header{
  flex-basis: 20%;
}

#target_header{
  flex-basis: 40%;
}

#transactions_header{
  flex-basis: 20%;
}
</style>
