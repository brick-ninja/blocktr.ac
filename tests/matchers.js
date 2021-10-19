// Custom Jest Matchers

expect.extend({
  // Checks the existance of the specified component
  toExist : function(received){
    const pass = received.exists();
    const message = pass ? () => this.utils.printReceived(received) + " exists" :
                           () => this.utils.printReceived(received) + " does not exist";

    return {
      message,
      pass
    }
  },

  // Checks the visibility of the specified component
  // XXX: would like to use jest-dom but that checks for inclusion in the document:
  // https://github.com/testing-library/jest-dom#tobevisible
  // TODO: add other visibility conditions from that
  toBeVisible : function(received){
    const pass = received.element.style.getPropertyValue('display') != 'none';
    const message = pass ? () => this.utils.printReceived(received) + " is visible" :
                           () => this.utils.printReceived(received) + " is not visible";
    return {
      message,
      pass
    }
  },

  // Checks if specified component is disabled
  toBeDisabled : function(received){
    const pass = received.attributes('disabled') == "disabled";
    const message = pass ? () => this.utils.printReceived(received) + " is disabled" :
                            () => this.utils.printReceived(received) + " is not disabled";

    return {
      message,
      pass
    }
  },

  // Checks if specified component is checked
  toBeChecked : function(received){
    const pass = !!received.element.checked;
    const message = pass ? () => this.utils.printReceived(received) + " is checked" :
                            () => this.utils.printReceived(received) + " is not checked";

    return {
      message,
      pass
    }
  },

  // Checks if the specified value is rounded to the specified number of decimal places
  toBeRoundedTo : function(received, decimals){
    const pass = received.toString().split('.')[1].length == decimals;
    const message = pass ? () => received.toString() + " is rounded to " + decimals + " decimal places" :
                           () => received.toString() + " is not rounded to " + decimals + " decimal places";

    return {
      message,
      pass
    }
  },

  // Checks if specified object is of give type
  toBeA : function(received, type){
    const pass = received.constructor == type;
    const message = pass ? () => received.toString() + " is a " + type :
                           () => received.toString() + " is not a " + type;

    return {
      message,
      pass
    }
  }
})
