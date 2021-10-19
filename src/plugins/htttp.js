/*
 * HTTTP Plugin
 * Provides stubabble wrapper to vue $http plugin
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

export default {
  install(Vue, options) {
    Vue.prototype.$htttp = function(){
      return this.$http;
    }
  }
}
