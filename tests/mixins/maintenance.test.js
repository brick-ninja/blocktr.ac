import {shallow_mount_vue} from '../setup'
import Maintenance from '../../src/mixins/maintenance'

const Component = {
  render() {},
  mixins : [Maintenance]
}

describe("maintenance mixin", () => {
  describe("computed", () => {
    describe("maintenance_mode", () => {
      test.todo("is config.MAINTENANCE_MODE")
    })

    describe("on_maintenance_page", () => {
      describe("route path == '/maintenance'", () => {
        test.todo("is true")
      })

      describe("route path != '/maintenance'", () => {
        test.todo("is true")
      })
    })
  })

  describe("methods", () => {
    describe("#nav_to_maintenance", () => {
      test.todo("navigates to /maintenance")
    })
  })
})
