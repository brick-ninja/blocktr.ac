<!--
  * Hamburger Navigation
  * Top level navigation rendered in lieu of main nav in
  * smaller resolutions.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div>
    <img id="main_hamburger_open_icon"
         src="../assets/hamburger.svg"
         @click="hamburger_visible = true"/>

    <transition name="fade">
      <div id="main_hamburger" v-show="hamburger_visible">
        <div id="hide_hamburger"
             @click="hamburger_visible = false">
          <img id="main_hamburger_close_icon"
               src="../assets/x-white.svg" />
        </div>

        <MainNav hamburger @nav="hamburger_visible = false"/>
      </div>
    </transition>
  </div>
</template>

<script>
import MainNav from './MainNav'

export default {
  name: 'HamburgerNav',

  components : {
    MainNav
  },

  data : function(){
    return {
      hamburger_visible : false
    };
  }
}
</script>

<style scoped>
#main_hamburger_open_icon{
  width: 25px;
  cursor: pointer;
}

#main_layout.xs #main_hamburger_open_icon{
  width: 20px;
}

#main_hamburger{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;

  background-color: var(--theme-color1);
  padding: 20px;
}

#main_hamburger_close_icon{
  width: 25px;
}

#hide_hamburger{
  cursor: pointer;
  text-align: right;
}
</style>
