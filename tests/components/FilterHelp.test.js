import {shallow_mount_vue} from '../setup'

import FilterHelp from '../../src/components/FilterHelp'

describe("FilterHelp", () => {
  describe("methods", () => {
    describe("set_filter", () => {
      it("emits 'set' event", () => {
        const filter_help = shallow_mount_vue(FilterHelp)

        filter_help.vm.set_filter({currentTarget : {textContent : "  abc  "}})
        expect(filter_help.emitted().set).toEqual([['abc']])
      })
    })
  })
})
