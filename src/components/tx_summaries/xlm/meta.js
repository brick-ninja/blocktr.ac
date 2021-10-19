/*
 * Helper providing access to a local xlm transaction specifics as
 * a property param to the component including this mixin.
 *
 * Used by all components rendered for a single xlm transaction
 * including the tx_type summaries.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

var Inflector = require('inflector-js')

import txs_config from '../../../config/txs'
import operations from './operations'

export default {
  props : {
    tx : {
      type : Object,
      required : true
    }
  },

  computed : {
    hash : function(){
      return this.tx.hash;
    },

    account : function(){
      return this.tx.source_account;
    },

    tx_result : function(){
      return this.tx.result.result._type;
    },

    success : function(){
      return this.tx_result == "txSuccess" ;
    },

    operations : function(){
      return operations.all(this.tx)
    },

    operation_types : function(){
      return operations.types(this.operations);
    },

    humanized_operation_types : function(){
      return this.operation_types
                 .map(function(op){
                   return Inflector.camel2words(Inflector.underscore(op))
                 })
    },

    // Proritize operation to highlight
    operation : function(){
      return operations.prioritized(this.operations)
    },

    operation_type : function(){
      return (this.operation || {})._type;
    },

    short_operation_type : function(){
      if(this.operation_type.substring(0, 10) == "paymentPath")
        return "PaymentPath";

      else if(this.operation_type.substring(this.operation_type.substring.length - 5,
                                            this.operation_type.substring.length) == "Offer")
        return "Offer";

      return Inflector.camelize(this.operation_type);
    },

    multiple_operations : function(){
      return this.operations.length > 1;
    },

    tx_category : function(){
      return txs_config.tx_category_for_type(this.operation_type);
    },

    created_at : function(){
      return Date.parse(this.tx.created_at);
    },

    formatted_date : function(){
      return this.$options.filters.moment(this.created_at, "YYYY-MM-DD HH:mm:ss");
    }
  }
}
