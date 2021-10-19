describe("eth network-connection module", () => {
  describe("#prepare_static_tx", () => {
    test.todo("returns wrapped tx")
  })

  describe("#prepare_streamed_tx", () => {
    test.todo("returns wrapped tx")
    test.todo("sets hash on top level transaction object")
  })

  describe("#reset", () => {
    test.todo("stops streaming transactions")
    test.todo("sets connected to false")
  })

  describe("#connect", () => {
    test.todo("instantiates JsonRpcProvider")
    test.todo("sets connected to true")

    describe("provider error", () => {
      test.todo("sets connected to false")
      test.todo("calls disconnected callbacks")
      test.todo("throttles connection")
    })

    describe("provider closed", () => {
      test.todo("sets connected to false")
      test.todo("calls disconnected callbacks")
      test.todo("throttles connection")
    })
  })

  describe("#throttle_connection", () => {
    describe("connecting", () => {
      test.todo("noops / does not connect")
    })

    test.todo("sets connecting to true")
    test.todo("starts connection timeout")

    describe("on connection timeout", () => {
      test.todo("sets connecting to false")
      test.todo("invokes connect")
    })
  })

  describe("#validate_address", () => {
    describe("valid eth address", () => {
      test.todo("returns true")
    })

    describe("invalid eth address", () => {
      test.todo("returns true")
    })
  })

  describe("#retrieve_account", () => {
    test.todo("gets balance for specified account from network")
    test.todo("gets sequence for specified account from network")

    describe("balance and sequence retrieved retrieved", () => {
      test.todo("invokes callback with account object")
      test.todo("sets balance")
      test.todo("sets sequence")
    })
  })

  describe("#retrieve_tx", () => {
    test.todo("gets specified transaction from network")
    test.todo("invokes callback w/ prepared tx")
  })

  describe("#next_block_time", () => {
    test.todo("returns _next_block_time")
  })

  describe("#sync_block_interval", () => {
    test.todo("gets block interval")
    describe("#retrieved block interval", () => {
      test.todo("sets block_interval and next_block_time")
    })
  })

  describe("#get_latest_txs", () => {
    test.todo("invokes callback w/ prepared/frozen block transactions")
  })

  describe("#subscribe_to_blocks", () => {
    describe("on block", () => {
      test.todo("gets specified block w/ transactions from the network")
      describe("retrieved block w/ transactions", () => {
        test.todo("get_latest_txs")
      })
    })
  })

  describe("#stream_txs", () => {
    test.todo("subscribes to blocks")
    test.todo("syncs block interval")
    //test.todo("starts sync block interval interval")
  })

  describe("#stop_streaming_txs", () => {
    test.todo("unsubscribes t blocks")
    test.todo("clears block interval poll interval")
    test.todo("resets block interval poll interval")
  })
})
