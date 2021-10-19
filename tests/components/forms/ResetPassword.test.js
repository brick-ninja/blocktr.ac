describe("ResetPassword", () => {
  describe("dom", () => {
    describe("tr[1]", () => {
      describe("input", () => {
        test.todo("is tied to auth_password")
      })

      describe(".form_error", () => {
        describe("weak password", () => {
          test.todo("renders 'Weak password'")
        })
      })
    })

    describe("tr[3]", () => {
      describe("input", () => {
        test.todo("is tied to auth_password_confirm")
      })

      describe(".form_error", () => {
        describe("password_mismatch", () => {
          test.todo("renders 'Passwords do not match'")
        })
      })
    })
  })

  describe("computed", () => {
    describe("#is_valid", () => {
      describe("!have_passwords", () => {
        test.todo("is false")
      })

      describe("invalid_passwords", () => {
        test.todo("is false")
      })

      describe("have_passwords && !invalid_passwords", () => {
        test.todo("is true")
      })
    })
  })
})
