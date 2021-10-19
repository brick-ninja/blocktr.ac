/*
 * Doc Variables Plugin
 * Set various document properties from configuration
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */


import network_config from '../config/network'

export default {
  install(Vue, options) {
    // Document title from app name
    document.title = network_config.APP_NAME;

    // Network specific favicon
    var favicon = document.querySelector("link[rel*='icon']")

    // XXX: conditionalize favicon for test suite
    if(favicon)
      favicon.href = process.env.BASE_URL +
                               "favicon-" +
       (network_config.BLOCKCHAIN == null ?
                             'blockchain' :
               network_config.BLOCKCHAIN) +
                                    ".ico";
  }
}
