import { shallow_mount_vue } from '../setup'
import AccountLink from '../../src/components/AccountLink.vue';


var component;

describe("AccountLink", () => {
  describe("dom", () => {
    describe("link", () => {
      it('renders text', () => {
        component = shallow_mount_vue(AccountLink, {
          propsData: {
            account: '112358',
            shorten: 3
          }
        });
        expect(component.find(".account_link").text()).toBe('112...');
      });

      describe("clicked", () => {
        it('nav_to_account', async () => {
          component = shallow_mount_vue(AccountLink, {
            propsData: {
              account: '1123',
            }
          });
          await component.find("span.account_link").trigger('click');
          expect(component.vm.$route.path).toEqual("/" + component.vm.active_blockchain + "/account/1123");
        });
      })
    })
  })

  describe("computed", () => {

    describe("text", () => {
      it("is account", () => {
        component = shallow_mount_vue(AccountLink, {
          propsData: {
            account: 'aaabbb',
          }
        });
        expect(component.vm.text).toBe('aaabbb');
      });

      describe("shorten is true", () => {
        it("is shortened account", () => {
          component = shallow_mount_vue(AccountLink, {
            propsData: {
              account: 'aaabbbccc',
              shorten: true
            }
          });
          expect(component.vm.text).toBe('aaabbbc...');
        });
      })

      describe("shorten is length", () => {
        it("is shortens account to specified length", () => {
          component = shallow_mount_vue(AccountLink, {
            propsData: {
              account: 'aaabbbccc',
              shorten: 3
            }
          });
          expect(component.vm.text).toBe('aaa...');
        });
      })
    })
  })

  describe("methods", () => {
    describe("#nav_to_account", () => {
      it('routes to account', () => {
        component = shallow_mount_vue(AccountLink, {
          propsData: {
            account: '1123',
          }
        });
        component.vm.nav_to_account();
        expect(component.vm.$route.path).toEqual("/" + component.vm.active_blockchain + "/account/1123");
      });
    })
  })
})
