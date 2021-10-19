describe("Contact", () => {
  describe("dom", () => {
    describe("input", () => {
      describe("enter pressed", () => {
        test.todo("submits form")
      })

      test.todo("tied to email")
    })

    describe("have_email and email invalid", () => {
      test.todo("renders invalid_email")
    })

    describe("textarea", () => {
      describe("enter pressed", () => {
        test.todo("submits form")
      })

      test.todo("tied to inquiry")
    })

    describe("button", () => {
      describe("!is_valid", () => {
        test.todo("is disabled")
      })

      describe("clicked", () => {
        test.todo("submits form")
      })
    })
  })

  describe("computed", () => {
    describe("have_email", () => {
      describe("email != ''", () => {
        test.todo("is true")
      })

      describe("email == ''", () => {
        test.todo("is false")
      })
    })

    describe("is_email_valid", () => {
      describe("is_valid_email", () => {
        test.todo("is true")
      })

      describe("!is_valid_email", () => {
        test.todo("is false")
      })
    })

    describe("have_inquiry", () => {
      describe("inquiry != ''", () => {
        test.todo("is true")
      })

      describe("inquiry == ''", () => {
        test.todo("is false")
      })
    })

    describe("is_inquiry_valid", () => {
      test.todo("returns have_inquiry")
    })

    describe("is_valid", () => {
      describe("!is_email_valid", () => {
        test.todo("is false")
      })

      describe("!is_inquiry_valid", () => {
        test.todo("is false")
      })

      describe("is_email_valid && is_inquiry_valid", () => {
        test.todo("is true")
      })
    })
  })

  describe("methods", () => {
    describe("#submit", () => {
      describe("not valid", () => {
        test.todo("returns, does not submit request")
      })

      test.todo("submits contact request")

      describe("success response", () => {
        test.todo("alerts success")
      })

      describe("failure response", () => {
        test.todo("alerts error")
      })
    })
  })
})
