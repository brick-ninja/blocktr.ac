import {shallow_mount_vue} from '../setup'

import FilterSummary from '../../src/components/FilterSummary'

describe("FilterSummary", () => {
  var template_filter_summary,
      expression_filter_summary;

  beforeEach(function(){
    expression_filter_summary = shallow_mount_vue(FilterSummary, {
      propsData : {
        filter : {
          name : 'filter1',
          jsonpath : '$.json.path'
        }
      }
    })

    template_filter_summary = shallow_mount_vue(FilterSummary, {
      propsData : {
        filter : {
          params : ['value1', 'value2'],

          Template : {
            name : 'template1',
            params : [
              {name : 'param1'},
              {name : 'param2'}
            ]
          }
        }
      }
    })
  })

  describe("dom", () => {
    describe(".filter_title", () => {
      it("renders filter name", () => {
        const title = expression_filter_summary.find('.filter_title');
        expect(title.text()).toEqual('filter1')
      })

      describe("filter disabled", () => {
        it("renders (Disabled)", () => {
          const fs = shallow_mount_vue(FilterSummary, {
            propsData : {
              filter : {
                name : 'filter1',
                disabled : true
              }
            }
          })

          const title = fs.find('.filter_title')
                          .text()
                          .replace(/\s\s+/g, ' ');

          expect(title).toEqual('filter1 (Disabled)')
        })
      })
    })

    describe("template filter", () => {
      describe(".template_name", () => {
        it("render filter template name", () => {
          expect(template_filter_summary.find('.template_name').text()).toEqual('template1:')
        })
      })

      it("render filter params", () => {
        const filter_params   = template_filter_summary.vm.filter.params;
        const template_params = template_filter_summary.vm.filter.Template.params;

        const params = template_filter_summary.findAll('.template_param')
        expect(params.length).toBe(template_params.length)

        for(var p = 0; p < params.length; p += 1)
          expect(params.at(p).text()).toEqual(template_params[p]['name'] + ": " + filter_params[p])
      })
    })

    it("renders filter expression", () => {
      expect(expression_filter_summary.find('.filter_expression').text()).toEqual('$.json.path')
    })
  })

  describe("computed", () => {
    describe("params", () => {
      describe("not template filter", () => {
        it("is []", () => {
          expect(expression_filter_summary.vm.params).toEqual([])
        })
      })

      it("is array of template param name : filter param", () => {
        const filter_params   = template_filter_summary.vm.filter.params;
        const template_params = template_filter_summary.vm.filter.Template.params;

        const params = template_filter_summary.vm.params;
        expect(params.length).toBe(template_params.length)

        for(var p = 0; p < params.length; p += 1)
          expect(params[p]).toEqual(template_params[p]['name'] + ": " + filter_params[p])
      })
    })
  })
})
