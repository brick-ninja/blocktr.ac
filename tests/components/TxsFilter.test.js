describe("TxsFilter", () => {
  describe("dom", () => {
    describe("input", () => {
      test.todo("is tied to expression")
    })

    describe("mq > md", () => {
      test.todo("renders TxsFilterControls")
    })

    describe("SaveFilterModal", () => {
      describe("created event", () => {
        test.todo("load_filters")
      })
    })

    describe("invalid", () => {
      test.todo("renders 'Invalid Expression'")
    })
  })

  describe("computed", () => {
    describe("#store_filter", () => {
      test.todo("gets store.tx_filter")
      test.todo("updates tx filter")
    })

    describe("#invalid", () => {
      describe("expression is not valid", () => {
        test.todo("returns true")
      })

      describe("expression is valid", () => {
        test.todo("returns false")
      })
    })

    describe("#save_filter", () => {
      test.todo("returns jsonpath expression")
    })
  })

  describe("watch", () => {
    describe("expression", () => {
      describe("!invalid", () => {
        test.todo("assigns store_filter")
      })

      describe("invalid", () => {
        test.todo("does not assign store_filter")
      })
    })

    describe("store_filter", () => {
      test.todo("assigns store_filter to expression")
    })
  })

  describe("#created", () => {
    describe("store_filter is set", () => {
      test.todo("assigns store_filter to expression")
    })
  })
})
