describe("tx_summaries xlm operations helpers", () => {
  describe("#all", () => {
    test.todo("returns all operation")
    describe("no operations", () => {
      test.todo("returns an empty array")
    })
  })

  describe("#types", () => {
    test.todo("return _type of all operations")
  })

  describe("#first_operation_of_type", () => {
    test.todo("returns first operation of specified type")
  })

  describe("#prioritized", () => {
    test.todo("prioritizes payment 1st")
    test.todo("prioritizes paymentPathStringSend 2nd")
    test.todo("prioritizes paymentPathStringReceive 3rd")
    test.todo("prioritizes manageBuyOffer 4th")
    test.todo("prioritizes manageSellOffer 5th")
    test.todo("prioritizes createPassiveSellOffer 6th")
    test.todo("prioritizes allowTrust 7th")
    test.todo("prioritizes changeTrust 8th")
    test.todo("prioritizes first operation 9th")
  })
});
