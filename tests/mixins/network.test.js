import {shallow_mount_vue} from '../setup'

import Network from '../../src/mixins/network'

import network_config from '../../src/config/network'

const Component = {
  render() {},
  mixins : [Network]
}

describe("network mixin", () => {
  describe("computed", () => {
    describe("#no_network_configured", () => {
      describe("configured network is null", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_network : function(){
                return null;
              }
            }
          })

          expect(component.vm.no_network_configured).toBe(true)
        })
      })

      describe("configured network is not null", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_network : function(){
                return 'xrp_mainnet';
              }
            }
          })

          expect(component.vm.no_network_configured).toBe(false)
        })
      })
    })

    describe("#active_network", () => {
      describe("no network configured", () => {
        it("is default network for active blockchain", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_network : function(){
                return null;
              },

              active_blockchain : function(){
                return 'xrp'
              }
            }
          })

          expect(component.vm.active_network).toEqual(network_config.DEFAULT_NETWORKS['xrp'])
        })
      })

      describe("network configured", () => {
        it("is configured network", () => {
          const component = shallow_mount_vue(Component, {
            computed : {
              configured_network : function(){
                return 'xrp_mainnet';
              }
            }
          })

          expect(component.vm.active_network).toEqual('xrp_mainnet');
        })
      })
    })

    describe("#active_network_uri", () => {
      it("uri for the active network", () => {
        const component = shallow_mount_vue(Component, {
          computed : {
            active_network : function(){
              return 'xrp_mainnet';
            }
          }
        })

        expect(component.vm.active_network_uri).toEqual(network_config.NETWORK_URIS['xrp_mainnet'])
      })
    })
  })
})
