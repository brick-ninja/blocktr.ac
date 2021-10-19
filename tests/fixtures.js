/*
 * Test suite fixtures
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

const fs = require('fs')

const {
  modules : tx_modules
} = require("../src/plugins/network-connection").default

///

// Load specified fixture
function load_fixture(name){
  return JSON.parse(fs.readFileSync("./tests/fixtures/" + name + ".json"))
}

function load_matched_tests_fixture(name){
  return JSON.parse(fs.readFileSync("./tests/fixtures/matched_tests/" + name + ".json"))
}

///

// Load streamed transaction fixture
function load_streamed_tx_fixture(blockchain){
  const module = tx_modules[blockchain];
  const fixtures = load_fixture("transactions/" + blockchain + "-streamed")
  return fixtures.map(function(fixture){
           return module.prepare_streamed_tx(fixture)
         });
}

// Load static transaction fixture
function load_static_tx_fixture(blockchain){
  const module = tx_modules[blockchain]
  const fixtures = load_fixture("transactions/" + blockchain + "-static")
  return fixtures.map(function(fixture){
           return module.prepare_static_tx(fixture)
         });
}

///

// Export for use in tests
module.exports = {
  load_fixture,
  load_streamed_tx_fixture,
  load_static_tx_fixture,
  load_matched_tests_fixture
}
