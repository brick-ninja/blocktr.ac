<!--
  * Main Site Layout
  * Top level encapsulation component, rendered on all pages.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-container fluid
               id="main_layout"
               class="p-0"
               :class="$mq">
    <ConnectionStatus />

    <b-row id="main_header_container">
      <b-col class="p-0">
        <MainHeader />
      </b-col>
    </b-row>

    <b-row no-gutters id="main_content" :class="section">
      <b-col>
        <div id="main_subcontent" :class="section">
          <slot></slot>
        </div>
      </b-col>
    </b-row>

    <MainFooter />
  </b-container>
</template>

<script>
import MainHeader       from './MainHeader'
import MainFooter       from './MainFooter'
import ConnectionStatus from './ConnectionStatus'

import Authentication   from '../mixins/authentication'
import Blockchain       from '../mixins/blockchain'
import Network          from '../mixins/network'
import ServerAPI        from '../mixins/server_api'

import network_config   from '../config/network'

export default {
  name: 'MainLayout',

  mixins : [
    Authentication,
    Blockchain,
    Network,
    ServerAPI
  ],

  components : {
    MainHeader,
    MainFooter,
    ConnectionStatus
  },

  props : {
    section : {
      type : String,
      required : true
    }
  },

  watch : {
    active_blockchain : function(_, orig){
      // Reset network connection
      this.network.reset(orig);
      this.network_init();
      this.network.connect();

      // If on Account or TX page, redirect to TXs
      if(this.$route.path.includes("/account/") ||
         this.$route.path.includes("/tx/"))
         this.$router.push({path : "/txs"})
    }
  },

  created : function(){
    // Initialize and connect to network
    if(!this.$store.state.network_initialized){
      this.$store.commit('set_network_initialized', true);
      this.network_init();
      this.network.connect();
    }

    // If logged in, always load user to
    // verify user session is still active
    if(this.auth_token)
      this.load_user();
  }
}
</script>

<style scoped>
#main_layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
}

#main_header_container{
  width: 100%;
}

#main_content{
  width: 100%;
  flex-grow: 1;
  padding-bottom: 10px;
  background-color: #f8f8f9;
  border-top: 1px solid var(--theme-color3);
}

#main_subcontent{
  width: 90%;
  margin: auto;
}

/* XXX: hacks for landing page */

#main_content.landing{
  padding-bottom: 0;
  margin-bottom: 10px;
}

#main_subcontent.landing{
  width: unset;
}
</style>
