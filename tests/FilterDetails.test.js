import {
  mount_vue,
  next_tick,
  flush_promises
} from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import {
  load_fixture
} from './fixtures'

import FilterDetails from '../src/FilterDetails.vue'

import ziti from '../src/config/ziti'

///

// Filter 'retrieved' from the server
const filters = load_fixture('filters');

// Filters with sinks
const filters_with_sinks = filters.filter((f) => f.Sinks && f.Sinks.length > 0)

// Filters without sinks
const filters_without_sinks = filters.filter((f) => !f.Sinks || f.Sinks.length == 0)

// Filter matches 'retrieved' from server
const filter_matches = load_fixture('filter_matches');

///

describe("FilterDetails Page", () => {
  var server_api, filter_details

  beforeEach(function(){
    // Stub server_api call
    server_api = {
      methods : {
        load_filter : jest.fn(function() {
          this.active_filter = filters[0]
        }),

        load_filter_matches : jest.fn(function() {
          this.filter_matches = []
        }),
      }
    };

    filter_details = mount_vue(FilterDetails, {
      mixins: [server_api]
    })
  })

  describe("dom", () => {
    describe("no filter_matches", () => {
      it("renders no matches content", () => {
        expect(filter_details.find("#no_matches")).toExist()
      })


      describe("#notifications_text", () => {
        describe("filter associated with sinks", () => {
          it("renders sinks", () => {
            expect(filter_details.find("#get_notifications").text()).toBe("You will get notifications via email demo@blocktr.ac, sms 1112223333");
          })
        })
      })
    })

    describe("with filter_matches", () => {
      beforeEach(function(){
        filter_details = mount_vue(FilterDetails,
          {
            computed: {
              match_history: function(){
                return 0
              }
            },
            mixins: [{
              methods : {
                load_filter : function() {
                  this.active_filter = filters[0]
                },

                load_filter_matches : function() {
                  this.filter_matches = filter_matches;
                },
              }
            }],
          }
        );
      })

      describe("#matched_txs_explanation", () => {
        describe("total_matches > match_history", () => {
          it("renders match_history text", () => {
            expect(filter_details.find("#match_history").text()).toBe("Only the last 0 matches are shown.");
          })
        })
      })

      it("renders filter matches", () => {
        expect(filter_details.findAll('.tx_summary_container').length).toBe(filter_matches.length);
      })
    })
  })

  describe("computed", () => {
    describe("have_sinks", () => {
      describe("no active filter", () => {
        it("is false", () => {
          filter_details = mount_vue(FilterDetails, {
            mixins: [{
              methods : {
                load_filter : function() {
                },

                load_filter_matches : function() {
                  this.filter_matches = []
                },
              }
            }]
          })

          expect(filter_details.vm.have_sinks).toBe(false)
        })
      })

      describe("no active filter sinks (falsy)", () => {
        it("is false", async () => {
          filter_details.vm.active_filter = filters_without_sinks[0];
          await next_tick(filter_details);
          expect(filter_details.vm.have_sinks).toBe(false)
        })
      })

      describe("no active filter sinks (.length == 0)", () => {
        it("is false", async () => {
          filter_details.vm.active_filter =
            Object.assign({}, filters_with_sinks[0], {Sinks : []})
          await next_tick(filter_details);
          expect(filter_details.vm.have_sinks).toBe(false)
        })
      })

      describe("active filter associated with sinks", () => {
        it("is true", async () => {
          filter_details.vm.active_filter = filters_with_sinks[0];
          await next_tick(filter_details);
          expect(filter_details.vm.have_sinks).toBe(true)
        })
      })
    })

    describe("sinks_text", () => {
      it("is comma seperated list of filter sinks' types/targets", () => {
        filter_details.setData({active_filter: filters_with_sinks[0]});
        expect(filter_details.vm.sinks_text.split(',').length).toBe(filters_with_sinks[0].Sinks.length);
      })
    })

    describe("match_history", () => {
      it("is config filter_match_history", () => {
        expect(filter_details.vm.match_history).toBe(ziti.filter_match_history)
      })
    })

    describe("filter_match_txs", () => {
      it("is raw transactions corresponding to filter matches", () => {
        filter_details = mount_vue(FilterDetails, {
          mixins: [{
            methods : {
              load_filter : function() {},

              load_filter_matches : function() {
                this.filter_matches = filter_matches;
              },
            }
          }],
        });

        const expected = filter_matches.map((match) => {
                           return match.Transaction.raw
                         });

        expect(filter_details.vm.filter_match_txs).toEqual(expected)
      })
    })
  })

  describe("watch", () => {
    describe("route", () => {
      it("loads filter",  async() => {
        filter_details.vm.$router.push({path: "/filter/" + filters[1].id});
        await flush_promises();
        expect(server_api.methods.load_filter).toHaveBeenCalledTimes(2);
      })
      it("loads filter matches", async() => {
        filter_details.vm.$router.push({path: "/filter/" + filters[1].id});
        await flush_promises();
        expect(server_api.methods.load_filter_matches).toHaveBeenCalledTimes(2);
      })
    })
  })

  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(FilterDetails, {mixins : [server_api, _maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })

    it("loads filter", () => {
      expect(server_api.methods.load_filter).toHaveBeenCalledTimes(1);
    })

    it("loads filter matches", () => {
      expect(server_api.methods.load_filter_matches).toHaveBeenCalledTimes(1);
    })
  })
})
