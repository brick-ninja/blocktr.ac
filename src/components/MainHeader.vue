<!--
  * Main Site Header
  * Rendered on all pages.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="main_header">
    <MainTitle />
    <BlockchainSelector v-if="!is_landing && no_blockchain_configured" />

    <div id="main_header_spacer" />

    <HamburgerNav v-if="mq_lt_lg" />
    <MainNav      v-else />

    <LoginModal />
    <ForgotPasswordModal />
    <RegistrationModal />
    <RegisterFilterModal />
  </div>
</template>

<script>
import MainTitle           from './MainTitle'
import BlockchainSelector  from './BlockchainSelector'

import MainNav             from './MainNav'
import HamburgerNav        from './HamburgerNav'

import LoginModal          from './modals/Login'
import ForgotPasswordModal from './modals/ForgotPassword'
import RegistrationModal   from './modals/Registration'
import RegisterFilterModal from './modals/RegisterFilter'

import Blockchain          from '../mixins/blockchain'

export default {
  name: 'MainHeader',

  mixins : [Blockchain],

  components : {
    MainTitle,
    BlockchainSelector,

    MainNav,
    HamburgerNav,

    LoginModal,
    ForgotPasswordModal,
    RegistrationModal,
    RegisterFilterModal
  },

  computed : {
    is_landing : function(){
      return this.$route.path == '/';
    }
  }
}
</script>

<style scoped>
#main_header{
  width: 90%;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

#main_header_spacer{
  flex-grow: 1;
}
</style>
