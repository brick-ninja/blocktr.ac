/*
 * Helper to manage tx category operations / state.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import txs_config from '../config/txs'

export default {
  data : function(){
    return {
      all_categories : txs_config.TX_CATEGORIES
    };
  },

  computed : {
    enabled_categories : function(){
      return this.$store.state.tx_categories;
    },

    primary_categories : function(){
      return this.all_categories.slice(0,
        txs_config.SECONDARY_TX_CATEGORIES_INDEX);
    },

    secondary_categories : function(){
      return this.all_categories.slice(txs_config.SECONDARY_TX_CATEGORIES_INDEX,
        this.all_categories.length);
    },

    category_tallies : function(){
      return this.$store.state.tx_category_tallies;
    }
  },

  methods : {
    // Returns boolean indicating if category is enabled
    is_enabled : function(category){
      const all = category == 'ALL';
      return ( all && this.enabled_categories.length == 0) ||
             (!all && this.enabled_categories.includes(category))
    },

    // Enable / disable category
    toggle_category : function(category){
      if(category == 'ALL')
        this.$store.commit('clear_tx_categories');

      else
        this.$store.commit('toggle_tx_category', category)
    },

    // Enable / disable specified categories
    toggle_categories : function(categories){
      categories.forEach(function(category){
        this.toggle_category(category);
      }.bind(this))
    },

    // Return icon for specified category
    category_icon : function(category){
      const color = this.is_enabled(category) ? 'blue' : 'gray';
      const asset = category.replace(" ", "-")
                            .toLowerCase() +
                       "-" + color + '.svg';
      return require("../assets/txs/" + asset);
    }
  }
}
