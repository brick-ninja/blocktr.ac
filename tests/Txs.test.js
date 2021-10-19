import {mount_vue}  from './setup'

import {
  stubbed_maintenance_mode as maintenance_mode
} from './stubs'

import Txs from '../src/Txs.vue'

describe("Txs Page", () => {
  describe("#created", () => {
    describe("maintenance_mode", () => {
      it("navs to maintenance", () => {
        const _maintenance_mode = maintenance_mode()
        mount_vue(Txs, {mixins : [_maintenance_mode]})
        expect(_maintenance_mode.methods.nav_to_maintenance).toHaveBeenCalledTimes(1);
      })
    })
  })
})
