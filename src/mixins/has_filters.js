/*
 * Helper providing access to local filters / filters status.
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

export default {
  computed : {
    // Return filters retrieved from server
    filters : function(){
      return this.$store.state.filters;
    },

    // Returns number of remaining filters user is authorized
    // to create.
    remaining_filters : function(){
      return this.authorized_filters - this.filters.length;
    },

    // Return user-friendly message indicating remaining
    // filters left.
    remaining_filters_msg : function(){
      const remaining = this.remaining_filters;

      if(remaining == 1)
        return "1 filter is left. ";

      return remaining + " filters are left. ";
    }
  }
}
