/*
 * Test suite stubbed methods
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

///

// Define matchMedia, so that we can use / test media queries

import mediaQuery from "css-mediaquery";

var match_media_result;

function match_media(query){
  const matches = mediaQuery.match(query, {
                     width: window.innerWidth,
                    height: window.innerHeight,
                  });

  match_media_result = {
                  matches: matches,
                    media: query,
                 onchange: null,
              addListener: jest.fn(), // Deprecated
           removeListener: jest.fn(), // Deprecated
         addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
  };

  return match_media_result;
}

function window_resize_handler(){
  const change = mediaQuery.match(query, {
      width: window.innerWidth,
      height: window.innerHeight,
  });

  if(change != match_media_result.matches) {
    match_media_result.matches = change;
    match_media_result.dispatchEvent("change");
  }
}

function stub_match_media(){
  Object.defineProperty(window, "matchMedia", {
    writable: true,
       value: jest.fn().mockImplementation(match_media)
  });

  // Listen to resize events from window.resizeTo
  // and update the result's match
  window.removeEventListener("resize", window_resize_handler);
     window.addEventListener("resize", window_resize_handler);
}

///

// Define scrollTo to mitigate 'not implemented' error

function scroll_to(x, y) {
  document.documentElement.scrollTop = y;
}

function stub_scroll_to(){
  window.scrollTo = jest.fn().mockImplementation(scroll_to)
}

///

// Define window.alert

function stub_window_alert(){
  window.alert = jest.fn()
}

///

// Stub ripple-lib
function stub_ripple_api(){
  jest.mock("ripple-lib")

  var ripplelib = require('ripple-lib')
  var rippleapi = {
           connect : jest.fn().mockImplementation(() => new Promise(() => {})),
           request : jest.fn().mockImplementation(() => new Promise(() => {})),
         getLedger : jest.fn(),
    isValidAddress : jest.fn(),
                on : jest.fn(),
        connection : {
                on : jest.fn()
        }
  }

  ripplelib.RippleAPI.mockImplementation(() => rippleapi)
}

///

// Stub stellar-sdk
function stub_stellar_sdk(){
  jest.mock("stellar-sdk")
  var stellarsdk = require("stellar-sdk")

  var callbuilder = {
    cursor : jest.fn().mockImplementation(() => callbuilder),
    stream : jest.fn().mockImplementation(() => callbuilder)
  }
  var stellarserver = {
    transactions : jest.fn().mockImplementation(() => callbuilder)
  }
  stellarsdk.Server.mockImplementation(() => stellarserver)

  // XXX: original StellarSdk xdr and Keypair modules used
  const orig_sdk = jest.requireActual("stellar-sdk")
  stellarsdk.xdr = orig_sdk.xdr;
  stellarsdk.Keypair = orig_sdk.Keypair;
}

///

// Stubbed network connection module

function stubbed_network_module() {
  return {
                  init : jest.fn(),
                 reset : jest.fn(),
               connect : jest.fn(),
      validate_address : jest.fn(),
      retrieve_account : jest.fn(),
           retrieve_tx : jest.fn(),
            stream_txs : jest.fn(),
    stop_streaming_txs : jest.fn()
  };
}

function stubbed_network() {
  return {
                         _module : jest.fn().mockReturnValue(stubbed_network_module()),
                        _wrap_tx : jest.fn(),
       _call_connected_callbacks : jest.fn(),
    _call_disconnected_callbacks : jest.fn(),
                           reset : jest.fn(),
                         connect : jest.fn(),
                    is_connected : jest.fn(),
                   on_connection : jest.fn(),
                  off_connection : jest.fn(),
                on_disconnection : jest.fn(),
               off_disconnection : jest.fn(),
                is_valid_address : jest.fn(),
                         account : jest.fn(),
                              tx : jest.fn(),
                      stream_txs : jest.fn(),
              stop_streaming_txs : jest.fn()
  };
}

///

// Stubbed maintenance mode mixin

function stubbed_maintenance_mode(){
  return {
    computed : {
      maintenance_mode : function(){
        return true;
      }
    },

    methods : {
      nav_to_maintenance : jest.fn()
    }
  }
}

///

// Stubbed validatable module

function stubbed_validatable(){
  return {
    methods : {
      validate : jest.fn()
    }
  }
}

///

// Stubbed htttp module
function stubbed_htttp(){
  return {
       get : jest.fn(),
      post : jest.fn(),
    delete : jest.fn(),
       put : jest.fn()
  };
}

///

// Default methods we stub
function stub_defaults(){
  stub_match_media();
  stub_scroll_to();
  stub_window_alert();
  stub_ripple_api();
  stub_stellar_sdk();
}

// Export for use in tests
module.exports = {
  stub_defaults,
  stubbed_network_module,
  stubbed_network,
  stubbed_maintenance_mode,
  stubbed_validatable,
  stubbed_htttp
}
