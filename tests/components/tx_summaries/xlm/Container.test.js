describe("XLMTxContainer", () => {
  describe("dom", () => {
    describe("success is true", () => {
      test.todo("renders success icon")
    })

    describe("success is not true", () => {
      test.todo("renders failed icon")
    })

    test.todo("renders formatted date")
    test.todo("renders short operation type")

    describe("multiple operations", () => {
      test.todo("renders N - 1 operations")
    })
  })

  describe("computed", () => {
    describe("#tx_icon", () => {
      test.todo("is icon corresponding to tx_category & success status")
    })
  })

  describe("methods", () => {
    describe("#nav_to_tx", () => {
      test.todo("redirects to /:active_blockchain/tx/:hash")
    })
  })
})
