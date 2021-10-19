import { shallow_mount_vue } from '../../setup'
import XLMCurrencyAmount from '../../../src/components/currency_amount/XLM.vue';


describe("XLMCurrencyAmount", () => {
  var component;

  describe("dom", () => {
    describe("native", () => {
      it('renders xlm amount', () => {
        component = shallow_mount_vue(XLMCurrencyAmount, {
          propsData: {
            currency: 'assetTypeNative',
            no_amount: false,
            amount: 111
          }
        });
        expect(component.find(".amount").text()).toBe('111');
      });

      describe("no amount", () => {
        it('does not render amount', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: 'assetTypeNative',
              no_amount: true
            }
          });
          expect(component.find(".amount")).not.toExist();
        });
      })
    })

    describe("not native", () => {
      it('renders amount', () => {
        component = shallow_mount_vue(XLMCurrencyAmount, {
          propsData: {
            currency: 'definitelyNotNative',
            amount: 111
          }
        });
        expect(component.find(".amount").text()).toBe('111');
      });

      describe("no amount", () => {
        it('does not render amount', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: 'definitelyNotNative',
              no_amount: true
            }
          });
          expect(component.find(".amount")).not.toExist();
        });
      })

      it('renders currency icon', () => {
        const currencyString = 'definitelyNotNative';
        component = shallow_mount_vue(XLMCurrencyAmount, {
          propsData: {
            currency: currencyString,
            amount: 111
          }
        });
        const currencyIconComponent = component.findComponent({ name: 'CurrencyIcon' });
        expect(currencyIconComponent.exists()).toBe(true);
        expect(currencyIconComponent.props('currency')).toBe(currencyString);
      });

      it('renders issuer link', () => {
        const issuerString = 'abc123';
        component = shallow_mount_vue(XLMCurrencyAmount, {
          propsData: {
            currency: {
              issuer: issuerString,
              assetCode : "btc"
            },
            amount: 111,
          }
        });
        const accountLinkComponent = component.findComponent({ name: 'AccountLink' });
        expect(accountLinkComponent.exists()).toBe(true);
        expect(accountLinkComponent.props('account')).toBe(issuerString);
      });

      describe("no issuer", () => {
        // test.todo("does not render issuer")
        it('does not render issuer', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: {
                assetCode : "btc"
              },
              amount: 111,
              no_issuer: true
            }
          });
          const accountLinkComponent = component.findComponent({ name: 'AccountLink' });
          expect(accountLinkComponent.exists()).toBe(false);
        });
      })
    })
  })

  describe("#computed", () => {
    describe("#have_amount", () => {
      describe("!!amount", () => {
        it('is true', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              amount: 0.0123,
              currency: {
                assetCode : "btc"
              },
            }
          });
          expect(component.vm.have_amount).toBe(true);
        });
      })

      describe("amount == 0", () => {
        it('is true', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              amount: 0,
              currency: {
                assetCode : "btc"
              }
            }
          });
          expect(component.vm.have_amount).toBe(true);
        })
      })

      describe("!amount && amount != 0", () => {
        it('is false', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: {
                assetCode : "btc"
              },
           }
          });
          expect(component.vm.have_amount).toBe(false);
        })
      })
    })

    describe("#is_native", () => {
      describe("currency == assetTypeNative", () => {
        it('is true', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: 'assetTypeNative'
            }
          });
          expect(component.vm.is_native).toBe(true);
        })
      })

      describe("currency != assetTypeNative", () => {
        it('is false', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: {
                assetCode: 'btc'
              }
            }
          });
          expect(component.vm.is_native).toBe(false);
        })
      })
    })

    describe("#simple_currency", () => {
      describe("typeof(currency) == string", () => {
        it('is true', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: 'DOGE'
            }
          });
          expect(component.vm.simple_currency).toBe(true);
        })
      })

      describe("typeof(currency) != string", () => {
        it('is false', () => {
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: {
                assetCode: 'btc'
              }
            }
          });
          expect(component.vm.simple_currency).toBe(false);
        })
      })
    })

    describe("#asset_code", () => {
      describe("simple_currency", () => {
        it('is currency', () => {
          const currencyString = 'any currency string';
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: currencyString
            }
          });
          expect(component.vm.asset_code).toBe(currencyString);
        })
      })

      describe("!simple_currency", () => {
        it('is currency.assetCode', () => {
          const anyAssetCode = '123';
          component = shallow_mount_vue(XLMCurrencyAmount, {
            propsData: {
              currency: {
                assetCode: anyAssetCode
              }
            }
          });
          expect(component.vm.asset_code).toBe(anyAssetCode);
        })
      })
    })

    describe("#issuer", () => {
      it('is currency.issuer', () => {
        const anyIssuer = 'any currency issuer';
        component = shallow_mount_vue(XLMCurrencyAmount, {
          propsData: {
            currency: {
              issuer: anyIssuer,
              assetCode: 'btc'
            }
          }
        });
        expect(component.vm.issuer).toBe(anyIssuer);
      })
    })
  })
})
