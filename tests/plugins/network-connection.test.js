describe("network-connection plugin", () => {
  test.todo("initializes network variables")

  describe("#_module", () => {
    test.todo("returns the module for the active_blockchain")
    describe("blockchain specified", () => {
      test.todo("returns the module for the specified blockchain")
    })
  })

  describe("#_call_connected_callbacks", () => {
    test.todo("copies connected callbacks")
    test.todo("invokes callbacks")
  })

  describe("#_call_disconnected_callbacks", () => {
    test.todo("copies disconnected callbacks")
    test.todo("invokes callbacks")
  })

  describe("#network_init", () => {
    test.todo("sets vue instance on network variables")
    test.todo("invokes module init method")
  })

  describe("#network.reset", () => {
    test.todo("clears connected callbacks")
    test.todo("clears disconnected callbacks")
    test.todo("invokes blockchain module reset method")
  })

  describe("#network.connect", () => {
    test.todo("invokes module connect method")
  })

  describe("#network.is_connected", () => {
    describe("network is connected", () => {
      test.todo("returns true")
    })

    describe("network is not connected", () => {
      test.todo("returns false")
    })
  })

  describe("#network.on_connection", () => {
    test.todo("pushes connection callback")

    describe("network is connected", () => {
      test.todo("invokes callback")
    })
  })

  describe("#network.on_disconnection", () => {
    test.todo("pushes disconnection callback")

    describe("network is not connected", () => {
      test.todo("invokes callback")
    })
  })

  describe("#network.off_connection", () => {
    test.todo("removes connection callback")

    describe("connection callback not resgistered", () => {
      test.todo("does nothing")
    })
  })

  describe("#network.off_disconnection", () => {
    test.todo("removes disconnection callback")

    describe("disconnection callback not resgistered", () => {
      test.todo("does nothing")
    })
  })

  describe("#network.is_valid_address", () => {
    test.todo("calls module validate_address")
  })

  describe("#network.account", () => {
    test.todo("registers on_connection callback")

    describe("in on_connection callback", () => {
      test.todo("removes callback")
      test.todo("calls module retrieve_account")
    })
  })

  describe("#network.tx", () => {
    test.todo("registers on_connection callback")

    describe("in on_connection callback", () => {
      test.todo("removes callback")
      test.todo("calls module retrieve_tx")
    })
  })

  describe("#network.stream_txs", () => {
    test.todo("registers on_connection callback")

    describe("in on_connection callback", () => {
      test.todo("removes callback")
      test.todo("calls module stream_txs")
    })
  })

  describe("#network.stop_streaming_txs", () => {
    test.todo("registers on_connection callback")

    describe("in on_connection callback", () => {
      test.todo("removes callback")
      test.todo("calls module stop_streaming_txs")
    })
  })
})
