<!--
  * Txs 'Sub'Layout
  * Common layout used by many Tx/Account/Other pages in the UI,
  * rendering TxsControl and TxsSidebar, along with providing
  * slot for page specific content.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout :section="section">
    <div id="txs_layout">
      <div id="txs_header">
        <h2 id="txs_title">
          {{title}}
        </h2>

        <span v-if="live">
          <TxsControl />
        </span>
      </div>

      <div id="txs_content">
        <div id="txs_sidebar_container" v-if="mq_gt_md">
          <TxsSideBar />
        </div>

        <div id="txs_main_container">
          <slot></slot>
        </div>
      </div>
    </div>

    <SettingsModal />
  </MainLayout>
</template>

<script>
import MainLayout from './MainLayout'
import TxsControl from './TxsControl'
import TxsSideBar from './TxsSideBar'

import SettingsModal from './modals/Settings'

export default {
  name: 'Txs',

  components: {
    MainLayout,
    TxsControl,
    TxsSideBar,
    SettingsModal
  },

  props : {
    section : {
      type : String,
      required : true
    }
  },

  computed : {
    account : function(){
      return this.section == 'account';
    },

    notifications : function(){
      return this.section == 'notifications' ||
             this.section == 'notification'
    },

    live : function(){
      return this.section == 'txs';
    },

    title : function(){
      return this.account       ?          'Accounts' :
             this.notifications ?     'Notifications' :
             this.live          ? 'Live Transactions' :
                                       'Transactions';
    }
  }
}
</script>

<style scoped>
#txs_layout{
  display: flex;
  flex-direction: column;
}

#txs_header{
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#txs_title{
  font-family: "Helvetica Bold";
  font-weight: bold;
  font-size: 1.7rem;
  margin-bottom: 0;
  margin-right: 10px;
}

#main_layout.xs #txs_title{
  font-size: 5vw;
}

#txs_content{
  display: flex;
}

#txs_sidebar_container{
  flex-basis: 22%;
  margin-right: 25px;
}

#txs_main_container{
  flex-basis: 74%;
  margin-left: auto;
  overflow: auto;
}

#main_layout.md #txs_main_container,
#main_layout.sm #txs_main_container,
#main_layout.xs #txs_main_container{
  flex-basis: unset;
  width: 100%;
}
</style>
