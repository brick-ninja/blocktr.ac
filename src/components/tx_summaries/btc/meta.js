/*
 * Helper providing access to a local btc transaction specifics as
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

    time : function(){
      return this.tx.time;
    },

    formatted_time : function(){
      return this.$options.filters.moment(this.time, "YYYY-MM-DD HH:mm:ss");
    },

    inputs : function(){
      return this.tx.inputs;
    },

    input_addresses : function(){
      return this.inputs.map((i) => {return i.prev_out ? i.prev_out.addr : null})
                        .filter((a) => {return a != null})
    },

    mined : function(){
      return this.input_addresses.length == 0;
    },

    outputs : function(){
      return this.tx.out;
    },

    output_addresses : function(){
      return this.outputs.map((o) => o.addr)
                         .filter((a) => {return a != null})
    },

    total_out : function(){
      return this.tx.total_out;
    },

    fee : function(){
      return this.tx.fee;
    }
  }
}
