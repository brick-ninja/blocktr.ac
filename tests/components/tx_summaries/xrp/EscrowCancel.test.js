describe("EscrowCancel", () => {
  describe("dom", () => {
    describe("amount is set", () => {
      test.todo("renders amount")
    })

    describe("amount is not set", () => {
      test.todo("renders sequence")
    })
  })

  describe("#computed", () => {
    describe("sequence", () => {
      test.todo("is tx_obj['OfferSequence']")
    })

    describe("escrow", () => {
      test.todo("is Escrow deleted fields")
    })

    describe("amount", () => {
      describe("escrow is null", () => {
        test.todo("is null")
      })

      test.todo("is escrow amount divided by DROPS_PER_XRP")
    })
  })
})
