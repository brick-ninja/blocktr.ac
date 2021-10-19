import {
  mount_vue
} from './setup';

import Landing from '../src/Landing.vue'
describe("Landing Page", () => {
  describe("computed", () => {
    describe("#blockchain_text", () => {
      describe("no blockchain configured", () => {
        it("is 'Blockchain'", () => {
          const landing = mount_vue(Landing, {
            computed: {
              no_blockchain_configured: function(){
                return true;
              }
            }
          })

          expect(landing.vm.blockchain_text).toBe("Blockchain");
        })
      })

      describe("blockchain configured", () => {
        it("is configured_blockchain_upper", () => {
          const landing = mount_vue(Landing, {
            computed: {
              no_blockchain_configured: function(){
                return false;
              },
              configured_blockchain_upper: function(){
                return "xrp";
              }
            }
          })

          expect(landing.vm.blockchain_text).toBe("xrp")
        })
      })
    })
  })

  describe("methods", () => {
    describe("#img_src", () => {
      describe("no blockchain configured", () => {
        it("is /assets/landing/blockchain/N.png", () => {
          const path = './assets/landing/blockchain/section1.png';
          jest.doMock(path, () => {
            return path;
          })

          const landing = mount_vue(Landing, {
            computed: {
              no_blockchain_configured: function(){
                return true;
              }
            }
          })

          expect(landing.vm.img_src('section1')).toEqual(path);
        })
      })

      describe("blockchain configured", () => {
        it("is /assets/landing/configured_blockchain/N.png", () => {
          const path = './assets/landing/xrp/section1.png';
          jest.doMock(path, () => {
            return path;
          })

          const landing = mount_vue(Landing, {
            computed: {
              no_blockchain_configured: function(){
                return false;
              },
              configured_blockchain_upper: function(){
                return "xrp";
              }
            }
          })

          expect(landing.vm.img_src('section1')).toEqual(path)
        })
      })
    })
  })
})
