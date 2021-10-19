<!--
  * Filter Details Page
  * Renders details of a single filter, specified by ID
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <TxsLayout section="filter">
    <div id="filter_details">
      <FilterHeader />

      <div v-if="filter_matches.length == 0" id="no_matches">
        <img id="no_matches_icon"
             src="./assets/bell-green-border.svg" />

        <div id="no_matches_text">
          No matches at the moment
        </div>

        <div v-if="have_sinks"
             id="notifications_text">
          <span id="get_notifications">You will get notifications via {{sinks_text}}</span>
        </div>

        <div id="check_filter">
          Check your filter for proper composition
        </div>

        <div id="test_link">
          <router-link :to="'/test/' + id">
            <img id="test_link_icon"
                 src="./assets/gear.svg" />
            <span>Test filter</span>
          </router-link>
        </div>
      </div>

      <div v-else>
        <b-list-group>
          <b-list-group-item id="matched_txs_explanation">
            <img src="./assets/info.svg" />
            <span>
              The following are transactions which your filter has matched.
              <template v-if="active_filter.total_matches > match_history">
                <span id="match_history">Only the last {{match_history}} matches are shown.</span>
              </template>
            </span>
          </b-list-group-item>

          <b-list-group-item v-for="tx in filter_match_txs"
                             :key="tx.hash"
                             class="tx_summary_container">
            <TxSummary :tx="tx" />
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import Authentication  from './mixins/authentication'
import ServerAPI       from './mixins/server_api'
import MultiBlockchain from './mixins/multi_blockchain'
import Maintenance     from './mixins/server_api'

import TxsLayout      from './components/TxsLayout'
import FilterHeader   from './components/FilterHeader'
import TxSummary      from './components/TxSummary'

import config         from './config/config'
import ziti           from './config/ziti'

export default {
  name: 'FilterDetails',

  mixins : [
    Authentication,
    ServerAPI,
    MultiBlockchain,
    Maintenance
  ],

  components: {
    TxsLayout,
    FilterHeader,
    TxSummary
  },

  props : {
    id : Number
  },

  computed : {
    have_sinks : function(){
      return !!this.active_filter &&
             !!this.active_filter.Sinks &&
               this.active_filter.Sinks.length > 0;
    },

    sinks_text : function(){
      return this.active_filter.Sinks.map(function(sink){
               return sink.type + " " + sink.target;
             }).join(", ")
    },

    match_history : function(){
      return ziti.filter_match_history
    },

    filter_match_txs : function(){
      return this.filter_matches.map((match) => {
               return match.Transaction.raw;
             });
    }
  },

  watch : {
    // XXX: need to watch route incase switching between filters
    $route : function(){
      this.load();
    },
    sinks: function(){
      if(this.active_filter) {
        this.load_filter(this.active_filter.id)
      }
    }
  },

  methods : {
    load : function(){
      // XXX: clear filter matches before persisting blockchain
      this.filter_matches = [];

      this.load_filter(this.id)
          .then(function(){
            this.persist_blockchain(this.active_filter.blockchain);
            this.$nextTick(function(){
              this.load_filter_matches(this.id)
            }.bind(this))
          }.bind(this))
    }
  },

  created : function(){
    if(this.maintenance_mode){
      this.nav_to_maintenance();
      return;
    }

    this.load();
  }
}
</script>

<style scoped>
#filter_details{
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#no_matches{
  padding: 25px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#no_matches_text,
#notifications_text{
  font-family: var(--theme-font1);
}

#get_notifications{
  color: #ABB5BF;
}

#no_matches_icon{
  margin-bottom: 25px;
}

#check_filter{
  font-size:0.8rem;
  margin-top: 30px;
  font-family: var(--theme-font4);
  color: var(--theme-color2);
  opacity: 0.6;
}

#test_link{
  padding: 5px 65px;
  margin-top: 5px;

  border-radius: 15px;
  background-color: var(--theme-color1);
}

#test_link a{
  text-decoration: none;
  font-family: var(--theme-font3);
  font-weight: bold;

  color: white;
  display: flex;
}

#test_link_icon{
  margin-right: 10px;
}

#matched_txs_explanation{
  display: flex;
  align-items: center;
}

#main_layout.sm #matched_txs_explanation,
#main_layout.xs #matched_txs_explanation{
  padding: 10px;
}

#matched_txs_explanation span{
  opacity: 0.6;
  font-size: 0.9rem;
  font-family: var(--theme-font4);
  color: var(--theme-color2);
}

#matched_txs_explanation img{
  margin-right: 5px;
  min-width: 20px;
}

.tx_summary_container{
  padding: 0px;
}
</style>
