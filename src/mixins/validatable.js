/*
 * A Validatable component is one that is validated by a
 * Validator component.
 *
 * Validator components will emit the 'validated' event which
 * Validatable components shoulds handle dispatching to
 * the local 'validate' method.
 *
 * Used by modals to wait for semantically acceptable user input
 * before permitting confirmations / server side submission.
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

export default {
  data : function(){
    return {
      is_valid : false
    }
  },

  methods : {
    reset_validity: function(){
      this.is_valid = false
    },

    validate : function(validated){
      this.is_valid = validated;
    }
  }
}
