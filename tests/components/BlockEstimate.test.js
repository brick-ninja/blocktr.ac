describe("BlockEstimate", () => {
  describe("dom", () => {
    test.todo("renders txs.length")
    test.todo("active_blockchain_upper")
    describe("#block_estimate_time", () => {
      test.todo("renders estimated time remaining in whole seconds")
      describe("estimated_time_elapsed", () => {
        test.todo("contains the .elapsed class")
      })
      describe("estimated_time_soon", () => {
        test.todo("contains the .soon class")
      })
    })
  })

  describe("computed", () => {
    describe("txs", () => {
      test.todo("is store.state.txs")
    })

    describe("estimated_time_elapsed", () => {
      describe("estmated_time_remaining < 0", () => {
        test.todo("is true")
      })

      describe("estmated_time_remaining >= 0", () => {
        test.todo("is false")
      })
    })

    describe("estimated_time_soon", () => {
      describe("estmated_time_remaining < one minute", () => {
        test.todo("is true")
      })

      describe("estmated_time_remaining >= on minute", () => {
        test.todo("is false")
      })
    })
  })

  describe("#created", () => {
    test.todo("syncs network next_block_time")
    test.todo("calculates esimated time")
    test.todo("starts interval to sync network block_time and calculate estimated time")
  })

  describe("#destroyed", () => {
    test.todo("clears estimated_time interval")
  })
})
