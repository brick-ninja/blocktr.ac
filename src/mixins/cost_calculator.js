/*
 * Cost calculator providing total cost for each membership
 * level incorporating additions / configurations
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

import ziti from "../config/ziti"

function compute(level){
  var cost;

  // Base cost
  if(level == this.membership_level)
    cost = 0;
  else
    cost = ziti.membership_features[level].cost;

  // Add in additional filters
  if(this.enable_additional_by_plan[level] && this.selected_additional_filters_by_plan[level])
    cost += this.selected_additional_filters_by_plan[level] * ziti.additions_cost.filters;

  // Add in additional sinks
  if(this.enable_additional_by_plan[level] && this.selected_additional_sinks_by_plan[level])
    cost += this.selected_additional_sinks_by_plan[level] * ziti.additions_cost.sinks;

  // Round to two decimal places
  cost = parseFloat(cost.toFixed(2))

  return cost;
}

export default {
  props : {
    plan : String
  },

  data : function(){
    return {
      total_cost : ziti.membership_levels.reduce(function(tc, level) {
                     tc[level] = 0;
                     return tc;
                   }, {}),

      enable_additional_by_plan : ziti.membership_levels.reduce(function(ea, level) {
                                    ea[level] = false;
                                    return ea;
                                  }, {}),

      selected_additional_filters_by_plan : ziti.membership_levels.reduce(function(saf, level) {
                                              saf[level] = 0;
                                              return saf;
                                            }, {}),

      selected_additional_sinks_by_plan : ziti.membership_levels.reduce(function(sas, level) {
                                            sas[level] = 0;
                                            return sas;
                                          }, {})
    }
  },

  computed: {
    // Helpers for when mixed into module defining 'plan',
    // allowing us to hone in on the level being purchased

    enable_additional : {
      get : function(){
        return this.enable_additional_by_plan[this.plan]
      },

      set : function(v){
        this.enable_additional_by_plan[this.plan] = v;
      }
    },

    selected_additional_filters : {
      get : function(){
        return this.selected_additional_filters_by_plan[this.plan]
      },

      set : function(v){
        this.selected_additional_filters_by_plan[this.plan] = v;
      }
    },

    selected_additional_sinks : {
      get : function(){
        return this.selected_additional_sinks_by_plan[this.plan]
      },

      set : function(v){
        this.selected_additional_sinks_by_plan[this.plan] = v;
      }
    }
  },

  watch : {
    selected_additional_filters : function(){
      this.recompute_total_cost();
    },

    selected_additional_sinks : function(){
      this.recompute_total_cost();
    }
  },

  methods : {
    recompute_total_cost : function(){
      this.total_cost = ziti.membership_levels.reduce(function(costs, level){
        costs[level] = compute.bind(this)(level);
        return costs;
      }.bind(this), {});

      if(this.plan)
        this.total_cost = this.total_cost[this.plan]
    }
  },

  created : function(){
    this.recompute_total_cost();
  }
}
