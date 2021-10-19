describe("PaymentChannelClaim", () => {
  describe("dom", () => {
    describe("has_amount", () => {
      test.todo("renders amount")
    })

    describe("has_amount && has_balance", () => {
      test.todo("renders amount/balance")
    })

    describe("has_balance", () => {
      test.todo("renders balance")
    })

    describe("renewed", () => {
      test.todo("renders 'Renewed'")
    })

    describe("closed", () => {
      test.todo("renders 'Closed'")
    })
  })

  describe("computed", () => {
    describe("amount", () => {
      test.todo("is tx_obj['Amount']")
    })

    describe("has_amount", () => {
      describe("amount is null", () => {
        test.todo("is false")
      })

      describe("amount is not null", () => {
        test.todo("is true")
      })
    })

    describe("balance", () => {
      test.todo("is tx_obj['Balance']")
    })

    describe("has_balance", () => {
      describe("balance is null", () => {
        test.todo("is false")
      })

      describe("balance is not null", () => {
        test.todo("is true")
      })
    })

    describe("flags", () => {
      test.todo("is tx_obj['Flags']")
    })

    describe("renewed", () => {
      describe("renewed flag is set", () => {
        test.todo("is true")
      })

      describe("renewed flag is not set", () => {
        test.todo("is false")
      })
    })

    describe("closed", () => {
      describe("closed flag is set", () => {
        test.todo("is true")
      })

      describe("closed flag is not set", () => {
        test.todo("is false")
      })
    })
  })
})
