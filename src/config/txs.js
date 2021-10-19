/*
 * Zitui Application configuration
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

module.exports = {
  // Number of TXs to retain in history
  TX_HISTORY : 75,

  // Whether Blockchain TXs fall into categories
  ENABLE_TX_CATEGORIES : {
    'xrp' : true,
    'xlm' : true,
    'btc' : false,
    'eth' : false
  },

  // Whether Blockchain close estimate should be displayed
  ENABLE_BLOCK_ESTIMATE : {
    'xrp' : false,
    'xlm' : false,
    'btc' : true,
    'eth' : false
  },

  // Categories TXs fall in to
  TX_CATEGORIES : [
    'ALL',
    'PAYMENTS',
    'OFFERS',
    'TRUST LINES',
    'ACCOUNT SETS',
    'ESCROWS',
    'PAYMENT CHANNELS'
  ],

  // After this index categories are
  // displayed in a consise manner
  SECONDARY_TX_CATEGORIES_INDEX : 4,

  // General TX category for each ledger type
  tx_category_for_type : function(t){
    switch(t){
      case "Payment":                  // XRP
      case "payment":                  // XLM
      case "paymentPathStringSend":    // XLM
      case "paymentPathStringReceive": // XLM
        return "PAYMENTS";
  
      case "OfferCreate":              // XRP
      case "OfferCancel":              // XRP
      case "manageBuyOffer":           // XLM
      case "manageSellOffer":          // XLM
      case "createPassiveSellOffer":   // XLM
        return "OFFERS";

      case "TrustSet":                 // XRP
      case "changeTrust":              // XLM
      case "allowTrust":               // XLM
        return "TRUST LINES";

      case "AccountSet":               // XRP
      case "AccountDelete":            // XRP
      case "SignerListSet":            // XRP
      case "createAccount":            // XLM
      case "setOptions":               // XLM
      case "accountMerge":             // XLM
      case "manageData":               // XLM
      case "bumpSequence":             // XLM
        return "ACCOUNT SETS";
  
      case "EscrowCreate":             // XRP
      case "EscrowFinish":             // XRP
      case "EscrowCancel":             // XRP
        return "ESCROWS";
  
      case "PaymentChannelCreate":     // XRP
      case "PaymentChannelClaim":      // XRP
      case "PaymentChannelFund":       // XRP
        return "PAYMENT CHANNELS";
  
      default:
        return null;
    }
  }
}
