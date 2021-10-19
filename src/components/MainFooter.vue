<!--
  * Main Site Footer
  * Rendered on all pages.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-row no-gutters id="main_footer">
    <b-col>
      © 2020-2021 Dev Null Productions LLC<br />All Rights Reserved 
      <span v-if="mq_gt_sm">|</span><br v-else /> <router-link to="/terms">Terms of Service</router-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'MainFooter',
}
</script>

<style scoped>
#main_footer{
  width: 100%;
  font-family: "Inter Medium";
  text-align: center;
  background-color: white;
  padding-top: 20px;
  padding-bottom: 15px;
  border-top: 1px solid var(--theme-color3);
}
</style>
