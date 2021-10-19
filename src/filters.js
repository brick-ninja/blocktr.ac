/*
 * VueJS text formatting filters
 * Note: These define filters in the context of vuejs and not
 * the Blockchain Tracker (eg text formatters vs transaction processors)
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

import util from './util';

// Filters initialization routine
export function vue_init(Vue){
  // Deliminate the value
  Vue.filter('delim', function(value) {
    return util.delim_value(value);
  });

  // Round the decimal to the given place
  Vue.filter('round', function(value, decimals) {
    return util.round_value(value, decimals);
  });

  // Returns abbreviated numeric representation
  Vue.filter('abbrev', function(value, decimals){
    return util.abbrev(value, decimals)
  })

  // Return string as is if < length, else truncate and add ellipsis
  Vue.filter("ellipsis", function(value, length){
    if(!length || value.length <= length)
      return value;

    return value.substr(0, length) + "...";
  })
}
