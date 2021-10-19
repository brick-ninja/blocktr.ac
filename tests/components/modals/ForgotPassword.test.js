describe("ForgotPassword", () => {
  describe("dom", () => {
    describe("modal", () => {
      describe("shown event", () => {
        test.todo("calls show")
      })

      describe("ok event", () => {
        test.todo("calls reset_password")
      })

      describe("!is_valid", () => {
        test.todo("disables ok")
      })
    })
  })

  describe("methods", () => {
    describe("#reset_password", () => {
      test.todo("calls reset_password on form")
    })

    describe("#submit", () => {
      describe("is_valid", () => {
        test.todo("resets password")
        test.todo("hides reset password modal")
      })

      describe("!is_valid", () => {
        test.todo("does nothing / does not reset password")
      })
    })

    describe("#shown", () => {
      test.todo("resets validity")
      test.todo("focuses on form email input")
    })
  })
})
