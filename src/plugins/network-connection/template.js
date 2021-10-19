/*
 * Network Connection Plugin
 * <BLOCKCHAIN> Adapter Module
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

// Prepare statically received tx for internal processing
function prepare_static_tx(tx){
}

// Prepare streamed tx for internal processing
function prepare_streamed_tx(tx){
}

// Initialize module
function init(){
}

// Reset module
function reset(){
}

// Initiate <BLOCKCHAIN> Connection
function connect(){
}

// Validate <BLOCKCHAIN> Address
function validate_address(id){
}

// Retrieve <BLOCKCHAIN> account
function retrieve_account(id, cb){
}

// Retrieve <BLOCKCHAIN> transaction
function retrieve_tx(id, cb){
}

// Stream <BLOCKCHAIN> transactions
function stream_txs(cb){
}

// Stop streaming <BLOCKCHAIN> transactions
function stop_streaming_txs(){
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
