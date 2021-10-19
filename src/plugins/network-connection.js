/*
 * Network Connection Plugin
 * Blockchain Network Connection operations
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import xrp from './network-connection/xrp'
import xlm from './network-connection/xlm'
import btc from './network-connection/btc'
import eth from './network-connection/eth'

const modules = {
  xrp : xrp,
  xlm : xlm,
  btc : btc,
  eth : eth
};

///

export default {
  modules,

  install(Vue, options) {
    // Network variables
    Vue.prototype.network = {
      connected : false,
      callbacks : {
        connected    : [],
        disconnected : []
      }
    };

    // Internal helper, return module for active blockchain
    Vue.prototype.network._module = function(blockchain){
      if(!blockchain) blockchain = this.vue.active_blockchain;
      return modules[blockchain];
    }

    // Internal helper, invoke connected callbacks
    Vue.prototype.network._call_connected_callbacks = function(){
      // Iterate over copy of callbacks array
      this.callbacks.connected.slice().forEach(function(cb){
        cb()
      });
    }

    // Internal helper, invoke disconnected callbacks
    Vue.prototype.network._call_disconnected_callbacks = function(){
      // Iterate over copy of callbacks array
      this.callbacks.disconnected.slice().forEach(function(cb){
        cb();
      });
    }

    ///

    // Initialize module
    Vue.prototype.network_init = function(){
      this.network.vue = this;
      this.network._module().init.bind(this.network)();
    }

    // Reset module
    Vue.prototype.network.reset = function(blockchain){
      this.callbacks.connected    = [];
      this.callbacks.disconnected = [];

      this._module(blockchain).reset.bind(this)();
    }

    // Connect to blockchain network
    Vue.prototype.network.connect = function(){
      this._module().connect.bind(this)();
    }

    // Connected accessor
    Vue.prototype.network.is_connected = function(){
      return this.connected;
    }

    // Register connection callback, invoke immediate if already connected
    Vue.prototype.network.on_connection = function(cb){
      this.callbacks.connected.push(cb);

      if(this.connected) cb();
    }

    // Remove specified connection callback
    Vue.prototype.network.off_connection = function(cb){
      const index =  this.callbacks.connected.indexOf(cb)
      if(index > -1) this.callbacks.connected.splice(index, 1)
    }

    // Register disconnection callback, invoke immediate if already connected
    Vue.prototype.network.on_disconnection = function(cb){
      this.callbacks.disconnected.push(cb);

      if(!this.connected) cb();
    }

    // Remove specified disconnection callback
    Vue.prototype.network.off_disconnection = function(cb){
      const index =  this.callbacks.disconnected.indexOf(cb)
      if(index > -1) this.callbacks.disconnected.splice(index, 1)
    }

    ///

    // Validate network address
    Vue.prototype.network.is_valid_address = function(id){
      return this._module().validate_address.bind(this)(id);
    }

    // Retrieve account specified id, invoking callback w/ result
    Vue.prototype.network.account = function(id, cb){
      const connection_cb = function(){
        this.off_connection(connection_cb)
        this._module().retrieve_account.bind(this)(id, cb);
      }.bind(this)

      this.on_connection(connection_cb);
    }

    // Retrieve transaction specified id, invoking callback w/ result
    Vue.prototype.network.tx = function(id, cb){
      const connection_cb = function(){
        this.off_connection(connection_cb)
        this._module().retrieve_tx.bind(this)(id, cb);
      }.bind(this);

      this.on_connection(connection_cb)
    }

    // Retrieve next block time
    // XXX: blockchain dependent, not defined on all blockchains
    Vue.prototype.network.next_block_time = function(){
      return this._module().next_block_time();
    }

    // Stream transactions
    Vue.prototype.network.stream_txs = function(cb){
      const connection_cb = function(){
        this.off_connection(connection_cb)
        this._module().stream_txs.bind(this)(cb);
      }.bind(this)

      this.on_connection(connection_cb)
    }

    // Stop streaming transactions
    Vue.prototype.network.stop_streaming_txs = function(){
      const connection_cb = function(){
        this.off_connection(connection_cb)
        this._module().stop_streaming_txs.bind(this)();
      }.bind(this)

      this.on_connection(connection_cb)
    }
  }
}
