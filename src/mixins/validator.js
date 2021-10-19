/*
 * A Validator component is one that defines the 'is_valid'
 * method which Validatable components are validated by.
 *
 * Validatable components should listen for the 'validated'
 * event on Validatable and invoke 'validate'.
 *
 * Used by forms to flag their containing modals whether
 * or not user input complies with semantic restrictions
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

export default {
  watch : {
    is_valid : function(){
      this.$emit('validated', this.is_valid)
    }
  }
}
