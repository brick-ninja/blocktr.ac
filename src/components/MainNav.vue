<!--
  * Main Site Navigation
  * Top level site navigation rendered on app pages on larger
  * resolutions. Replaced with HamburgerNav on smaller resolutions
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="main_nav"
       :class="{logged_in : logged_in}">
    <div class="nav_container">
      <router-link to="/about">
        <span id="about_link"
              class="nav_link">
          About
        </span>
      </router-link>
    </div>

    <div class="nav_container">
      <router-link to="/help">
        <span id="help_link"
              class="nav_link">
          Help
        </span>
      </router-link>
    </div>

    <div v-if="!logged_in"
         class="nav_container">
      <span id="login_link"
            class="nav_link"
            @click="$emit('nav')"
            v-b-modal.login_modal>
        Login
      </span>
    </div>

    <div v-if="!logged_in"
         id="register_link_container"
         class="nav_container">
      <span id="register_link"
            class="nav_link"
            @click="$emit('nav')"
            v-b-modal.register_modal>
        Register
      </span>
    </div>

    <div v-if="logged_in"
           id="membership_level_link_container"
           class="nav_container"
           :class="{premium : is_premium_member}">
      <router-link to="/plans">
        <span id="membership_level_link"
              class="nav_link">
          {{is_premium_member ? 'Premium' : hamburger ? 'Upgrade' : 'Get a pro account'}}
        </span>
      </router-link>
    </div>

    <div v-if="logged_in && hamburger"
         id="profile_link"
         class="nav_container">
      <router-link to="/profile">
        <span class="nav_link">Profile</span>
      </router-link>
    </div>

    <div v-if="logged_in && hamburger"
         id="logout_link"
         class="nav_container"
         @click="$emit('nav'); logout()">
      <span class="nav_link">Log out</span>
    </div>

    <div v-if="logged_in && !hamburger"
           id="my_account_container"
           class="nav_container">
      <span id="my_account_link"
            class="nav_link">
        <span>My Account</span>

        <span v-if="!my_account_visible">
          <img class="my_account_arrow"
                 src="../assets/arrow-down-gray.png" />
        </span>

        <span v-else>
          <img class="my_account_arrow"
                 src="../assets/arrow-up-blue.png" />
        </span>
      </span>

      <b-popover id="my_account_popover"
                 ref="my_account_popover"
                 target="my_account_container"
                 placement="bottomleft"
                 @show="my_account_show"
                 @hide="my_account_hide">
        <div id="profile_link"
             class="my_account_popover_item">
          <img src="../assets/profile.svg" />
          <router-link to="/profile">Profile</router-link>
        </div>

        <div id="logout_link"
             class="my_account_popover_item"
             @click="$refs.my_account_popover.$emit('close'); logout()">
          <img src="../assets/logout.svg" />
          <span>Log out</span>
        </div>
      </b-popover>
    </div>
  </div>
</template>

<script>
import Authentication from '../mixins/authentication'

export default {
  name: 'MainNav',

  mixins : [Authentication],

  props : {
    hamburger : Boolean
  },

  data : function(){
    return {
      my_account_visible : false
    };
  },

  methods : {
    my_account_show : function(){
      this.my_account_visible = true;
    },

    my_account_hide : function(){
      this.my_account_visible = false;
    }
  }
}
</script>

<style scoped>
a:hover{
  text-decoration: none;
}

#main_nav{
  display: flex;
  justify-content: space-between;
}

#main_hamburger #main_nav{
  flex-direction: column;
}

.nav_container{
  min-width: 65px;
}

#main_nav:not(.logged_in) .nav_container{
  text-align: center;
}

#main_hamburger .nav_container{
  text-align: center;
  font-size: 2.5rem;
  margin: 15px;
}

#main_hamburger .nav_link{
  color: white;
}

#about_link{
  font-family: var(--theme-font1);
  color: var(--theme-color2);
}

#help_link{
  font-family: var(--theme-font1);
  color: var(--theme-color2);
}

#login_link{
  font-family: var(--theme-font1);
  cursor: pointer;
  color: var(--theme-color2);
}

#register_link_container{
  min-width: 125px;
}

#register_link{
  font-family: var(--theme-font1);
  cursor: pointer;
  border-radius: 15px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: var(--theme-color1);
  color: white;
}

#main_hamburger #register_link{
  border-radius: 25px;
  background-color: white;
  color: var(--theme-color1);
}

#profile_link{
  font-family: var(--theme-font1);
}

#profile_link a{
  color: var(--theme-color2);
}

#logout_link{
  font-family: var(--theme-font1);
  cursor: pointer;
  color: var(--theme-color2);
}

#membership_level_link_container{
  min-width: 125px;
}

#membership_level_link_container:not(.premium){
  min-width: 185px;
}

#membership_level_link_container a{
  background-color: var(--theme-color1);
  color: white;
  border-radius: 15px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
}

#main_hamburger #membership_level_link_container a{
  border-radius: 25px;
  background-color: white;
}

#main_hamburger #membership_level_link{
  color: var(--theme-color1);
}

#membership_level_link{
  font-family: var(--theme-font5);
}

#my_account_container{
  cursor: pointer;
}

#my_account_link{
  font-family: var(--theme-font5);
  color: var(--theme-color2);
}

.my_account_arrow{
  width: 10px;
  height: 5px;
  margin-left: 7px;
}

#my_account_popover{
  font-size: 1.2rem;
  min-width: 125px;
  left: 57px !important;
}

#my_account_popover img{
  margin-right: 5px;
}

.my_account_popover_item{
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 65px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}
</style>
