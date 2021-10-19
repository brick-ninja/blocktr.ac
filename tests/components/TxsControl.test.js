import Vuex from 'vuex'

import {shallow_mount_vue} from '../setup'

import TxsControl from '../../src/components/TxsControl'

describe("TxsControl", () => {
  var tc;

  beforeEach(function(){
    tc = shallow_mount_vue(TxsControl)
  })

  describe("dom", () => {
    describe("#txs_play_pause", () => {
      describe("click event", () => {
        it("calls play_pause", () => {
          tc.vm.play_pause = jest.fn()
          tc.find("#txs_play_pause").trigger('click')
          expect(tc.vm.play_pause).toHaveBeenCalledTimes(1)
        })

        describe("paused", () => {
          it("renders play", () => {
            tc = shallow_mount_vue(TxsControl, {
              computed : {
                paused : function(){ return true; }
              }
            })

            expect(tc.find("#txs_play_pause img").attributes("src")).toEqual("../assets/play.svg")
          })
        })

        describe("!paused", () => {
          it("renders paused", () => {
            tc = shallow_mount_vue(TxsControl, {
              computed : {
                paused : function(){ return false; }
              }
            })

            expect(tc.find("#txs_play_pause img").attributes("src")).toEqual("../assets/pause.svg")
          })
        })
      })
    })

    describe("#clear_txs", () => {
      describe("click event", () => {
        it("clears txs", () => {
          tc.vm.clear_txs = jest.fn()
          tc.find("#clear_txs").trigger('click')
          expect(tc.vm.clear_txs).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe("logged_in and mq <= md", () => {
      test.todo("launches settings modal")
    })
  })

  describe("computed", () => {
    describe("paused", () => {
      it("is store.paused_txs", () => {
        expect(tc.vm.paused).toBe(tc.vm.$store.state.paused_txs)
        tc.vm.$store.commit('toggle_paused_txs')
        expect(tc.vm.paused).toBe(tc.vm.$store.state.paused_txs)
      })
    })
  })

  describe("methods", () => {
    describe("play_pause", () => {
      it("toggle_paused_txs", () => {
        const mutations = {
          toggle_paused_txs : jest.fn()
        }

        tc = shallow_mount_vue(TxsControl, {
          store : new Vuex.Store({
            mutations
          })
        })

        tc.vm.play_pause()
        expect(mutations.toggle_paused_txs).toHaveBeenCalledTimes(1)
      })
    })

    describe("clear_txs", () => {
      it("clears txs", () => {
        const mutations = {
          clear_txs : jest.fn()
        }

        tc = shallow_mount_vue(TxsControl, {
          store : new Vuex.Store({
            mutations
          })
        })

        tc.vm.clear_txs()
        expect(mutations.clear_txs).toHaveBeenCalledTimes(1)
      })
    })
  })
})
