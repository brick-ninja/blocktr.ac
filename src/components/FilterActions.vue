<!--
  * Filter Actions Buttons
  * Rendered on Filter Details and Tester pages (in dropdown in
  * smaller resolutions), providing high level filter-related
  * navigation and actions.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="filter_actions">
    <router-link :to="'/filter/' + active_filter.id">
      <span id="live_link"
            class="filter_action"
            v-if="!is_filter_page">
          <img src="../assets/filters-back.png" width="25px" height="25px" />
          <span>Back to Live Filtering</span>
      </span>
    </router-link>

    <router-link :to="'/test/' + active_filter.id">
      <div id="test_link"
            class="filter_action"
            v-if="!is_test_page">
          <img src="../assets/gear.svg" />
          <span>Test Filter</span>
      </div>
    </router-link>

    <div id="edit_link"
          class="filter_action"
          @click="run_action('edit_filter')">
      <img src="../assets/pencil.svg">
      <span>Edit</span>
    </div>

    <div id="duplicate_link"
          class="filter_action"
          @click="run_action('duplicate_filter')">
      <img src="../assets/duplicate.svg">
      <span>Duplicate...</span>
    </div>

    <div id="delete_link"
          class="filter_action"
          @click="run_action('delete_filter')">
      <img src="../assets/trash-white.svg">
      <span id="delete_text">Delete</span>
    </div>
  </div>
</template>

<script>
import FilterPages from '../mixins/filter_pages'
import ServerAPI   from '../mixins/server_api'

export default {
  name: 'FilterActions',

  mixins : [FilterPages, ServerAPI],

  methods : {
    run_action : function(modal){
      if(this.$parent.hide)
        this.$parent.hide();
      this.$bvModal.show(modal);
    }
  }
}
</script>

<style scoped>
#filter_actions{
  display: flex;
}

#filter_details #filter_actions{
  min-width: 400px;
}

#filter_tester #filter_actions{
  min-width: 500px;
}

#main_layout.sm #filter_actions,
#main_layout.xs #filter_actions{
  flex-direction: column;
  min-width: unset;
}

#filter_actions a{
  text-decoration: none;
}

.filter_action{
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;

  background-color: var(--theme-color1);
  color: white;
}

#main_layout.sm .filter_action,
#main_layout.xs .filter_action{
  margin: 5px;
}

.filter_action img{
  margin-right: 5px;
}

#live_link{
  background-color: var(--theme-color5);
}

#live_link a{
  color: white;
}

#delete_link{
  padding: 5px 20px;
}

#main_layout.sm #delete_link,
#main_layout.xs #delete_link{
  padding: 5px 10px;
}

#delete_link img{
  margin-right: 0;
}

#main_layout.sm #delete_link img,
#main_layout.xs #delete_link img{
  margin-right: 5px;
}

#delete_text{
  display: none;
}

#main_layout.sm #delete_text,
#main_layout.xs #delete_text{
  display: unset;
}
</style>
