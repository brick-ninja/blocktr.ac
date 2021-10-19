describe("TrustSet", () => {
  describe("dom", () => {
    describe("mq >= md", () => {
      test.todo("renders issuer")
    })

    describe("!revoked", () => {
      test.todo("renders CurrencyAmount")
    })
  })

  describe("computed", () => {
    describe("#limit_amount", () => {
      test.todo("is tx_obj['LimitAmount']")
    })

    describe("#issuer", () => {
      test.todo("is limit_amount['issuer']")
    })

    describe("#value", () => {
      test.todo("is limit_amount['value']")
    })

    describe("#currency", () => {
      test.todo("is limit_amount['currency']")
    })

    describe("#revoked", () => {
      describe("value == 0", () => {
        test.todo("is true")
      })

      describe("value != 0", () => {
        test.todo("is false")
      })
    })
  })
})
