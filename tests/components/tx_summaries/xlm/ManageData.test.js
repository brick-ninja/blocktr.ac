describe("AccountMerge", () => {
  describe("dom", () => {
    test.todo("renders name")

    describe("deleted", () => {
      test.todo("renders 'Deleted'")
    })

    describe("!deleted", () => {
      test.todo("renders value_string")
    })
  })

  describe("computed", () => {
    describe("#op", () => {
      test.todo("is operation")
    })

    describe("#name", () => {
      test.todo("is op.dataName")
    })

    describe("#value", () => {
      test.todo("is op.dataValue")
    })

    describe("#value_string", () => {
      describe("value.toString() == ''", () => {
        test.todo("is typeof value")
      })

      test.todo("is value string")
    })

    describe("#deleted", () => {
      describe("value is undefined", () => {
        test.todo("is true")
      })

      describe("value is not undefined", () => {
        test.todo("is false")
      })
    })
  })
})
