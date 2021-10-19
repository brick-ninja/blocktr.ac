import {shallow_mount_vue} from '../setup'

import FilterPages from '../../src/mixins/filter_pages'

const Component = {
  render() {},
  mixins : [FilterPages]
}

describe("filter_pages", () => {
  describe("computed", () => {
    describe("is_filter_page", () => {
      describe("route path [1] == 'filter'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$router.push({path : "/filter/1"})
          expect(component.vm.is_filter_page).toBe(true)
        })
      })

      describe("route path [1] != 'filter'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$router.push({path : "/"})
          expect(component.vm.is_filter_page).toBe(false)
        })
      })
    })

    describe("is_test_page", () => {
      describe("route path [1] == 'test'", () => {
        it("is true", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$router.push({path : "/test/1"})
          expect(component.vm.is_test_page).toBe(true)
        })
      })

      describe("route path [1] != 'test'", () => {
        it("is false", () => {
          const component = shallow_mount_vue(Component)
          component.vm.$router.push({path : "/"})
          expect(component.vm.is_test_page).toBe(false)
        })
      })
    })
  })
})
