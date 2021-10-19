import {create_vue} from '../setup'
import network_config from '../../src/config/network'

describe("doc-vars plugin", () => {
  it("sets document.title", () => {
    create_vue()
    expect(document.title).toEqual(network_config.APP_NAME);
  })

  test.todo("sets favicon.href")
})
