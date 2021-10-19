import {shallow_mount_vue} from '../setup'

import {load_fixture} from '../fixtures'

import FilterList from '../../src/components/FilterList'

const filters = load_fixture('filters')

describe("FilterList", () => {
  var server_api, fl;

  beforeEach(function(){
    server_api = {
      methods : {
        load_filters : jest.fn(function(){
          this.filters = filters
        })
      }
    }

    fl = shallow_mount_vue(FilterList, {
      mixins : [server_api]
    })
  })

  describe("dom", () => {
    it("renders div for each filter", () => {
      const rows = fl.findAll(".filter_row");
      expect(rows.length).toBe(filters.length);
      for(var r = 0; r < rows.length; r += 1){
        const row = rows.at(r)
        const filter = filters[r];
        const link = row.find("router-link-stub")
        const summary = link.find("filtersummary-stub")
        const matches = link.find(".filter_matches")

        expect(link.attributes("to")).toEqual("/filter/" + filter.id)
        expect(summary).toExist()
        expect(matches.text()).toBe(filter.total_matches.toString())
      }
    })

    describe(".filter_row", () => {
      describe("is_active_filter", () => {
        it("is .active", () => {
          fl = shallow_mount_vue(FilterList, {
            mixins : [
              server_api,

              {
                methods : {
                  is_active_filter : function(filter) { return filter.id == filters[1].id; }
                }
              }
            ]
          })

          const rows = fl.findAll(".filter_row");
          for(var r = 0; r < rows.length; r += 1){
            const row = rows.at(r)
            if(r == 1)
              expect(row.classes()).toContain('active')
            else
              expect(row.classes()).not.toContain('active')
          }
        })
      })
    })
  })

  describe("methods", () => {
    describe("#is_active_filter", () => {
      describe("router path == /filter/filter.id", () => {
        it("is true", async () => {
          fl.vm.$router.push({path : "/filter/" + filters[1].id})
          expect(fl.vm.is_active_filter(filters[0])).toBe(false)
          expect(fl.vm.is_active_filter(filters[1])).toBe(true)
        })
      })

      describe("router path == /test/filter.id", () => {
        it("is true", () => {
          fl.vm.$router.push({path : "/test/" + filters[1].id})
          expect(fl.vm.is_active_filter(filters[0])).toBe(false)
          expect(fl.vm.is_active_filter(filters[1])).toBe(true)
        })
      })
    })
  })

  describe("#created", () => {
    it("loads filters", () => {
      expect(server_api.methods.load_filters).toHaveBeenCalledTimes(1)
    })
  })
})
