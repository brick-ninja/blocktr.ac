import {
  mount_vue,
  next_tick,
  flush_promises
} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import Plans from '../src/Plans.vue'

import ziti  from '../src/config/ziti'

import moment from 'moment'

describe("Plans Page", () => {
  var plans;

  beforeEach(() => {
    plans = mount_vue(Plans)
  })

  describe("dom", () => {
    describe("#plan_container", () => {
      let config_plans, dom_plans;
      beforeEach(() => { 
        config_plans = Object.keys(ziti.membership_features)
        dom_plans = plans.findAll('.plan')
      })

      it("renders .plan for each plan", () => {
        expect(dom_plans.length).toBe(config_plans.length)

        for(var p = 0; p < dom_plans.length; p += 1){
          expect(dom_plans.at(p).find(".plan_name").text()).toEqual(config_plans[p])
        }
      })

      describe(".plan", () => {
        describe("plan is suggested", () => {
          it("it is .suggested", () => {
            for(var p = 0; p < dom_plans.length; p += 1){
              if(plans.vm.is_suggested_plan(config_plans[p])) 
                expect(dom_plans.at(p).classes()).toContain('suggested')
            }
          })
        })

        describe("plan is top plan", () => {
          it("it is .top_level", () => {
            for(var p = 0; p < dom_plans.length; p += 1){
              if(plans.vm.is_top_plan(config_plans[p])) 
                expect(dom_plans.at(p).classes()).toContain('top_level')
            }
          })
        })

        describe(".plan_name", () => {
          describe("plan is current plan", () => {
            it("renders 'Current Plan'", () => {
              const m_plans = mount_vue(Plans, {
                computed: {
                  membership_level: function(){
                    return config_plans[0]
                  }
                }
              })
              const m_dom_plans = m_plans.findAll('.plan')
              for(var p = 0; p < m_dom_plans.length; p += 1){
                if(m_plans.vm.is_current_plan(config_plans[p])) 
                  expect(m_dom_plans.at(p).find('.plan_name span').text()).toBe('(Current Plan)')
              }
            })
          })
        })

        describe(".plan_cost", () => {
          describe("plan_cost == 0", () => {
            it("renders 'Free'", () => {
              expect(dom_plans.at(0).find('.plan_cost').text()).toBe('Free')
            })
          })

          describe("plan_cost != 0", () => {
            it("renders $cost /month", () => {
              const expected = `$${ziti.membership_features[config_plans[1]].cost}  /month`;
              expect(dom_plans.at(1).find('.plan_cost').text()).toBe(expected)
            })
          })
        })

        describe(".plan_detail:nth-child(0)", () => {
          it("renders number of plan filters", () => {
            for(var p = 0; p < dom_plans.length; p += 1){
              const text = dom_plans.at(p).findAll('.plan_detail').at(0).find('.plan_detail .value').text();
              const expected = ziti.membership_features[config_plans[p]].filters.toString();
              expect(text).toEqual(expected)
            }
          })
        })

        describe(".plan_detail:nth-child(1)", () => {
          it("renders number of plan sinks", () => {
            for(var p = 0; p < dom_plans.length; p += 1){
              const text = dom_plans.at(p).findAll('.plan_detail').at(1).find('.plan_detail .value').text();
              const expected = ziti.membership_features[config_plans[p]].sinks.toString();
              expect(text).toEqual(expected)
            }
          })
        })

        describe(".plan_detail:nth-child(2)", () => {
          it("renders plan alert time", () => {
            for(var p = 0; p < dom_plans.length; p += 1){
              const text = dom_plans.at(p).findAll('.plan_detail').at(2).find('.plan_detail .value').text();
              if(ziti.membership_features[config_plans[p]].notification_times.includes(0))
                expect(text).toBe('Instant')

              else{
                const expected = ziti.membership_features[config_plans[p]].notification_times[0].toString();
                expect(text).toMatch(expected)
              }
            }
          })
        })
      })

      describe(".buy_additional checkbox", () => {
        let t = {}
        beforeEach(() => {
          for(var p = 0; p < config_plans.length; p += 1){
            t[config_plans[p]] = true;
          }
        })

        it("is tied to enable_additional_by_plan", async () => {  
          plans.setData({enable_additional_by_plan: t})
          await next_tick(plans);
          for(var p = 0; p < config_plans.length; p += 1){
            expect(dom_plans.at(p).find('.buy_additional input')).toBeChecked()
          }
        })

        describe("enable_additional", () => {
          describe("enable_additional_by_plan is true", () => {
            it("is active", async () => {
              plans.setData({enable_additional_by_plan: t})
              await next_tick(plans);
              for(var p = 0; p < config_plans.length; p += 1){
                expect(dom_plans.at(p).find('.buy_additional .enable_additional').classes()).toContain('active')
              }
            })
          })
        })
      })

      describe(".additional_items tr:nth-child(0) spinbutton", () => {
        let t = {}
        beforeEach(() => {
          for(var p = 0; p < config_plans.length; p += 1){
            t[config_plans[p]] = true;
          }
        })

        it("is tied to selected_additional_filters_by_plan", async () => {
          let s = {}
          for(var p = 0; p < config_plans.length; p += 1){
            s[config_plans[p]] = p % ziti.max_additions.filters;
          }
          plans.setData({enable_additional_by_plan: t})
          plans.setData({selected_additional_filters_by_plan: s})
          await next_tick(plans)

          for(var p = 0; p < config_plans.length; p += 1){
            const text = dom_plans.at(p).findAll('.additional_items .b-form-spinbutton').at(0).text();
            const expected = (p % ziti.max_additions.filters).toString();
            expect(text).toBe(expected)
          }
        })

        describe("!enable_additional", () => {
          it("is disabled", async () => {
            let t_f = {}
            for(var p = 0; p < config_plans.length; p += 1){
              t_f[config_plans[p]] = (p % 2 == 0);
            }
            plans.setData({enable_additional_by_plan: t_f})
            await next_tick(plans)
            for(var p = 0; p < config_plans.length; p += 1){
              const classes = dom_plans.at(p).findAll('.additional_items .b-form-spinbutton').at(0).classes();
              if(p % 2 == 0)
                expect(classes).not.toContain('disabled')
              else
                expect(classes).toContain('disabled')
            }
          })
        })

        describe("max_filters == 0", () => {
          it("is disabled", () => {
            let m_p = mount_vue(Plans, {
              computed: {
                max_filters: function(){
                  return 0
                }
              }
            })
            let f_d_plan = m_p.findAll('.plan').at(0)
            m_p.setData({enable_additional_by_plan: t})
            expect(f_d_plan.find('.additional_items .b-form-spinbutton').classes()).toContain('disabled')
          })
        })
      })

      describe(".additional_items tr:nth-child(1) spinbutton", () => {
        let t = {}
        beforeEach(() => {
          for(var p = 0; p < config_plans.length; p += 1){
            t[config_plans[p]] = true;
          }
        })

        it("is tied to selected_additional_sinks_by_plan", async () => {
          let s = {}
          for(var p = 0; p < config_plans.length; p += 1){
            s[config_plans[p]] = p % ziti.max_additions.sinks;
          }
          plans.setData({enable_additional_by_plan: t})
          plans.setData({selected_additional_sinks_by_plan: s})
          await next_tick(plans)

          for(var p = 0; p < config_plans.length; p += 1){
            const text = dom_plans.at(p).findAll('.additional_items .b-form-spinbutton').at(1).text();
            const expected = p % ziti.max_additions.sinks;
            expect(text).toBe(expected.toString());
          }
        })

        describe("!enable_additional", () => {
          it("is disabled", async() => {
            let t_f = {}
            for(var p = 0; p < config_plans.length; p += 1){
              t_f[config_plans[p]] = (p % 2 == 0);
            }
            plans.setData({enable_additional_by_plan: t_f})
            await next_tick(plans)
            for(var p = 0; p < config_plans.length; p += 1){
              const classes = dom_plans.at(p).findAll('.additional_items .b-form-spinbutton').at(1).classes();
              if(p % 2 == 0)
                expect(classes).not.toContain('disabled')
              else
                expect(classes).toContain('disabled')
            }
          })
        })

        describe("max_sinks == 0", () => {
          it("is disabled", () => {
            let m_p = mount_vue(Plans, {
              computed: {
                max_sinks: function(){
                  return 0
                }
              }
            })
            let f_d_plan = m_p.findAll('.plan').at(0)
            m_p.setData({enable_additional_by_plan: t})
            expect(f_d_plan.find('.additional_items .b-form-spinbutton').classes()).toContain('disabled')
          })
        })
      })

      describe("upgrade enabled", () => {
        let u_p, dom_plans;
        beforeEach(() => {
          u_p = mount_vue(Plans, {
            computed: {
              logged_in: function(){
                return true
              }
            }
          })
          dom_plans = u_p.findAll('.plan')
        })
        describe(".upgrade", () => {
          it("navigates to /plan with specified params", () => {
            let {selected_additional_filters_by_plan, selected_additional_sinks_by_plan} = u_p.vm
            let t_param = {
              plan: config_plans[0],
              specified_filters: selected_additional_filters_by_plan[config_plans[0]],
              specified_sinks: selected_additional_sinks_by_plan[config_plans[0]]
            }
            dom_plans.at(0).find('.upgrade').trigger("click")
            next_tick(u_p)
            expect(u_p.vm.$route.path).toBe('/plan')
            expect(u_p.vm.$route.params).toEqual(t_param)
          })
        })

        it("does not render login button", () => {
          for(var p = 0; p < config_plans.length; p += 1)
            expect(dom_plans.at(p).find('.upgrade').text()).not.toBe('Login to Upgrade')
        })

        it("does not render disabled upgrade button", () => {
          for(var p = 0; p < config_plans.length; p += 1)
            expect(dom_plans.at(p).find('.upgrade').classes).not.toContain('disabled')
        })
      })

      describe("!logged_in", () => {
        let u_p, dom_plans;
        beforeEach(() => {
          u_p = mount_vue(Plans, {
            computed: {
              logged_in: function(){
                return false
              }
            }
          })
          dom_plans = u_p.findAll('.plan')
        })

        describe("login button", () => {
          it("is rendered", () => {
            for(var p = 0; p < config_plans.length; p += 1)
              expect(dom_plans.at(p).find('.upgrade').text()).toBe('Login to Upgrade')
          })
        })

        describe("clicked", () => {
          test.todo("launches login modal")
        })

        it("does not render diabled upgrade button", () => {
          for(var p = 0; p < config_plans.length; p += 1)
            expect(dom_plans.at(p).find('.upgrade').classes).not.toContain('disabled')
        })
      })

      describe("upgrade not enabled and logged in", () => {
        describe("disabled upgrade button", () => {
          describe("current plan", () => {
            it("renders 'Current Plan'", () => {
              let u_p = mount_vue(Plans, {
                computed: {
                  logged_in: function() {
                    return true
                  },
                  membership_level: function() {
                    return config_plans[0]
                  }
                }
              })
              let dom_plans = u_p.findAll('.plan')
              expect(dom_plans.at(0).find('.upgrade').text()).toBe('Current Plan')
            })
          })
        })

        it("renders subscription end", () => {
          let t = {};
          for(var p = 0; p < config_plans.length; p += 1)
            t[config_plans[p]] = false
          let u_p = mount_vue(Plans, {
            computed: {
              logged_in: function() {
                return true
              },
              membership_level: function() {
                return config_plans[1]
              },
              upgrade_enabled: function() {
                return t
              }
            }
          })
          let dom_plans = u_p.findAll('.plan')
          expect(dom_plans.at(0).find('.upgrade').text()).toMatch(/Subscription Ends in/)
        })
      })
    })
  })

  describe("computed", () => {
    describe("top_plan", () => {
      it("is last membership_level", () => {
        expect(plans.vm.top_plan).toEqual(ziti.membership_levels[ziti.membership_levels.length - 1])
      })
    })

    describe("suggested_plan", () => {
      describe("membership_level == top_plan", () => {
        it("is null", () => {
          plans = mount_vue(Plans, {
            computed : {
              membership_level : function(){
                return plans.vm.top_plan;
              }
            }
          })

          expect(plans.vm.suggested_plan).toBeNull();
        })
      })

      it("is next higher membership level", () => {
        const config_plans = Object.keys(ziti.membership_features);

        plans = mount_vue(Plans, {
          computed : {
            membership_level : function(){
              return config_plans[1]
            }
          }
        })

        expect(plans.vm.suggested_plan).toEqual(config_plans[2])
      })
    })

    describe("max_filters", () => {
      it("is max_additions.filters - additional_filters", () => {
        plans = mount_vue(Plans, {
          computed: {
            additional_filters: function(){
              return 1
            }
          }
        })
        
        expect(plans.vm.max_filters).toBe(ziti.max_additions.filters - plans.vm.additional_filters)
      })
    })

    describe("max_sinks", () => {
      it("is max_additions.sinks - additional_sinks", () => {
        plans = mount_vue(Plans, {
          computed: {
            additional_sinks: function(){
              return 1
            }
          }
        })
        
        expect(plans.vm.max_sinks).toBe(ziti.max_additions.sinks - plans.vm.additional_sinks)
      })
    })

    describe("upgrade_enabled", () => {
      let config_plans
      beforeEach(() => {
        config_plans = Object.keys(ziti.membership_features)
      })
      it("returns upgrade_enabled bool for each membership level", () => {
        plans = mount_vue(Plans)
        for (let plan of config_plans){
          expect(plans.vm.upgrade_enabled[plan]).not.toBeUndefined();
        }
      })

      describe("not logged_in", () => {
        it("is false", () => {
          plans = mount_vue(Plans, {
            computed: {
              logged_in: function() {
                return false
              }
            }
          })
          for (let plan of config_plans){
            expect(plans.vm.upgrade_enabled[plan]).toBe(false);
          }
        })
      })

      describe("current membership level", () => {
        describe("purchasing additional options", () => {
          it("is true", () => {
            const t = {}
            for(let plan of config_plans)
              t[plan] = 100
            plans = mount_vue(Plans, {
              computed: {
                membership_level: function(){
                  return config_plans[1]
                },
                logged_in: function () {
                  return true
                },
                enable_additional: function() {
                  return true
                }
              }
            })
            plans.setData({total_cost: t})
            next_tick(plans)
            expect(plans.vm.upgrade_enabled[config_plans[1]]).toBe(true)
          })
        })

        it("is false", () => {
          plans = mount_vue(Plans, {
            computed: {
              membership_level: function(){
                return config_plans[1]
              },
              logged_in: function() {
                return true
              }
            }
          })
          expect(plans.vm.upgrade_enabled[config_plans[1]]).toBe(false)
        })
      })

      describe("lower membership levels", () => {
        const m_levels = ziti.membership_levels
        it("is false", () => {
          plans = mount_vue(Plans, {
            membership_level: function() {
              return config_plans[1]
            },
            logged_in: function() {
              return true
            }
          })
          expect(plans.vm.upgrade_enabled[m_levels[0]]).toBe(false)
        })
      })

      describe("higher membership levels", () => {
        const m_levels = ziti.membership_levels
        it("is false", () => {
          plans = mount_vue(Plans, {
            membership_level: function() {
              return config_plans[1]
            },
            logged_in: function() {
              return true
            }
          })
          expect(plans.vm.upgrade_enabled[m_levels[2]]).toBe(false)
        })
      })
    })

    describe("expires", () => {
      it("is number of days until current plan renewal date", () => {
        plans = mount_vue(Plans, {
          computed: {
            renewal_date: function(){
              return moment().add(1, 'days').toString()
            }
          }
        })
        expect(plans.vm.expires).toBe("1")
      })
    })
  })

  describe("watch", () => {
    describe("enable_additional_by_plan", () => {
      describe("!enable_additional", () => {
        let m_levels, t_f = {}
        beforeEach(() => {
          m_levels = ziti.membership_levels
          for(let level of m_levels) t_f[level] = false
        })

        it("sets selected_additional_filters to 0", () => {
          plans = mount_vue(Plans)
          plans.setData({enable_additional_by_plan: t_f})
          next_tick(plans)
          for(let level of m_levels){
            expect(plans.vm.selected_additional_filters_by_plan[level]).toBe(0)
          }
        })

        it("sets selected_additional_sinks to 0", () => {
          plans = mount_vue(Plans)
          plans.setData({enable_additional_by_plan: t_f})
          next_tick(plans)
          for(let level of m_levels){
            expect(plans.vm.selected_additional_sinks_by_plan[level]).toBe(0)
          }
        })
      })
    })
  })

  describe("methods", () => {
    describe("#is_current_plan", () => {
      describe("plan == membership_level", () => {
        it("is true", () => {
          plans = mount_vue(Plans, {
            computed : {
              membership_level : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_current_plan('foobar')).toBe(true);
        })
      })

      describe("plan != membership_level", () => {
        it("is false", () => {
          plans = mount_vue(Plans, {
            computed : {
              membership_level : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_current_plan('barfoo')).toBe(false);
        })
      })
    })

    describe("#is_suggested_plan", () => {
      describe("plan == suggested_plan", () => {
        it("is true", () => {
          plans = mount_vue(Plans, {
            computed : {
              suggested_plan : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_suggested_plan('foobar')).toBe(true);
        })
      })

      describe("plan != suggested_plan", () => {
        it("is false", () => {
          plans = mount_vue(Plans, {
            computed : {
              suggested_plan : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_suggested_plan('barfoo')).toBe(false);
        })
      })
    })

    describe("#is_top_plan", () => {
      describe("plan == top_plan", () => {
        it("is true", () => {
          plans = mount_vue(Plans, {
            computed : {
              top_plan : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_top_plan('foobar')).toBe(true);
        })
      })

      describe("plan != top_plan", () => {
        it("is false", () => {
          plans = mount_vue(Plans, {
            computed : {
              top_plan : function(){
                return 'foobar'
              }
            }
          })

          expect(plans.vm.is_top_plan('barfoo')).toBe(false);
        })
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Plans, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })
  })
})
