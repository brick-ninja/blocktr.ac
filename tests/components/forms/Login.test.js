describe("Login", () => {
  describe("dom", () => {
    describe("form", () => {
      test.todo("defaults to a noop")
    });

    describe("email input", () => {
      describe("enter event", () => {
        test.todo("emits submit")
      })

      test.todo("tied to auth_email")
    })

    describe("password input", () => {
      describe("enter event", () => {
        test.todo("emits submit")
      })

      test.todo("tied to password")
    })

    describe("#forgot_password", () => {
      test.todo("launches forgot_password_modal")
    })
  })

  describe("computed", () => {
    describe("#is_valid", () => {
      describe("!have_email", () => {
        test.todo("is false")
      })

      describe("!have_password", () => {
        test.todo("is false")
      })

      describe("have_email && have_password", () => {
        test.todo("is true")
      })
    })
  })

  describe("methods", () => {
    describe("#submit", () => {
      test.todo("clicks submit button")
      test.todo("logs in")
    })
  })

  describe("#created", () => {
    describe("maintenance_mode and not maintenance page", () => {
      test.todo("navs to maintenance page")
    })
  })
})
