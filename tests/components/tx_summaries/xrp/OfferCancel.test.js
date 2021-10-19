describe("EscrowCancel", () => {
  describe("dom", () => {
    describe("have offer", () => {
      describe("mq >= md", () => {
        test.todo("renders buy amount")
        test.todo("renders sell amount")
      })

      describe("mq < md", () => {
        test.todo("renders buy_sell_pair")
      })
    })

    describe("!have offer", () => {
      test.todo("renders sequence")
    })
  })

  describe("computed", () => {
    describe("#sequence", () => {
      test.todo("is tx_obj['OfferSequence']")
    })

    describe("#offer", () => {
      test.todo("is Offer deleted_fields")
    })

    describe("#has_offer", () => {
      describe("offer is null", () => {
        test.todo("is false")
      })

      describe("offer is not null", () => {
        test.todo("is true")
      })
    })

    describe("#gets", () => {
      test.todo("is offer['TakeGets']")
    })

    describe("#pays", () => {
      test.todo("is offer['TakePays']")
    })
  })
})
