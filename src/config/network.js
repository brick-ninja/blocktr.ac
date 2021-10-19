/*
 * Zitui Application network configuration
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

// Network to connect to.
// Supported: null, xrp_mainnet, xlm_mainnet
const NETWORK = null;
//const NETWORK = 'xrp_mainnet';
//const NETWORK = 'xlm_mainnet';
//const NETWORK = 'btc_mainnet';
//const NETWORK = 'eth_mainnet';

// Network Endpoints
const NETWORK_URIS = {
  'xrp_mainnet' : "wss://s2.ripple.com:443",
  'xlm_mainnet' : "https://horizon.stellar.org",

  btc_mainnet : {
    // Blockchain API: https://www.blockchain.com/api/blockchain_api
    //latest_block : "https://blockchain.info/latestblock?cors=true",
    //latest_block : "https://chain.api.btc.com/v3/block/latest",
    latest_block : "https://api.blockcypher.com/v1/btc/main",
         block_n : "https://blockchain.info/rawblock/HASH?cors=true",
         account : "https://blockchain.info/rawaddr/ADDR?cors=true",
              tx : "https://blockchain.info/rawtx/HASH?cors=true",
      block_time : "https://blockchain.info/q/interval?cors=true"
  },

  // ETH Wrapper: https://docs.linkpool.io/docs/public_rpc
  eth_mainnet : {
      provider : "https://main-light.eth.linkpool.io/",
    block_time : "https://etherscan.io/chart/blocktime?output=csv"
  }
};

// Default networks
const DEFAULT_NETWORKS = {
  'xrp' : 'xrp_mainnet',
  'xlm' : 'xlm_mainnet',
  'btc' : 'btc_mainnet',
  'eth' : 'eth_mainnet'
}

///

// Blockchain identifier
const BLOCKCHAIN = NETWORK ?
     NETWORK.split("_")[0] :
                       null;

// Supported blockchains
const BLOCKCHAINS = ['btc', 'eth', 'xlm', 'xrp'];

// Default blockchain
const DEFAULT_BLOCKCHAIN = BLOCKCHAINS[2];

///

// Application names
// XXX: synchronize w/ appname in ziti/util
const APP_NAMES = {
  'xrp' : 'Zerp Tracker',
  'xlm' : 'Stracker',
  'btc' : '???',
  'eth' : '???',
   null : 'Block Trac'
}

// Application name emphasises,
// index before which emphasis will be added
const APP_NAME_EMPHASISES = {
  'xrp' : 4,
  'xlm' : 1,
  'btc' : 0,
  'eth' : 0,
   null : 5
};

// Applicaton name
const APP_NAME = APP_NAMES[BLOCKCHAIN];

// Application name emphasis
const APP_NAME_EMPHASIS = APP_NAME_EMPHASISES[BLOCKCHAIN];

///

module.exports = {
  NETWORK : NETWORK,

  NETWORK_URIS : NETWORK_URIS,

  DEFAULT_NETWORKS : DEFAULT_NETWORKS,

  BLOCKCHAIN : BLOCKCHAIN,

  BLOCKCHAINS : BLOCKCHAINS,

  DEFAULT_BLOCKCHAIN : DEFAULT_BLOCKCHAIN,

  APP_NAME : APP_NAME,

  APP_NAME_EMPHASIS
}
