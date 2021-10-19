import {shallow_mount_vue} from './setup'

import txs_config from '../src/config/txs'

const Component = {
  render() {}
}

describe("store", () => {
  var component

  beforeEach(() => {
    component = shallow_mount_vue(Component)
  })

  describe("#set_network_initialize", () => {
    it("sets network_initialized variable", () => {
      component.vm.$store.commit('set_network_initialized', true)
      expect(component.vm.$store.state.network_initialized).toBe(true)
    })
  })

  describe("#set_selected_blockchain", () => {
    it("sets selected_blockchain variable", () => {
      component.vm.$store.commit('set_selected_blockchain', 'xrp')
      expect(component.vm.$store.state.selected_blockchain).toBe('xrp')
    })
  })

  describe("#set_user", () => {
    it("sets user properties", () => {
      const now = new Date();

      component.vm.$store.commit('set_user', {
                     email : 'e@ma.il',
          membership_level : 'standard',
                   profile : {foo : 'bar'},
              renewal_date : now,
           has_credit_card : true,
        additional_filters : 5,
          additional_sinks : 3,
                Privileges : ['p1', 'p2']
      })

      expect(component.vm.$store.state.user.email).toEqual('e@ma.il')
      expect(component.vm.$store.state.user.membership_level).toEqual('standard')
      expect(component.vm.$store.state.user.profile).toEqual({foo : 'bar'})
      expect(component.vm.$store.state.user.renewal_date).toEqual(now)
      expect(component.vm.$store.state.user.has_credit_card).toEqual(true)
      expect(component.vm.$store.state.user.additional_filters).toEqual(5)
      expect(component.vm.$store.state.user.additional_sinks).toEqual(3)
      expect(component.vm.$store.state.user.privileges).toEqual(['p1', 'p2'])
    })
  })

  describe("#clear_user", () => {
    it("clears user properties", () => {
      component.vm.$store.commit('clear_user')

      expect(component.vm.$store.state.user.email).toEqual('')
      expect(component.vm.$store.state.user.membership_level).toEqual('')
      expect(component.vm.$store.state.user.profile).toEqual('')
      expect(component.vm.$store.state.user.renewal_date).toEqual('')
      expect(component.vm.$store.state.user.has_credit_card).toEqual(false)
      expect(component.vm.$store.state.user.additional_filters).toEqual(0)
      expect(component.vm.$store.state.user.additional_sinks).toEqual(0)
      expect(component.vm.$store.state.user.privileges).toEqual([])
    })
  })

  describe("#toggle_paused_txs", () => {
    it("toggles paused_txs property", () => {
      component.vm.$store.commit('toggle_paused_txs')
      expect(component.vm.$store.state.paused_txs).toBe(true)

      component.vm.$store.commit('toggle_paused_txs')
      expect(component.vm.$store.state.paused_txs).toBe(false)
    })
  })

  describe("#update_tx_filter", () => {
    describe("filter is set and is not valid jsonpath", () => {
      it("does not set filter", () => {
        component.vm.$store.commit('update_tx_filter', '[(')
        expect(component.vm.$store.state.tx_filter).toEqual('')
      })
    })

    it("sets filter", () => {
      component.vm.$store.commit('update_tx_filter', '$')
      expect(component.vm.$store.state.tx_filter).toEqual('$')

      component.vm.$store.commit('update_tx_filter', '')
      expect(component.vm.$store.state.tx_filter).toEqual('')
    })

    describe("filter is set", () => {
      it("removes txs that do not match filter", () => {
        const tx1 = {category : 'PAYMENTS', tx : { id : 'tx1' }};
        const tx2 = {category : 'OFFERS',   tx : { id : 'tx2' }};
        component.vm.$store.commit('add_tx', tx1);
        component.vm.$store.commit('add_tx', tx2);
        expect(component.vm.$store.state.txs).toEqual([tx2, tx1])

        component.vm.$store.commit('update_tx_filter', "$[?(@.id == 'tx1')]")
        expect(component.vm.$store.state.txs).toEqual([tx1])
      })
    })
  })

  describe("#add_tx", () => {
    describe("txs are paused", () => {
      it("does not add tx", () => {
        component.vm.$store.commit("toggle_paused_txs")
        component.vm.$store.commit('add_tx', {category : 'PAYMENTS'});
        expect(component.vm.$store.state.txs.length).toBe(0)
      })
    })

    describe("filter is set", () => {
      describe("tx does not match filter", () => {
        it("does not add tx", () => {
          component.vm.$store.commit('update_tx_filter', "$[?(@.some == 'thing')]")
          component.vm.$store.commit('add_tx', {category : 'PAYMENTS'});
          expect(component.vm.$store.state.txs.length).toBe(0)
        })
      })
    })

    describe("tx categories are set and do not include tx category", () => {
      it("does not add tx", () => {
        component.vm.$store.commit('toggle_tx_category', 'PAYMENTS')
        component.vm.$store.commit('add_tx', {category : 'OFFERS'});
        expect(component.vm.$store.state.txs.length).toBe(0)
      })
    })

    it("prepends tx", () => {
      const tx = {category : 'OFFERS'}
      component.vm.$store.commit('add_tx', tx);
      expect(component.vm.$store.state.txs).toEqual([tx]);
    })

    it("caps number of txs to TX_HISTORY", () => {
      for(var t = 0; t < txs_config.TX_HISTORY + 1; t += 1)
        component.vm.$store.commit('add_tx', {category : 'OFFERS'});
      expect(component.vm.$store.state.txs.length).toEqual(txs_config.TX_HISTORY);
    })

    it("updates 'ALL' tally", () => {
      component.vm.$store.commit('add_tx', {category : 'OFFERS'});
      component.vm.$store.commit('add_tx', {category : 'OFFERS'});
      component.vm.$store.commit('add_tx', {category : 'PAYMENTS'});
      expect(component.vm.$store.state.tx_category_tallies['ALL']).toEqual(3);
    })

    it("updates category tally", () => {
      component.vm.$store.commit('add_tx', {category : 'OFFERS'});
      component.vm.$store.commit('add_tx', {category : 'OFFERS'});
      component.vm.$store.commit('add_tx', {category : 'PAYMENTS'});
      expect(component.vm.$store.state.tx_category_tallies['OFFERS']).toEqual(2);
      expect(component.vm.$store.state.tx_category_tallies['PAYMENTS']).toEqual(1);
    })
  })

  describe("#clear_tx_categories", () => {
    it("empties tx categories", () => {
      component.vm.$store.commit('toggle_tx_category', 'PAYMENTS')
      component.vm.$store.commit('clear_tx_categories')
      expect(component.vm.$store.state.tx_categories.length).toBe(0)
    })
  })

  describe("#toggle_tx_category", () => {
    describe("tx category enabled", () => {
      it("removes tx category", () => {
        component.vm.$store.commit('toggle_tx_category', 'PAYMENTS')
        component.vm.$store.commit('toggle_tx_category', 'OFFERS')
        expect(component.vm.$store.state.tx_categories).toEqual(['PAYMENTS', 'OFFERS'])

        component.vm.$store.commit('toggle_tx_category', 'PAYMENTS')
        expect(component.vm.$store.state.tx_categories).toEqual(['OFFERS'])
      })
    })

    describe("tx category not enabled", () => {
      it("adds tx category", () => {
        component.vm.$store.commit('toggle_tx_category', 'OFFERS')
        expect(component.vm.$store.state.tx_categories).toEqual(['OFFERS'])
      })
    })

    it("removes txs not in enabled categories", () => {
      const tx1 = {category : 'OFFERS'};
      const tx2 = {category : 'PAYMENTS'};
      const tx3 = {category : 'TRUST LINES'};
      component.vm.$store.commit('add_tx', tx1);
      component.vm.$store.commit('add_tx', tx2);
      component.vm.$store.commit('add_tx', tx3);

      component.vm.$store.commit('toggle_tx_category', 'OFFERS')
      expect(component.vm.$store.state.txs).toEqual([tx1])
    })
  })

  describe("#clear_txs", () => {
    it("empties txs", () => {
      component.vm.$store.commit('add_tx', {category : 'OFFERS'});
      component.vm.$store.commit('add_tx', {category : 'PAYMENTS'});
      expect(component.vm.$store.state.txs.length).toBe(2)

      component.vm.$store.commit('clear_txs')
      expect(component.vm.$store.state.txs.length).toBe(0)
    })
  })

  describe("#set_templates", () => {
    it("sets templates property", () => {
      component.vm.$store.commit('set_templates', ['t1', 't2'])
      expect(component.vm.$store.state.templates).toEqual(['t1', 't2'])
    })
  })

  describe("#set_sinks", () => {
    it("sets sinks property", () => {
      component.vm.$store.commit('set_sinks', ['s1', 's2'])
      expect(component.vm.$store.state.sinks).toEqual(['s1', 's2'])
    })
  })

  describe("#set_filters", () => {
    it("sets filters property", () => {
      component.vm.$store.commit('set_filters', ['f1', 'f2'])
      expect(component.vm.$store.state.filters).toEqual(['f1', 'f2'])
    })
  })

  describe("#set_filter_matches", () => {
    it("sets filter_matches property", () => {
      component.vm.$store.commit('set_filter_matches', ['fm1', 'fm2'])
      expect(component.vm.$store.state.filter_matches).toEqual(['fm1', 'fm2'])
    })
  })

  describe("#set_notifications", () => {
    it("sets notifications property", () => {
      component.vm.$store.commit('set_notifications', ['n1', 'n2'])
      expect(component.vm.$store.state.notifications).toEqual(['n1', 'n2'])
    })
  })

  describe("#set_active_filter", () => {
    it("sets active_filter property", () => {
      component.vm.$store.commit('set_active_filter', {id : 'filter1'})
      expect(component.vm.$store.state.active_filter).toEqual({id : 'filter1'})
    })
  })

  describe("#set_in_progress_filter", () => {
    it("sets in_progress_filter property", () => {
      component.vm.$store.commit('set_in_progress_filter', {id : 'filter1'})
      expect(component.vm.$store.state.in_progress_filter).toEqual({id : 'filter1'})
    })
  })

  describe("#clear_in_progress_filter", () => {
    it("clear in_progress_filter property", () => {
      component.vm.$store.commit('set_in_progress_filter', {id : 'filter1'})
      component.vm.$store.commit('clear_in_progress_filter')
      expect(component.vm.$store.state.in_progress_filter).toEqual({})
    })
  })
})
