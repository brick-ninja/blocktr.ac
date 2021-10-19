describe("CreateSink", () => {
  describe("dom", () => {
    test.todo("renders type_text")

    describe("input", () => {
      test.todo("tied to target")
    })

    describe("!have_target", () => {
      test.todo("renders type_text 'is required'")
    })

    describe("!valid_target", () => {
      test.todo("renders type_text 'is invalid'")
    })
  })

  describe("computed", () => {
    describe("#type_text", () => {
      test.todo("is capitalized type")
    })

    describe("#have_target", () => {
      describe("target != ''", () => {
        test.todo("is true")
      })

      describe("target == ''", () => {
        test.todo("is false")
      })
    })

    describe("#valid_target", () => {
      describe("type == email", () => {
        describe("valid email", () => {
          test.todo("is true")
        })

        describe("invalid email", () => {
          test.todo("is false")
        })
      })

      describe("type == sms", () => {
        describe("valid sms", () => {
          test.todo("is true")
        })

        describe("invalid sms", () => {
          test.todo("is false")
        })
      })

      describe("type == webhook", () => {
        describe("valid webhook", () => {
          test.todo("is true")
        })

        describe("invalid webhook", () => {
          test.todo("is false")
        })
      })

      describe("other type", () => {
        test.todo("throws error")
      })
    })

    describe("#is_valid", () => {
      describe("!have_target", () => {
        test.todo("is false")
      })

      describe("!valid_target", () => {
        test.todo("is false")
      })

      test.todo("is true")
    })
  })
})
