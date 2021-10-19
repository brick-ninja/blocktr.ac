<!--
  * Filter List Component
  * List of filters displayed in sidebase on larger resolutions.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div>
    <!-- XXX: include route path in key so filter nav changes update active class -->
    <div v-for="filter in filters"
         :key="$route.path + filter.id"
         class="filter_row"
         :class="{active : is_active_filter(filter)}">
      <router-link :to="'/filter/' + filter.id">
        <FilterSummary :filter="filter" />

        <div v-if="filter.total_matches > 0"
             class="filter_matches">
          {{filter.total_matches}}
        </div>

        <div>
          <img src="../assets/right-arrow.svg" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Authentication from '../mixins/authentication'
import ServerAPI      from '../mixins/server_api'
import FilterSummary  from './FilterSummary'

export default {
  name: 'FilterList',

  mixins : [Authentication, ServerAPI],

  components : {
    FilterSummary
  },

  methods : {
    is_active_filter : function(filter){
      return this.$route.path == "/filter/" + filter.id ||
             this.$route.path == "/test/"   + filter.id;
    }
  },

  created : function(){
    this.load_filters();
  }
}
</script>

<style scoped>
.filter_row{
  border-bottom: 1px solid var(--theme-color3);
  padding: 10px;
}

.filter_row a {
  color: #aeb5be;
  text-decoration: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter_row.active{
  background-color: var(--theme-color6);
  border: 1px solid var(--theme-color1);
  border-radius: 5px;
  border-radius: 3px;
}

.filter_row.active a{
  color: #425265;
}

.filter_matches{
  background-color: white;
  border-radius: 50%;
  margin-right: 10px;
  padding: 0 7px;
  font-family: var(--theme-font3);
  font-weight: bold;
}
</style>
