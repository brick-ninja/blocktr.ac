/*
 * Main application entry point.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

// Main Vue instance
import Vue from 'vue'

// Import Vue and initializers
import { vue_init } from './init'

import {
  vue_init as store_vue_init
} from './store'

import {
  vue_init as router_vue_init
} from './router'

// Vue initialization
vue_init(Vue)
const store  = store_vue_init(Vue)
const router = router_vue_init(Vue)

// Create and mount Vue instance
new Vue({
  router : router,
  store  : store
}).$mount('#app')
