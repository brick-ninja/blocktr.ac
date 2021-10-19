<!--
  * Filter Header Component
  * Rendered on Filter Details and Tester page, encapsulates
  * filter header, actions, and related modals.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="filter_header">
    <div id="filter_subheader">
      <div id="filter_subheader_icon">
        <img v-if="is_filter_page"
              src="../assets/down-triangle-lines-white.svg" />
        <img v-if="is_test_page"
              src="../assets/repeat.svg" />
      </div>

      <div>
        <FilterSummary :filter="active_filter" />
      </div>

    </div>

    <FilterActions v-if="mq_gte_md" />

    <div v-else id="expand_actions">
      <img id="expand_actions_icon" src="../assets/blue-dots.svg" />

      <b-popover target="expand_actions_icon"
                 container="expand_actions"
                 placement="bottomleft">
        <FilterActions />
      </b-popover>
    </div>

    <EditFilterModal      :filter="active_filter"
                          @edited="set_active_filter($event)" />
    <DuplicateFilterModal :filter="active_filter"
                         @created="set_active_filter($event)" />
    <DeleteFilterModal    :filter="active_filter"
                         @deleted="$router.push('/txs')" />
  </div>
</template>

<script>
import FilterPages   from '../mixins/filter_pages'
import ServerAPI     from '../mixins/server_api'

import DeleteFilterModal    from './modals/DeleteFilter'
import DuplicateFilterModal from './modals/DuplicateFilter'
import EditFilterModal      from './modals/EditFilter'

import FilterSummary from './FilterSummary'
import FilterActions from './FilterActions'

export default {
  name: 'FilterHeader',

  mixins : [FilterPages, ServerAPI],

  components : {
    FilterSummary,
    FilterActions,
    DeleteFilterModal,
    DuplicateFilterModal,
    EditFilterModal,
  }
}
</script>

<style scoped>
#filter_header{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--theme-color3);
}

#filter_subheader{
  display: flex;
  align-items: center;
  overflow: hidden;
  word-break: break-word;
}

#filter_subheader_icon{
  background-color: var(--theme-color1);
  margin-right: 10px;
  padding: 10px 13px;
  border-radius: 50%;
}

#expand_actions_icon{
  cursor: pointer;
  height: 30px;
}
</style>
