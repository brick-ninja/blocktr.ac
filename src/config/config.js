/*
 * Zitui Application configuration
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

module.exports = {
  // Backend URL to get/set data
  // BACKEND_URL : "http://localhost:3000",
  BACKEND_URL : "https://api.blocktr.ac",
  //BACKEND_URL : "https://api.zerptracker.com",
  //BACKEND_URL : "https://api.stracker.io",

  // Enable to disable site functionaily,
  // display maintenance page
  MAINTENANCE_MODE : false,

  // Enable to disable registration
  REGISTRATION_DISABLED : false, // TODO handle

  // How often status is refreshed (in ms)
  STATUS_REFRESH : 1500,

  // From the XRP Protocol
  DROPS_PER_XRP : 1000000,

  // From the XLM Protocol
  STROOPS_PER_XLM : 10000000,

  // From the BTC Protocol
  SATOSHIS_PER_BTC : 100000000,

  // From the ETH Protocol
  WEI_PER_ETH : 1000000000000000000
}
