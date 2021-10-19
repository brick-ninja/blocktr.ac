/*
 * Helper providing access to a local xrp transaction specifics as
 * a property param to the component including this mixin.
 *
 * Used by all components rendered for a single xrp transaction
 * including the tx_type summaries.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import util       from '../../../util'
import txs_config from '../../../config/txs'

export default {
  props : {
    tx : {
      type : Object,
      required : true
    }
  },

  computed : {
    tx_obj : function(){
      return this.tx["transaction"] || this.tx["tx"];
    },

    tx_meta : function(){
      return this.tx["meta"];
    },

    affected_nodes : function(){
      return this.tx_meta["AffectedNodes"];
    },

    tx_type : function(){
      return this.tx_obj["TransactionType"];
    },

    tx_short_type : function(){
      return this.tx_obj["TransactionType"].replace("PaymentChannel", "PayChan");
    },

    hash : function(){
      return this.tx_obj["hash"];
    },

    account : function(){
      return this.tx_obj["Account"];
    },

    tx_category : function(){
      return txs_config.tx_category_for_type(this.tx_type);
    },

    tx_result : function(){
      return this.tx_meta["TransactionResult"];
    },

    success : function(){
      return this.tx_result == "tesSUCCESS" ;
    },

    unix_date : function(){
      if(typeof(this.tx_obj["date"]) == "string")
        return Date.parse(this.tx_obj["date"]);

      return util.ledger_time_to_unix(this.tx_obj["date"]);
    },

    formatted_date : function(){
      return this.$options.filters.moment(this.unix_date, "YYYY-MM-DD HH:mm:ss");
    }
  },

  methods : {
    // Returns the nodes of the specified type
    // created by transaction
    created_nodes : function(type){
      return this.affected_nodes.filter(function(node){
               return node['CreatedNode'] &&
                      node['CreatedNode']['LedgerEntryType'] == type;
             });
    },

    // Returns the first node of the specified type
    // created by transaction
    created_node : function(type){
      const node = this.created_nodes(type)[0];
      if(!node) return null;

      return node['CreatedNode']
    },

    // Returns the fields associated with the first
    // created node of the specified type
    created_fields : function(type){
      const node = this.created_node(type);
      if(!node) return null;

      return node['NewFields'];
    },

    ///

    // Returns the nodes of the specified type
    // modified by transaction
    modified_nodes : function(type){
      return this.affected_nodes.filter(function(node){
               return node['ModifiedNode'] &&
                      node['ModifiedNode']['LedgerEntryType'] == type;
             });
    },

    // Returns the first node of the specified type
    // modified by transaction
    modified_node : function(type){
      const node = this.modified_nodes(type)[0];
      if(!node) return null;

      return node['ModifiedNode']
    },

    // Returns the fields associated with the first
    // modified node of the specified type
    modified_fields : function(type){
      const node = this.modified_node(type);
      if(!node) return null;

      return node['FinalFields'];
    },

    ///

    // Returns the nodes of the specified type
    // deleted by transaction
    deleted_nodes : function(type){
      return this.affected_nodes.filter(function(node){
               return node['DeletedNode'] &&
                      node['DeletedNode']['LedgerEntryType'] == type;
             });
    },

    // Returns the first node of the specified type
    // deleted by transaction
    deleted_node : function(type){
      const node = this.deleted_nodes(type)[0];
      if(!node) return null;

      return node['DeletedNode']
    },

    // Returns the fields associated with the first
    // deleted node of the specified type
    deleted_fields : function(type){
      const node = this.deleted_node(type);
      if(!node) return null;

      return node['FinalFields'];
    }
  }
}
