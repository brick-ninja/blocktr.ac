<!--
  * Status Page
  * Renders application status
  *
  * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="status">
    <h1>Server Status</h1>

    <b-container v-if="have_server_status"
                 id="status_container">
      <b-row>
        <b-col id="date">
          <u>{{(new Date(Date.now())).toGMTString()}}</u>
        </b-col>
      </b-row>

      <b-row>
        <b-col id="users" class="card">
          Users: {{server_status.users | delim}}
        </b-col>

        <b-col id="filters" class="card">
          Filters: {{server_status.filters | delim}}
        </b-col>

        <b-col id="sinks" class="card">
          Sinks: {{server_status.sinks | delim}}
        </b-col>

        <b-col id="filter_sinks" class="card">
          Filter Sinks: {{server_status.filter_sinks | delim}}
        </b-col>
      </b-row>

      <b-row>
        <b-col id="txs" class="card">
          Transactions: {{server_status.txs | delim}}
        </b-col>

        <b-col id="txs_to_process" class="card"
               :class="{error : outages.txs_to_process}">
          Not processed: {{txs_to_process | delim}}
        </b-col>
      </b-row>

      <b-row>
        <b-col id="filter_matches" class="card">
          Filter Matches: {{server_status.filter_matches | delim}}
        </b-col>

        <b-col id="non_notified_filter_matches" class="card">
          Not Notified: {{server_status.non_notified_filter_matches | delim}}
        </b-col>

        <b-col id="notifications" class="card">
          Notifications: {{server_status.notifications | delim}}
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Benchmarks</h3>
          <b-list-group>
            <b-list-group-item v-for="benchmark in benchmarks"
                                :key="benchmark"
                               class="benchmarks"
                              :class="{error : benchmark_outage(benchmark)}">
              <div style="float: left">{{benchmark}}:</div>
              <div style="float: right">{{meta[benchmark].updated.toGMTString()}}</div>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Meta</h3>
          <b-list-group>
            <b-list-group-item id="meta"
                            v-for="ometa in other_meta"
                             :key="ometa">
              <div style="float: left">{{ometa}}:</div>
              <div style="float: right">{{meta[ometa]}}</div>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col id="txs_being_processed">
          <h3>Transactions being processed</h3>
          {{txs_being_processed_str}}
        </b-col>
      </b-row>

      <b-row>
        <b-col id="filters_being_notified">
          <h3>Filters being notified</h3>
          {{filters_being_notified_str}}
        </b-col>
      </b-row>

      <b-row>
        <b-col id="filters_exceeding_batch_size">
          <h3>Filters exceeding batch size</h3>
          {{filters_exceeding_batch_size_str}}
        </b-col>
      </b-row>
    </b-container>
  </MainLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'
import MainLayout     from './components/MainLayout'

import config         from './config/config'
import ziti           from './config/ziti'

export default {
  name: "Status",

  mixins : [Authentication, ServerAPI],

  components: {
    MainLayout
  },

  computed : {
    have_server_status : function(){
      return Object.keys(this.server_status).length > 0;
    },

    txs_to_process : function(){
      return this.server_status.txs_to_process;
    },

    meta : function(){
      // Copy metadata object
      var _meta = Object.assign({}, this.server_status.meta);

      // Iterate over instances
      Object.keys(_meta).forEach(function(m){
        // Set benchmark flag
        const is_benchmark = m.match(/.*benchmark/);

        // Parse and set JSON
        if(is_benchmark){
          _meta[m] = JSON.parse(_meta[m]);
          _meta[m].benchmark = true;

          if(_meta[m].started)
            _meta[m].started = new Date(Date.parse(_meta[m].started))
          if(_meta[m].updated)
            _meta[m].updated = new Date(Date.parse(_meta[m].updated))
        }
      })

      return _meta;
    },

    meta_keys : function(){
      return Object.keys(this.meta);
    },

    benchmarks : function(){
      return this.meta_keys.filter(function(m){
        return this.meta[m].benchmark;
      }.bind(this))
    },

    other_meta : function(){
      return this.meta_keys.filter(function(m){
        return !this.meta[m].benchmark;
      }.bind(this))
    },

    txs_being_processed_str : function(){
      return this.server_status
                 .txs_being_processed
                 .join(", ");
    },

    filters_being_notified_str : function(){
      return this.server_status
                 .filters_being_notified
                 .join(", ");
    },

    filters_exceeding_batch_size_str : function(){
      return this.server_status
                 .filters_violating_batch_sizes
                 .map(function(f) {
                   return f.id + "(" + f.num + ")"
                 }).join(", ")
    },

    outages : function(){
      // TODO: other outages
      //   - individual listen_to_txs sync
      //   - individual filters w/ excessive not notified
      //   - log errors
      return {
        txs_to_process : (this.txs_to_process > ziti.outage_thresholds.txs_not_processed)
      };
    }
  },

  methods : {
    // XXX: keep in sync with ziti workers
    benchmark_outage_timeout : function(benchmark){
      if(benchmark.match(/.*_listen_to_txs\.benchmark/))
        return ziti.outage_timeouts.listen_to_txs;

      else if(benchmark.match(/.*_run_filters\.[0-9]+\.benchmark/))
        return ziti.outage_timeouts.run_filters;

      else if(benchmark.match(/.*_run_filters\.cleanup_transactions\.benchmark/))
        return ziti.outage_timeouts.cleanup_txs;

      else if(benchmark.match(/.*_run_filters\.reset_interval_tallies\.benchmark/))
        return ziti.outage_timeouts.reset_interval_tallies;

      else if(benchmark.match(/.*\.notify_sinks\.[0-9]+\.benchmark/))
        return ziti.outage_timeouts.notify_sinks;

      else if(benchmark.match(/.*\.notify_sinks\.cleanup_matches\.benchmark/))
        return ziti.outage_timeouts.cleanup_matches;

      else if(benchmark.match(/.*\.notify_sinks\.cleanup_notifications\.benchmark/))
        return ziti.outage_timeouts.cleanup_notifications;

      else if(benchmark.match(/.*\.maint\.register_users\.benchmark/))
        return ziti.outage_timeouts.register_users;

      else if(benchmark.match(/.*\.maint\.reset_passwords\.benchmark/))
        return ziti.outage_timeouts.reset_passwords;

      else if(benchmark.match(/.*\.maint\.billing\.benchmark/))
        return ziti.outage_timeouts.billing;

      else if(benchmark.match(/.*\.maint\.reset_privileges\.benchmark/))
        return ziti.outage_timeouts.reset_privileges;

      else if(benchmark.match(/.*\.maint\.notify_outages\.benchmark/))
        return ziti.outage_timeouts.notify_outages;

      else if(benchmark.match(/.*\.maint\.cleanup_logs\.benchmark/))
        return ziti.outage_timeouts.cleanup_logs;

      throw "unknown benchmark"
    },

    benchmark_outage : function(benchmark){
      const now = new Date();
      const timeout = this.benchmark_outage_timeout(benchmark);
      return (now - this.meta[benchmark].updated) > timeout;
    }
  },

  created : function(){
    this.load_server_status();

    this.refresh = setInterval(function(){
      this.load_server_status();
    }.bind(this), config.STATUS_REFRESH)
  },

  destroyed : function(){
    clearInterval(this.refresh)
  }
}
</script>

<style scoped>
#status_container{
  text-align: center;
}

#status_container .col{
  padding: 15px;
  margin: 5px;
}

#status_container .card{
  border: 1px solid var(--theme-color1);
  border-radius: 5px;
}

#status_container .error{
  background-color: red;
  color: yellow;
  font-weight: bold;
}
</style>
