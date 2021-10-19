describe("btc network-connection module", () => {
  describe("#convert_tx", () => {
    test.todo("converts output bscript to asm")
    test.todo("converts input prev_our bscript to asm")
    test.todo("calculates & sets total_in")
    test.todo("calculates & sets total_out")
  })

  describe("#prepare_static_tx", () => {
    test.todo("returns wrapped converted tx")
  })

  describe("#prepare_streamed_tx", () => {
    test.todo("returns wrapped converted tx")
    test.todo("sets hash on top level transaction object")
  })

  describe("#reset", () => {
    test.todo("stops streaming transactions")
    test.todo("sets connected to false")
  })

  describe("#connect", () => {
    test.todo("sets connected to true")
  })

  describe("#validate_address", () => {
    describe("valid btc address", () => {
      test.todo("returns true")
    })

    describe("invalid btc address", () => {
      test.todo("returns true")
    })
  })

  describe("#retrieve_account", () => {
    test.todo("gets specified account from network")

    describe("account retrieved", () => {
      test.todo("invokes callback with account object")
      test.todo("sets balance")
      test.todo("sets sequence")
      test.todo("sets previous_txn")
    })
  })

  describe("#retrieve_tx", () => {
    test.todo("gets specified transaction from network")
    test.todo("invokes callback w/ prepared tx")
  })

  describe("#next_block_time", () => {
    test.todo("returns _next_block_time")
  })

  describe("#handle_latest_txs", () => {
    test.todo("invokes callback w/ prepared/frozen block transactions")
  })

  describe("#get_latest_txs", () => {
    test.todo("gets specified block w/ transactions from the network")
    describe("retrieved block w/ transactions", () => {
      test.todo("handles_latest_txs")
    })
  })

  describe("#get_latest_block", () => {
    test.todo("gets lateset block from the network")
    describe("retrieved block", () => {
      test.todo("get_latest_txs")

      describe("current_block == retrieved block", () => {
        test.todo("is a noop / does not call get_latest_txs")
      })
    })
  })

  describe("#get_block_interval", () => {
    test.todo("gets block interval")
    describe("#retrieved block interval", () => {
      test.todo("sets block_interval")
    })
  })

  describe("#sync_network", () => {
    test.todo("gets latest block")
    test.todo("gets block interval")

    describe("requests completed", () => {
      test.todo("computes next_block_time")
    })
  })

  describe("#stream_txs", () => {
    test.todo("syncs network")
    test.todo("starts sync network interval")
  })

  describe("#stop_streaming_txs", () => {
    test.todo("clears sync network interval")
    test.todo("resets txs_interval")
  })
})
