import {
  shallow_mount_vue,
  next_tick
} from '../setup'

import CostCalculator from '../../src/mixins/cost_calculator'

import ziti from '../../src/config/ziti'

const Component = {
  render() {},
  mixins : [CostCalculator]
}

describe("cost calculator", () => {
  describe("#total_cost", () => {
    describe("upgrading_plan", () => {
      it("includes monthly plan cost", () => {
        const cc = shallow_mount_vue(Component, {
          propsData: {
            plan: 'standard'
          },

          computed: {
            membership_level: function(){
              return 'basic'
            }
          }
        })

        expect(cc.vm.total_cost).toBe(ziti.membership_features.standard.cost);
      })
    })

    describe("specified_filters", () => {
      it("includes monthly costs for filters", async () => {
        const cc = shallow_mount_vue(Component, {
          propsData: {
            plan: 'standard',
          },

          computed: {
            membership_level: function(){
              return 'basic'
            }
          }
        })

        cc.vm.enable_additional = true;
        cc.vm.selected_additional_filters = 1;
        await next_tick(cc)
        expect(cc.vm.total_cost).toBe(ziti.membership_features.standard.cost + ziti.additions_cost.filters);
      })
    })

    describe("specified_sinks", () => {
      it("includes monthly costs for sinks", async () => {
        const cc = shallow_mount_vue(Component, {
          propsData: {
            plan: 'standard'
          },

          computed: {
            membership_level: function(){
              return 'basic'
            }
          }
        })

        cc.vm.enable_additional = true;
        cc.vm.selected_additional_sinks = 1;
        await next_tick(cc)
        expect(cc.vm.total_cost).toBe(ziti.membership_features.standard.cost + ziti.additions_cost.sinks);
      })
    })

    it("rounds cost to two decimal places", () => {
      const cc = shallow_mount_vue(Component, {
        propsData: {
          plan: 'standard',
          specified_filters: 1
        },

        computed: {
          membership_level: function(){
            return 'basic'
          }
        }
      })

      expect(cc.vm.total_cost).toBeRoundedTo(2);
    })
  })

  describe("#enable_additional", () => {
    it("gets/sets enable_additional_by_plan[this.plan]", async () => {
      const cc = shallow_mount_vue(Component, {
        propsData: {
          plan: 'standard'
        }
      });

      cc.vm.enable_additional = true
      expect(cc.vm.enable_additional).toBe(true)
      expect(cc.vm.enable_additional_by_plan[cc.vm.plan]).toBe(true)
    })
  })

  describe("#selected_additional_filters", () => {
    it("gets/sets selected_additional_filters_by_plan[this.plan]", async () => {
      const cc = shallow_mount_vue(Component, {
        propsData: {
          plan: 'standard'
        }
      });

      cc.vm.selected_additional_filters = 1
      expect(cc.vm.selected_additional_filters).toBe(1)
      expect(cc.vm.selected_additional_filters_by_plan[cc.vm.plan]).toBe(1)
    })
  })

  describe("#selected_additional_sinks", () => {
    it("gets/sets selected_additional_sinks_by_plan[this.plan]", async () => {
      const cc = shallow_mount_vue(Component, {
        propsData: {
          plan: 'standard'
        }
      });

      cc.vm.selected_additional_sinks = 1
      expect(cc.vm.selected_additional_sinks).toBe(1)
      expect(cc.vm.selected_additional_sinks_by_plan[cc.vm.plan]).toBe(1)
    })
  })
})
