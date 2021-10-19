/*
 * Top level Media Query imports and definitions.
 * Defines responsive breakpoints and helper methods.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import VueMq from 'vue-mq'

// From bootstrap:
// xs - 0 on up
// sm - 576 on up
// md - 768 on up
// lg - 992 on up
// xl - 1200 on up
//
// vue-mq defines upper-bound of media-query
// range hence levels are shifted
export const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: Infinity
};

// Media query initialization routine
export function vue_init(Vue){
  Vue.use(VueMq, {
    breakpoints
  })

  // Custom mixin to define mq helpers
  // lt  = less than
  // lte = less than or equal
  // gt  = greater than
  // gte = greater than or equal
  Vue.mixin({
    computed : {
      mq_xs : function(){
        return this.$mq == 'xs';
      },

      mq_gt_xs : function(){
        return this.$mq != 'xs';
      },

      mq_sm : function(){
        return this.$mq == 'sm';
      },

      mq_lt_sm : function(){
        return this.$mq == 'xs';
      },

      mq_lte_sm : function(){
        return ['xs', 'sm'].includes(this.$mq);
      },

      mq_gt_sm : function(){
        return ['md', 'lg', 'xl'].includes(this.$mq);
      },

      mq_gte_sm : function(){
        return ['sm', 'md', 'lg', 'xl'].includes(this.$mq);
      },

      mq_md : function(){
        return this.$mq == 'md';
      },

      mq_lt_md : function(){
        return ['xs', 'sm'].includes(this.$mq);
      },

      mq_lte_md : function(){
        return ['xs', 'sm', 'md'].includes(this.$mq);
      },

      mq_gt_md : function(){
        return ['lg', 'xl'].includes(this.$mq);
      },

      mq_gte_md : function(){
        return ['md', 'lg', 'xl'].includes(this.$mq);
      },

      mq_lg : function(){
        return this.$mq == 'lg';
      },

      mq_lt_lg : function(){
        return ['xs', 'sm', 'md'].includes(this.$mq);
      },

      mq_lte_lg : function(){
        return ['xs', 'sm', 'md', 'lg'].includes(this.$mq);
      },

      mq_gt_lg : function(){
        return this.$mq == 'xl';
      },

      mq_gte_lg : function(){
        return ['lg', 'xl'].includes(this.$mq);
      },

      mq_xl : function(){
        return this.$mq == 'xl';
      },

      mq_lt_xl : function(){
        return this.$mq != 'xl';
      }
    },

    methods : {
      mq_in : function(mq){
        return mq.includes(this.$mq);
      }
    }
  })
}
