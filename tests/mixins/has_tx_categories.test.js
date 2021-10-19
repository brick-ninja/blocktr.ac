describe("has_tx_categories", () => {
  describe("computed", () => {
    describe("#enabled_categories", () => {
      test.todo("returns store.tx_categoires")
    })

    describe("#primary_categoires", () => {
      test.todo("returns primary categories")
    })

    describe("#secondary_categories", () => {
      test.todo("returns secondary categories")
    })

    describe("#category_tallies", () => {
      test.todo("returns store.tx_category_tallies")
    })
  })

  describe("methods", () => {
    describe("#is_enabled", () => {
      describe("ALL", () => {
        describe("enabled_categories is empty", () => {
          test.todo("is true")
        })

        describe("enabled_categories is not empty", () => {
          test.todo("is false")
        })
      })

      describe("enabled_categories contains category", () => {
        test.todo("is true")
      })

      describe("enabled_categories does not contain category", () => {
        test.todo("is false")
      })
    })

    describe("#toggle_category", () => {
      describe("ALL", () => {
        test.todo("clears tx categories")
      })

      test.todo("toggles tx category")
    })

    describe("#toggle_categories", () => {
      test.todo("toggles each category")
    })

    describe("#category_icon", () => {
      test.todo("requires and returns icon for category")
    })
  })
})
