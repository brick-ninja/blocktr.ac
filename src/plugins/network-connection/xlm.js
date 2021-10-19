/*
 * Network Connection Plugin
 * XLM Adapter Module
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

const StellarSdk = require('stellar-sdk')
const {simplify} = require("ezxlm")

const {wrap_tx} = require("../../util").default
const txs_config = require("../../config/txs")

// XXX: import XLM operations helper for use below
const XLMOperations = require("../../components/tx_summaries/xlm/operations").default;

// XXX: XLM conversion function copied from ziti/workers/listen_to_txs/xlm
function convert_tx(tx){
  return simplify(tx);
}

// Prepare statically received tx for internal processing
function prepare_static_tx(tx){
  return wrap_tx(convert_tx(tx));
}

// Prepare streamed tx for internal processing
function prepare_streamed_tx(tx){
  // Wrap / Convert transactions in same fashion as ziti
  var prepared = wrap_tx(convert_tx(tx));

  // Set fields used internally in zitui
  const operation = (XLMOperations.prioritized(XLMOperations.all(prepared.transaction)) || {})._type;
  prepared.category = txs_config.tx_category_for_type(operation);
  prepared.hash = prepared.transaction.hash;

  return prepared;
}

// Initialize module
function init(){
  // Stubbed for module API compatability
}

// Reset module
function reset(){
  stop_streaming_txs.bind(this)();
  if(this.heartbeat){
    clearInterval(this.heartbeat);
    this.heartbeat = null;
  }
  this.connected = false;
}

// Initiate XLM Connection
function connect(){
  this.stellar_server =
    new StellarSdk.Server(this.vue.active_network_uri);

  // Start testing XLM connection
  test_connection.bind(this)();
  this.heartbeat = setInterval(test_connection.bind(this), 5000);
}

// Periodically poll XLM server, handle connection failures
function test_connection(){
  this.stellar_server.fetchBaseFee()
      .then(function(fee){
        if(!this.connected){
          this.connected = true;
          this._call_connected_callbacks();
        }

      }.bind(this)).catch(function(){
        if(this.connected){
          this.connected = false;
          this._call_disconnected_callbacks();
        }
      })
}

// Validate XLM address
function validate_address(id){
  return StellarSdk.StrKey.isValidEd25519PublicKey(id);
}

// Retrieve XLM account
function retrieve_account(id, cb){
  const account_p = this.stellar_server
                        .accounts()
                        .accountId(id)
                        .call()

  const tx_p = this.stellar_server
                   .transactions()
                   .forAccount(id)
                   .limit(1)
                   .order('desc')
                   .call()

  Promise.all([account_p, tx_p])
         .then(function(result){
           const account = result[0];
           const      tx = result[1].records[0];

           var obj = {}
           obj.balance  = account.balances.find((b) => (b.asset_type == 'native')).balance
           obj.sequence = account.sequence
           obj.previous_txn = tx.id;
           cb(obj)
         })
}

// Retrieve XLM transaction
function retrieve_tx(id, cb){
  this.stellar_server
      .transactions()
      .transaction(id)
      .call()
      .then(function(tx){
        cb(prepare_static_tx(tx))
      }.bind(this))
}

// Transactions stream callback,
// See usage in stream_txs / stop_streaming_txs below
var txs_cb = null;

// Stream XLM transactions
function stream_txs(cb){
  if(!this.vue.xlm_active) return;

  if(txs_cb)
    txs_cb();

  txs_cb =
    this.stellar_server
        .transactions()
        .cursor('now')
        .stream({
          onmessage : function(tx){
            const prepared = prepare_streamed_tx(tx);

            // Freeze transaction objects to improve performance
            Object.freeze(prepared);

            cb(prepared)
          }.bind(this)
        })
}

// Stop streaming XLM transactions
function stop_streaming_txs(){
  // Call method returned by stream to stop streaming
  if(txs_cb)
    txs_cb();

  // Reset callback
  txs_cb = null;
}

///

module.exports = {
  prepare_static_tx,
  prepare_streamed_tx,

  init,
  reset,
  connect,
  validate_address,
  retrieve_account,
  retrieve_tx,
  stream_txs,
  stop_streaming_txs
}
