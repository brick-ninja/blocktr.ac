<!--
  * Main Title Text
  * Rendered on all pages.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="main_title_container">
    <router-link to="/txs">
      <h2 id="main_title">
        <span id="main_title1">{{main_title1}}</span>

        <span id="main_title2">{{main_title2}}</span>
      </h2>
    </router-link>
  </div>
</template>

<script>
import network_config from '../config/network'

export default {
  name: 'MainTitle',

  computed : {
    app_name : function(){
      return network_config.APP_NAME;
    },

    app_name_emphasis : function(){
      return network_config.APP_NAME_EMPHASIS;
    },

    main_title1 : function(){
      return this.app_name.slice(0, this.app_name_emphasis)
    },

    main_title2 : function(){
      return this.app_name.slice(this.app_name_emphasis)
    }
  }
}
</script>

<style scoped>
#main_title_container a{
  text-decoration: none;
}

#main_title{
  font-family: "Gilroy ExtraBold";
  margin-bottom: 0;
}

#main_layout.xs #main_title{
  font-size: 1.1rem;
}

#main_title1{
 color: #395267;
 font-weight: bold;
}

#main_title2{
  color: var(--theme-color1);
}
</style>
