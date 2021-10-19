import {mount_vue, next_tick} from './setup'

import {load_fixture} from './fixtures'

import util from '../src/util'

import Status from '../src/Status.vue'

import ziti from '../src/config/ziti'

import config from '../src/config/config'

// Server Status 'retrieved' from the server
const server_status = load_fixture('server_status');

describe("Status Page", () => {
  var stat, server_api

  beforeEach(function(){
    server_api = {
      methods : {
        load_server_status : jest.fn(function(){
          this.server_status = server_status
        })
      }
    }

    stat = mount_vue(Status, {
      mixins : [server_api]
    })
  })

  describe("dom", () => {
    it("renders timestamp", () => {
      const now = Date.now()
      jest.spyOn(Date, 'now').mockImplementation(() => now);

      stat = mount_vue(Status, {
        mixins : [server_api]
      })

      expect(stat.find("#date").text()).toEqual((new Date(now)).toGMTString())
    })

    it("renders users", () => {
      expect(stat.find("#users").text()).toEqual("Users: " + util.delim_value(server_status.users))
    })

    it("renders filters", () => {
      expect(stat.find("#filters").text()).toEqual("Filters: " + util.delim_value(server_status.filters))
    })

    it("renders sinks", () => {
      expect(stat.find("#sinks").text()).toEqual("Sinks: " + util.delim_value(server_status.sinks))
    })

    it("renders filter sinks", () => {
      expect(stat.find("#filter_sinks").text()).toEqual("Filter Sinks: " + util.delim_value(server_status.filter_sinks))
    })

    it("renders transactions", () => {
      expect(stat.find("#txs").text()).toEqual("Transactions: " + util.delim_value(server_status.txs))
    })

    it("renders transactions not processed", () => {
      expect(stat.find("#txs_to_process").text()).toEqual("Not processed: " + util.delim_value(server_status.txs_to_process))
    })

    describe("txs_to_process outage", () => {
      test.todo("renders transactions not processed error")
    })

    it("renders filter matches", () => {
      expect(stat.find("#filter_matches").text()).toEqual("Filter Matches: " + util.delim_value(server_status.filter_matches))
    })

    it("renders filter matches not notified", () => {
      expect(stat.find("#non_notified_filter_matches").text()).toEqual("Not Notified: " + util.delim_value(server_status.non_notified_filter_matches))
    })

    it("renders filter notifications", () => {
      expect(stat.find("#notifications").text()).toEqual("Notifications: " + util.delim_value(server_status.notifications))
    })

    it("renders benchmarks", () => {
      let benchmarks = stat.findAll(".benchmarks")
      for(let i = 0; i<benchmarks.length; i++){
        expect(benchmarks.at(i).text()).toEqual(`${stat.vm.benchmarks[i]}: ${stat.vm.meta[stat.vm.benchmarks[i]].updated.toGMTString()}`)
      }
    })

    describe("benchmark outage", () => {
      it("renders benchmark error", () => {
        server_api = {
          methods : {
            load_server_status : jest.fn(function(){
              this.server_status = server_status
            }),
            benchmark_outage: function(benchmark){
              return benchmark == stat.vm.benchmarks[1];
            }
          }
        }
        stat = mount_vue(Status, {
          mixins: [server_api]
        })
        let benchmarks = stat.findAll(".benchmarks")
        for(let i = 0; i<benchmarks.length; i++){
          if(i == 1)
            expect(benchmarks.at(i).classes()).toContain('error')
          else
            expect(benchmarks.at(i).classes()).not.toContain('error')
        }
      })
    })

    it("renders meta", () => {
      let meta = stat.findAll("#meta")
      for(let i=0; i<meta.length; i++){
        expect(meta.at(i).findAll("div").at(1).text()).toEqual(`${stat.vm.other_meta[i]}:`)
        expect(meta.at(i).findAll("div").at(2).text()).toEqual(stat.vm.meta[stat.vm.other_meta[i]])
      }
    })

    it("renders transactions being processed", () => {
      expect(stat.find("#txs_being_processed").text()).toEqual("Transactions being processed" + stat.vm.txs_being_processed_str)
    })

    it("renders filters being notified", () => {
      expect(stat.find("#filters_being_notified").text()).toEqual("Filters being notified" + stat.vm.filters_being_notified_str)
    })

    it("renders filters exceeding batch size", () => {
      expect(stat.find("#filters_exceeding_batch_size").text()).toContain(stat.vm.filters_exceeding_batch_size_str)
    })
  })

  describe("computed", () => {
    describe("have_server_status", () => {
      describe("server status is populated", () => {
        it("is true", () => {
          expect(stat.vm.have_server_status).toBe(true)
        })
      })

      describe("server status is not populated", () => {
        it("is false", () => {
          stat = mount_vue(Status, {
            mixins : [{
              methods : {
                load_server_status : jest.fn()
              }
            }]
          })

          expect(stat.vm.have_server_status).toBe(false)
        })
      })
    })

    describe("txs_to_process", () => {
      it("is server_status.txs_to_process", () => {
        expect(stat.vm.txs_to_process).toEqual(server_status.txs_to_process)
      })
    })

    describe("meta", () => {
      it("is server_status.meta", () => {
        var meta = Object.assign({}, server_status.meta);
        Object.keys(meta).forEach(function(m){
          const is_benchmark = m.match(/.*benchmark/);
          if(is_benchmark){
            meta[m] = JSON.parse(meta[m]);
            meta[m].benchmark = true;
            if(meta[m].started)
              meta[m].started = new Date(Date.parse(meta[m].started))
            if(meta[m].updated)
              meta[m].updated = new Date(Date.parse(meta[m].updated))
          }
        })
        expect(stat.vm.meta).toEqual(meta)
      })

      it("sets benchmark flag on benchmarks", () => {
        Object.keys(stat.vm.meta).forEach(function(m){
          const is_branch = m.match(/.*benchmark/)
          if(is_branch) expect(stat.vm.meta[m].benchmark).toBe(true)
        })
      })

      it("sets parsed on benchmarks", () => {
          Object.keys(stat.vm.meta).forEach(function(m){
            const is_branch = m.match(/.*benchmark/)
            if(is_branch){
              let meta = JSON.parse(server_status.meta[m])
              for(let key in meta){
                expect(stat.vm.meta[m][key]).toBeTruthy()
              }
            }
          })
      })

      it("parses started and updated dates", () => {
        Object.keys(stat.vm.meta).forEach(function(m){
          const is_branch = m.match(/.*benchmark/)
          if(is_branch){
            if(stat.vm.meta[m].updated)
              expect(stat.vm.meta[m].updated).toBeA(Date)
            if(stat.vm.meta[m].started)
              expect(stat.vm.meta[m].started).toBeA(Date)
          }
        })
      })
    })

    describe("meta_keys", () => {
      it("is metadata keys", () => {
        expect(stat.vm.meta_keys).toEqual(Object.keys(stat.vm.meta))
      })
    })

    describe("benchmarks", () => {
      it("is benchmark metadata keys", () => {
        expect(stat.vm.benchmarks).toEqual(stat.vm.meta_keys.filter((m) => stat.vm.meta[m].benchmark))
      })
    })

    describe("other_meta", () => {
      it("is non-benchmark metadata keys", () => {
        expect(stat.vm.other_meta).toEqual(stat.vm.meta_keys.filter((m) => !stat.vm.meta[m].benchmark))
      })
    })

    describe("txs_being_processed_str", () => {
      it("fromatted txs_being_processed string", () => {
        expect(stat.vm.txs_being_processed_str).toEqual(server_status.txs_being_processed.join(", "))
      })
    })

    describe("filters_being_notified_str", () => {
      it("formatted filters_being_notified string", () => {
        expect(stat.vm.filters_being_notified_str).toEqual(server_status.filters_being_notified.join(", "))
      })
    })

    describe("filters_exceeding_batch_size_str", () => {
      it("formatted filters_violating_batch_size string", () => {
        const expected = server_status
                           .filters_violating_batch_sizes
                           .map(function(f) {
                             return f.id + "(" + f.num + ")"
                           }).join(", ")

        expect(stat.vm.filters_exceeding_batch_size_str).toEqual(expected)
      })
    })

    describe("outages", () => {
      describe("txs_to_process", () => {
        describe("txs_to_process > outage threshold", () => {
          it("is true", () => {
            let stat = mount_vue(Status, {
              mixins: [server_api],
              computed: {
                txs_to_process: function(){
                  return ziti.outage_thresholds.txs_not_processed + 1
                }
              }
            })
            expect(stat.vm.outages).toEqual({txs_to_process: true})
          })
        })

        describe("txs_to_process <= outage threshold", () => {
          it("is false", () => {
            let stat = mount_vue(Status, {
              mixins: [server_api],
              computed: {
                txs_to_process: function(){
                  return ziti.outage_thresholds.txs_not_processed - 1
                }
              }
            })
            expect(stat.vm.outages).toEqual({txs_to_process: false})
          })
        })
      })
    })
  })

  describe("methods", () => {
    describe("#benchmark_outage", () => {
      describe("benchmark exceeded outage threshold", () => {
        it("returns true", () => {
          server_api = {
            methods : {
              load_server_status : jest.fn(function(){
                this.server_status = server_status
              }),
              benchmark_outage_timeout: function(benchmark){
                return new Date() - this.meta[benchmark].updated - 1
              }
            }
          }
          stat = mount_vue(Status, {
            mixins: [server_api]
          })
          expect((stat.vm.benchmark_outage(stat.vm.benchmarks[0]))).toBe(true)
        })
      })

      describe("benchmark did not exceed outage threshold", () => {
        it("returns false", () => {
          server_api = {
            methods : {
              load_server_status : jest.fn(function(){
                this.server_status = server_status
              }),
              benchmark_outage_timeout: function(branchmark){
                return new Date()
              }
            }
          }
          stat = mount_vue(Status, {
            mixins: [server_api]
          })
          expect((stat.vm.benchmark_outage(stat.vm.benchmarks[0]))).toBe(false)
        })
      })
    })
  })

  describe("#created", () => {
    it("loads server status", () => {
      expect(server_api.methods.load_server_status).toHaveBeenCalledTimes(1);
    })

    it("starts periodic loading of server status", () => {
      let times = 3;
      expect(server_api.methods.load_server_status).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(config.STATUS_REFRESH * times)
      expect(server_api.methods.load_server_status).toHaveBeenCalledTimes(1 + times);
    })
  })

  describe("#destroyed", () => {
    it("stops periodic loading of server status", () => {
      expect(server_api.methods.load_server_status).toHaveBeenCalledTimes(1);
      stat.destroy()
      jest.advanceTimersByTime(config.STATUS_REFRESH)
      expect(server_api.methods.load_server_status).toHaveBeenCalledTimes(1);
    })
  })
})
