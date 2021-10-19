describe("xrp network-connection module", () => {
  describe("#prepare_static_tx", () => {
    test.todo("converts and wraps tx")
  })

  describe("#prepare_streamed_tx", () => {
    test.todo("wraps tx")
    test.todo("sets category on prepared tx")
    test.todo("sets hash on prepared tx")
  })

  describe("#convert_tx", () => {
    test.todo("wraps tx in transaction object")
    test.todo("moves meta to the top level object and deletes it from transaction")
  })

  describe("#init", () => {
    test.todo("instantiates the ripple_api")
    describe("on error", () => {
      test.todo("sets connected to false")
      test.todo("calls disconnect callbacks")
      test.todo("throttes connection")
    })
  })

  describe("#reset", () => {
    test.todo("stops streaming transactions")
    test.todo("disconnects from ripple api")
    test.todo("sets connected to false")
  })

  describe("#connect", () => {
    test.todo("connects to ripple api")
    test.todo("sets connected to true")
    test.todo("calls connected callbacks")

    describe("error connecting", () => {
      test.todo("throttles connection")
    })
  })

  describe("#throttle_connection", () => {
    describe("connecting", () => {
      test.todo("does nothing")
    })

    test.todo("sets connecting to true")
    test.todo("starts second timer")

    describe("on timer", () => {
      test.todo("sets connecting to false")
      test.todo("calls connect")
    })
  })

  describe("#validate_address", () => {
    test.todo("returns ripple_api.isValidAddress")
  })

  describe("#retrieve_account", () => {
    test.todo("invokes ripple_api.getAccountInfo")

    describe("account retrieved", () => {
      test.todo("invokes callback with account object")
      test.todo("sets balance")
      test.todo("sets sequence")
      test.todo("sets previous_txn")
    })
  })

  describe("#retrieve_tx", () => {
    test.todo("invokes ripple_api.request('tx')")
    test.todo("invokes callback w/ prepared tx")
  })

  describe("#stream_tx", () => {
    test.todo("removes transaction callback")
    test.todo("sets transaction callback")

    describe("transaction callback", () => {
      test.todo("prepared tx")
      test.todo("freezes prepared tx")
      test.todo("invokes callback with prepared tx")
    })

    test.todo("subscribes to ripple_api transaction stream")
  })

  describe("#stop_streaming_txs", () => {
    test.todo("removes transaction callback")
    test.todo("nullifies transaction callback")
    test.todo("unsubscribes to ripple_api transaction stream")
  })
})
