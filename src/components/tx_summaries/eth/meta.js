/*
 * Helper providing access to a local eth transaction specifics as
 * a property param to the component including this mixin.
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

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

    formatted_date : function(){
      return this.$options.filters.moment(this.tx.date, "YYYY-MM-DD HH:mm:ss");
    },

    from : function(){
      return this.tx.from;
    },

    to : function(){
      return this.tx.to;
    },

    value : function(){
      return parseInt(this.tx.value._hex);
    },

    data : function(){
      return this.tx.data;
    },

    smart_contract : function(){
      return this.value == 0;
    }
  }
}
