describe("Registration", () => {
  describe("dom", () => {
    describe("tr[0]", () => {
      describe("input", () => {
        test.todo("is tied to auth_email")
      })

      describe(".form_error", () => {
        describe("invalid_email", () => {
          test.todo("Renders 'Invalid Email'")
        })
      })
    })

    describe("tr[1]", () => {
      describe("input", () => {
        test.todo("is tied to auth_password")
      })

      describe(".form_error", () => {
        describe("weak_password", () => {
          test.todo("Renders 'Weak password'")
        })
      })
    })

    describe("tr[2]", () => {
      describe("input", () => {
        test.todo("is tied to auth_password_confirm")
      })

      describe(".form_error", () => {
        describe("password_mismatch", () => {
          test.todo("Renders 'Passwords do not match'")
        })
      })
    })

    describe("tr[2]", () => {
      describe("checkbox", () => {
        test.todo("is tied to tos_agree")
      })
    })
  })

  describe("computed", () => {
    describe("#is_valid", () => {
      describe("!have_email", () => {
        test.todo("is false")
      })

      describe("invalid_email", () => {
        test.todo("is false")
      })

      describe("!have_passwords", () => {
        test.todo("is false")
      })

      describe("invalid_passwords", () => {
        test.todo("is false")
      })

      describe("!tos_agree", () => {
        test.todo("is false")
      })

      describe("have_email && !invalid_email && have_passwords && !invalid_passwords && tos_agree", () => {
        test.todo("is true")
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode and not maintenance page", () => {
      test.todo("navs to maintenance page")
    })
  })
})
