import txs from '../../src/config/txs'

describe("tx_category_for_type", () => {
  it("returns category for type", () =>{
    expect(txs.tx_category_for_type('payment')).toEqual("PAYMENTS")
    expect(txs.tx_category_for_type('Payment')).toEqual("PAYMENTS")
    expect(txs.tx_category_for_type('manageBuyOffer')).toEqual("OFFERS")
    expect(txs.tx_category_for_type('manageSellOffer')).toEqual("OFFERS")
    expect(txs.tx_category_for_type('TrustSet')).toEqual("TRUST LINES")
    expect(txs.tx_category_for_type('allowTrust')).toEqual("TRUST LINES")
  })

  it("defaults to null", () => {
    expect(txs.tx_category_for_type('foobar')).toBe(null);
  })
})
