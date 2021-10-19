import {
  shallow_mount_vue,
  next_tick
} from '../setup'

import FilterHeader  from '../../src/components/FilterHeader'
import {breakpoints} from '../../src/mq'

describe("FilterHeader", () => {
  describe("dom", () => {
    describe("is_filter_page", () => {
      it("renders down-triangle-lines-white icon", () => {
        const fh = shallow_mount_vue(FilterHeader, {
          computed : {
            is_filter_page : function(){
              return true;
            }
          }
        })

        const icon = fh.find('#filter_subheader_icon img').attributes('src');
        expect(icon).toEqual("../assets/down-triangle-lines-white.svg")
      })
    })

    describe("is_test_page", () => {
      it("renders repeat icon", () => {
        const fh = shallow_mount_vue(FilterHeader, {
          computed : {
            is_test_page : function(){
              return true;
            }
          }
        })

        const icon = fh.find('#filter_subheader_icon img').attributes('src');
        expect(icon).toEqual("../assets/repeat.svg")
      })
    })

    describe("mq >= md", () => {
      it("renders filter actions in filter_header", async () => {
        global.innerWidth = breakpoints.md + 1;

        const fh = shallow_mount_vue(FilterHeader)
        await next_tick(fh)
        expect(fh.find('#filter_header > filteractions-stub')).toExist()
        expect(fh.find('#expand_actions > b-popover_stub > FilterActions-stub')).not.toExist()
      })
    })

    describe("mq < md", () => {
      it("renders filter actions in expand_actions popover", async () => {
        global.innerWidth = breakpoints.sm - 1;

        const fh = shallow_mount_vue(FilterHeader)
        await next_tick(fh)
        expect(fh.find('#filter_header > filteractions-stub')).not.toExist()
        expect(fh.find('#expand_actions > b-popover-stub > filteractions-stub')).toExist()
      })
    })

    describe("EditFilterModal", () => {
      describe("edited", () => {
        it("sets_active_filter", async () => {
          const server_api = {
            methods : {set_active_filter : jest.fn()}
          }

          const fh = shallow_mount_vue(FilterHeader, {
            mixins : [server_api]
          })

          const efm = fh.find("editfiltermodal-stub")
          const evnt = {ev : 'nt'}
          await efm.vm.$emit('edited', evnt)
          expect(server_api.methods.set_active_filter).toHaveBeenCalledTimes(1)
          expect(server_api.methods.set_active_filter.mock.calls[0][0]).toBe(evnt)
        })
      })
    })

    describe("DuplicateFilterModal", () => {
      describe("created", () => {
        it("sets_active_filter", async () => {
          const server_api = {
            methods : {set_active_filter : jest.fn()}
          }

          const fh = shallow_mount_vue(FilterHeader, {
            mixins : [server_api]
          })

          const dfm = fh.find("duplicatefiltermodal-stub")
          const evnt = {ev : 'nt'}
          await dfm.vm.$emit('created', evnt)
          expect(server_api.methods.set_active_filter).toHaveBeenCalledTimes(1)
          expect(server_api.methods.set_active_filter.mock.calls[0][0]).toBe(evnt)
        })
      })
    })

    describe("DeleteFilterModal", () => {
      describe("deleted", () => {
        it("redirects to /txs", async () => {
          const fh = shallow_mount_vue(FilterHeader)
          const dfm = fh.find("deletefiltermodal-stub")
          await dfm.vm.$emit('deleted')
          expect(fh.vm.$route.path).toEqual("/txs")
        })
      })
    })
  })
})
