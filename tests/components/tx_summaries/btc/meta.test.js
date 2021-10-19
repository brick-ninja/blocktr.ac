describe("tx_summaries btc meta mixin", () => {
  describe("computed", () => {
    describe("hash", () => {
      test.todo("is tx.hash")
    })

    describe("time", () => {
      test.todo("is tx.time")
    })

    describe("formatted_time", () => {
      test.todo("formats time")
    })

    describe("inputs", () => {
      test.todo("is tx.inputs")
    })

    describe("input_addresses", () => {
      test.todo("extracts prev_out.addr from inputs")

      describe("prev_out is null", () => {
        test.todo("does not return input")
      })
    })

    describe("mined", () => {
      describe("no input addresses", () => {
        test.todo("is true")
      })

      describe("input addresses exist", () => {
        test.todo("is false")
      })
    })

    describe("outputs", () => {
      test.todo("is tx.outputs")
    })

    describe("output_addresses", () => {
      test.todo("extracts non null addr from outputs")
    })

    describe("total_out", () => {
      test.todo("is tx.total_out")
    })

    describe("fee", () => {
      test.todo("is tx.fee")
    })
  })
});
