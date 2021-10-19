describe("creates_filter", () => {
  describe("methods", () => {
    describe("on_ok", () => {
      describe("!logged_in", () => {
        test.todo("sets in progress filter")
        test.todo("launches register modal")
      })

      describe("logged_in", () => {
        test.todo("creates filter")
      })
    })

    describe("#create_filter", () => {
      test.todo("submits create_filter request")

      describe("success response", () => {
        test.todo("emits created event")
      })

      describe("failure response", () => {
        test.todo("alerts err")
      })
    })
  })
})
