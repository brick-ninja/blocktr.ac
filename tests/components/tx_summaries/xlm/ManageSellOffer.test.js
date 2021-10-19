describe("ManageSellOffer", () => {
  describe("dom", () => {
    describe("deleted", () => {
      test.todo("renders 'Deleted'")
    })

    describe("mq >= md", () => {
      test.todo("renders buying currency amount")
      test.todo("renders selling currency amount")
    })

    describe("mq < md", () => {
      test.todo("renders buying/selling currency")
    })
  })

  describe("computed", () => {
    describe("#op", () => {
      test.todo("is operation")
    })

    describe("#selling", () => {
      test.todo("is op.selling")
    })

    describe("#buying", () => {
      test.todo("is op.buying")
    })

    describe("#amount", () => {
      test.todo("is op.amount / STROOPS_PER_XLM")
    })

    describe("#deleted", () => {
      describe("amount == 0", () => {
        test.todo("is true")
      })

      describe("amount != 0", () => {
        test.todo("is false")
      })
    })

    describe("#price", () => {
      test.todo("is op.price")
    })

    describe("#buying_amount", () => {
      test.todo("is amount * price")
    })
  })
})
