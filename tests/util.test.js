import setup from './setup'
import util  from '../src/util'
import ziti  from '../src/config/ziti'

describe("util", () => {
  describe("#round_value", () => {
    it("defaults to 0", () => {
      expect(util.round_value()).toBe(0)
    })

    describe("decimals == 0", () => {
      it("rounds value to integer", () => {
        expect(util.round_value(4.2, 0)).toBe(4)
      })
    })

    describe("decimals is not set", () => {
      describe("value < 0.0001", () => {
        it("rounds value to 10 decimal places", () => {
          expect(util.round_value(0.00001234567)).toBe(0.0000123457)
        })
      })

      describe("value >= 0.0001", () => {
        it("rounds value to 5 decimal places", () => {
          expect(util.round_value(0.123456)).toBe(0.12346)
        })
      })
    })

    it("rounds value to specified number of decimal places", () => {
      expect(util.round_value(1.2345, 3)).toBe(1.235)
    })
  })

  describe("#why_code_unsafe", () => {
    describe("code could not be parsed", () => {
      test.todo("returns 'invalid code'")
    })

    describe("FunctionExpression present", () => {
      test.todo("returns 'has_function'")
    })

    describe("ArrowFunctionExpression present", () => {
      test.todo("returns 'has_function'")
    })

    describe("FunctionDeclaration present", () => {
      test.todo("returns 'has_function'")
    })

    describe("DoWhileStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("ForStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("ForInStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("ForOfStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("WhileStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("CallExpression present (not parseInt or parseFloat)", () => {
      test.todo("returns 'has_call'")
    })

    describe("parseInt present", () => {
      test.todo("does not return 'has_call'")
    })

    describe("parseFloat present", () => {
      test.todo("does not return 'has_call'")
    })

    test.todo("returns empty object")
  })

  describe("#why_jsonpath_unsafe", () => {
    describe("filter_expression unsafe", () => {
      test.todo("returns why_code_unsafe")
    })

    describe("script_expression unsafe", () => {
      test.todo("returns why_code_unsafe")
    })

    it("returns empty object", () => {
      expect(util.why_jsonpath_unsafe('$.foo.bar')).toEqual({})
    })
  })

  describe("#delim_value", () => {
    it("returns delimiated value", () => {
      expect(util.delim_value(123456789.123)).toBe("123,456,789.123")
    })
  })

  describe("#abbrev", () => {
    it("returns abbreviated value", () => {
      expect(util.abbrev(2345000000000)).toEqual("2.35T")
      expect(util.abbrev(2345000000)).toEqual("2.35B")
      expect(util.abbrev(2345000)).toEqual("2.35M")
      expect(util.abbrev(2345)).toEqual("2.35K")
      expect(util.abbrev(234.56)).toEqual("234.56")
    })
  })

  describe("#ledger_time_to_unix", () => {
    it("converts ledger time to unix time", () => {
      expect(util.ledger_time_to_unix(1)).toEqual(946684801000)
    })
  })

  describe("#hex_to_ascii", () => {
    it("converts hex integer value to ascii text", () => {
      expect(util.hex_to_ascii("4C445A")).toBe("LDZ")
    })
  })

  describe("#capitalize", () => {
    it("returns capitalized string", () => {
      expect(util.capitalize("abc")).toEqual("Abc")
    })
  })

  describe("#wrap_tx", () => {
    it("wraps tx in top level transaction object", () => {
      expect(util.wrap_tx("tx")).toEqual({transaction: "tx"})
    })
  })

  describe("#is_valid_jsonpath", () => {
    describe("jsonpath can be parsed", () => {
      it("returns true", () => {
        expect(util.is_valid_jsonpath('$.foo.bar')).toBe(true)
      })
    })

    describe("jsonpath cannot be parsed", () => {
      it("returns false", () => {
        expect(util.is_valid_jsonpath({})).toBe(false)
      })
    })
  })

  describe("#is_valid_jsonpath_length", () => {
    describe("jsonpath <= ziti.max_jsonpath_length", () => {
      it("returns true", () => {
        expect(util.is_valid_jsonpath_length('$.foo.bar')).toBe(true)
      })
    })

    describe("jsonpath > ziti.max_jsonpath_length", () => {
      it("returns false", () => {
        let test_string = ''
        for(var i=0; i<ziti.max_jsonpath_length+1; i++){
          test_string += Math.random()
        }
        expect(util.is_valid_jsonpath_length(test_string)).toBe(false)
      })
    })
  })

  describe("#is_valid_email", () => {
    describe("email is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_email("test@email.com")).toBe(true)
      })
    })

    describe("email is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_email("test")).toBe(false)
        expect(util.is_valid_email("test@cc")).toBe(false)
      })
    })
  })

  describe("#is_valid_sms", () => {
    describe("sms is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_sms("12312312342")).toBe(true)
      })
    })

    describe("sms is not valid", () => {
      expect(util.is_valid_sms("12312312341212")).toBe(false);
      expect(util.is_valid_sms("test")).toBe(false)
    })
  })

  describe("#is_valid_url", () => {
    describe("url is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_url("https://test.com")).toBe(true)
      })
    })

    describe("url is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_url("localhost:3000")).toBe(false)
        expect(util.is_valid_url("https://localhost:3000")).toBe(false)
      })
    })
  })

  describe("#is_valid_integer", () => {
    describe("integer is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_integer(4)).toBe(true)
      })
    })

    describe("integer is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_integer("4")).toBe(false)
        expect(util.is_valid_integer(4.2)).toBe(false)
      })
    })
  })

  describe("#is_valid_float", () => {
    describe("float is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_float(4.2)).toBe(true)
      })
    })

    describe("float is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_float("4.2")).toBe(false)
      })
    })
  })

  describe("#is_valid_string", () => {
    describe("string is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_string("abc")).toBe(true)
      })
    })

    describe("string is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_string(4.2)).toBe(false)
      })
    })
  })

  describe("#is_valid_credit_card_number", () => {
    describe("credit_card_number is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_credit_card_number(1234123412341234)).toBe(true)
      })
    })

    describe("credit_card_number is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_credit_card_number()).toBe(false)
        expect(util.is_valid_credit_card_number(123123123)).toBe(false)
      })
    })
  })

  describe("#is_valid_credit_card_cvc", () => {
    describe("credit_card_cvc is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_credit_card_cvc(123)).toBe(true)
      })
    })

    describe("credit_card_cvc is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_credit_card_cvc()).toBe(false)
        expect(util.is_valid_credit_card_cvc(12)).toBe(false)
      })
    })
  })

  describe("#is_jsonpath_unsafe", () => {
    describe("jsonpath is unsafe", () => {
      test.todo("returns true")
    })

    describe("jsonpath is safe", () => {
      it("returns false", () => {
        expect(util.is_jsonpath_unsafe('$.foo.bar')).toBe(false)
      })
    })
  })

  describe("#is_jsonpath_complex", () => {
    describe("jsonpath is complex", () => {
      test.todo("returns true")
    })

    describe("jsonpath is not complex", () => {
      it("returns false", () => {
        expect(util.is_jsonpath_complex('$.foo.bar')).toBe(false)
      })
    })
  })

  describe("#filter_matcher", () => {
    describe("template based filter", () => {
      test.todo("returns constructed jsonpath")
    })

    test.todo("returns jsonpath")
  })
})
