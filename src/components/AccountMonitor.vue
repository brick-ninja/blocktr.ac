<!--
  * Account Monitor Widget
  * Provides a control to set JSONPath filter with expression
  * that will match transactions containing the specified
  * Account ID.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="account_monitor">
    <p><b>Monitor your account</b></p>

    <div id="account_monitor_input_container">
      <div id="account_monitor_input_wrapper">
        <span id="account_monitor_icon">
          <img src="../assets/search.svg" />
        </span>

        <input type="text"
               placeholder="Account ID"
               :value="account"
               @input="evnt=> account = evnt.target.value" />
      </div>

      <div id="account_monitor_error"
           v-if="have_account && !is_valid_account">
        Invalid Account
      </div>
    </div>
  </div>
</template>

<script>
const EXPRESSION = "$..[?(@.Account == 'ACCOUNT')]";

export default {
  name: 'AccountMonitor',

  data : function(){
    return {
      account : null
    }
  },

  computed : {
    have_account : function(){
      return !!this.account;
    },

    is_valid_account : function(){
      return this.network.is_valid_address(this.account);
    }
  },

  watch : {
    is_valid_account : function(){
      const jsonpath = EXPRESSION.replace("ACCOUNT", this.account);

      if(this.is_valid_account)
        this.$store.commit('update_tx_filter', jsonpath);
    }
  }
}
</script>

<style scoped>
#account_monitor{
  text-align: center;
}

p{
  margin-bottom: 5px;
  font-family: "Inter Medium";
}

#account_monitor_input_container{
  background-color: white;
  padding: 25px;
  border: 1px solid var(--theme-color3);
}

#account_monitor_input_wrapper{
  position: relative;
}

#account_monitor_icon{
  position: absolute;
  left: 10px;
  top: 5px;
  font-size: 1.2rem;
}

input{
  width: 100%;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 7px;
  color: var(--theme-color4);
}

#account_monitor_error{
  color: red;
  font-size: 0.9rem;
}
</style>
