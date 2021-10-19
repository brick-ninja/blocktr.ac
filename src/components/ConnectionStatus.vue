<!--
  * Connection Status Toast
  * Non-closable toast rendered on socket disconnections
  * and hidden on reconnections.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-toast id="connection_status"
           variant="danger"
           toaster="b-toaster-bottom-full"
           no-auto-hide
           no-close-button>
    <div id="container">
      <b>Lost connection to server... Reconnecting...</b>
      <b-spinner type="grow" />
    </div>
  </b-toast>
</template>

<script>
import Blockchain from '../mixins/blockchain'

export default {
  name: 'ConnectionStatus',

  mixins : [Blockchain],

  watch : {
    active_blockchain : function(){
      this.unregister_connection();
      this.unregister_disconnection();
      this.register_connection();
      this.register_disconnection();
    }
  },

  methods : {
    on_connection : function(){
      this.$bvToast.hide('connection_status');
    },

    on_disconnection : function(){
      this.$bvToast.show('connection_status');
    },

    register_connection : function(){
      this.network.on_connection(this.on_connection);
    },

    register_disconnection : function(){
      this.network.on_disconnection(this.on_disconnection);
    },

    unregister_connection : function(){
      this.network.off_connection(this.on_connection);
    },

    unregister_disconnection : function(){
      this.network.off_disconnection(this.on_disconnection);
    }
  },

  mounted : function(){
    this.register_connection();
    this.register_disconnection();
  },

  destroyed : function(){
    this.unregister_connection();
    this.unregister_disconnection();
  }
}
</script>

<style scoped>
#container{
  display: flex;
  align-items: center;
}
</style>
