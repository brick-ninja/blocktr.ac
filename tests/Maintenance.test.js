import {mount_vue} from './setup'
import Maintenance from '../src/Maintenance.vue'

describe("Maintenance Page", () => {
  describe("computed", () => {
    describe("img", () => {
      describe("no xrp configured", () => {
        it("is /asses/maintenance/blockchain.svg", () => {
          const path = './assets/maintenance/blockchain.svg';
          jest.doMock(path, () => {
            return path;
          })

          const maintenance = mount_vue(Maintenance,{
            computed: {
              no_blockchain_configured: function() {
                return true;
              }
            }
          });

          expect(maintenance.vm.img).toEqual(path);
        })
      })

      describe("blockchain configured", () => {
        it("is /assets/maintenance/configured_blockchain_upper.svg", () => {
          const path = './assets/maintenance/xrp.svg';
          jest.doMock(path, () => {
            return path;
          })

          const maintenance = mount_vue(Maintenance,{
            computed: {
              no_blockchain_configured: function() {
                return false;
              },
              configured_blockchain_upper: function(){
                return "xrp";
              }
            }
          });

          expect(maintenance.vm.img).toEqual(path);
        })
      })
    })
  })

  describe("#created", () => {
    describe("not maintenance_mode", () => {
      it("redirects to /txs", () => {
        const maintenance = mount_vue(Maintenance, {
          mixins : [{
            computed : {
              maintenance_mode : function(){
                return false;
              }
            }
          }]
        })
        expect(maintenance.vm.$route.path).toEqual("/txs")
      })
    })
  })
})
