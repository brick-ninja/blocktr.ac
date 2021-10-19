describe("MainLayout", () => {
  describe("watch", () => {
    describe("active_blockchain", () => {
      test.todo("resets original blockchain network")
      test.todo("initializes network")
      test.todo("connects to network")

      describe("on account page", () => {
        test.todo("redirects to /txs")
      })

      describe("on tx page", () => {
        test.todo("redirects to /txs")
      })
    })
  })

  describe("#created", () => {
    describe("network not initialized", () => {
      test.todo("sets network initialized")
      test.todo("initializes network")
      test.todo("connects to network")
    })

    describe("network initialized", () => {
      test.todo("does not initialize network")
      test.todo("does not connect to network")
    })

    describe("auth_token set", () => {
      test.todo("loads user")
    })
  })
})
