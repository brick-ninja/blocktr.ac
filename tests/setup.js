/*
 * Test suite setup logic.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

// custom matchers
import './matchers'

// XXX: vue-reactive-cookie depends on js-cookie,
//      use that to reset cookies below
import Cookies from 'js-cookie';

// Including stubbing logic
const stubs = require('./stubs')

// Stub out methods before any application logic
beforeEach(function(){
  jest.useFakeTimers();
  stubs.stub_defaults();
})

// Restore initial state after completion
afterEach(function(){
  jest.resetAllMocks();
  jest.resetModules();
  jest.restoreAllMocks();

  // XXX: reset cookies
  const cookies = document.cookie.split("; ");
  cookies.forEach(function(cookie){
    const parts = cookie.split("=");
    Cookies.remove(parts[0])
  })
})

// Load vue components
// XXX: implemented as seperate module as we need to ensure
//      synchronously loaded so that stubbed methods are
//      in effect (for network components and such)
const vue = require('./vue')

// Export for use in tests
module.exports = vue;
