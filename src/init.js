/*
 * Top level Vue Initialization logic
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

// Cookies support
import VueReactiveCookie from 'vue-reactive-cookie'

// momentjs datetime support w/ timezones
import VueMoment from 'vue-moment'
import moment_tz from 'moment-timezone'

// Multiselect component
import Multiselect from 'vue-multiselect'
import "vue-multiselect/dist/vue-multiselect.min.css"

// Bootstrap components and styling
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Media query support
import { vue_init as mq_vue_init } from './mq'

// Common / site-wide Styling
import("../public/common.css")
import("../public/fonts.css")

// Vue template filters
import { vue_init as filter_vue_init  } from "./filters"

// Vue HTTP Client
import VueResource from 'vue-resource'

// Vue HTTP Mocker plugin
import HTTTP from './plugins/htttp'

// Connection to the blockchain server
import NetworkConnection from './plugins/network-connection'

// Global document configuration
import DocVars from './plugins/doc-vars.js';

///

// Initialization routine, should be initially
// called w/ Vue instance
export function vue_init(Vue){
  Vue.use(VueReactiveCookie, {convertJSON : true})

  Vue.use(VueMoment, {moment_tz});

  Vue.component('multiselect', Multiselect)

  mq_vue_init(Vue);

  filter_vue_init(Vue);

  Vue.config.productionTip = false

  Vue.use(BootstrapVue)

  Vue.use(VueResource)

  Vue.use(HTTTP)

  Vue.use(NetworkConnection)

  Vue.use(DocVars)
}
