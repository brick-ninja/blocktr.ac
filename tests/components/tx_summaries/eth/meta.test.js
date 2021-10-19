describe("tx_summaries eth meta mixin", () => {
  describe("computed", () => {
    describe("hash", () => {
      test.todo("is tx.hash")
    })

    describe("formatted_date", () => {
      test.todo("formats tx.date")
    })

    describe("from", () => {
      test.todo("is tx.from")
    })

    describe("to", () => {
      test.todo("is tx.to")
    })

    describe("value", () => {
      test.todo("is parseInt(tx.value._hex)")
    })

    describe("data", () => {
      test.todo("is tx.data")
    })

    describe("mined", () => {
      describe("value == 0", () => {
        test.todo("is true")
      })

      describe("value != 0", () => {
        test.todo("is false")
      })
    })
  })
});
