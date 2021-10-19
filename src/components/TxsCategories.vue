<!--
  * Txs Categories Component
  * Displays toggleable list of categories on larger layouts.
  * Replaced with TxsCategoriesDropdown on smaller layouts.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-list-group horizontal id="tx_categories">
    <b-list-group-item v-for="category in primary_categories"
                        :key="category"
                         :id="'category-' + category"
                       class="tx_category primary_category"
                      :class="{enabled : is_enabled(category)}"
                      @click="toggle_category(category)">
      <img :src="category_icon(category)" class="category_icon" />

      <span class="category_name"
           :class="{enabled : is_enabled(category)}">
        {{category.toLowerCase()}}
      </span>

      <span class="category_tally"
           :class="{enabled : is_enabled(category)}"
            v-if="category_tallies[category] != 0">
        ({{category_tallies[category] | delim}})
      </span>
    </b-list-group-item>

    <b-list-group-item id="primary_secondary_separator">
      Other:
    </b-list-group-item>

    <b-list-group-item v-for="category in secondary_categories"
                        :key="category"
                         :id="'category-' + category"
                       class="tx_category secondary_category"
                      :class="{enabled : is_enabled(category)}"
                      @click="toggle_category(category)">
      <img :src="category_icon(category)"
            :id="'category-icon-' + category"
          class="category_icon" />

      <span class="category_tally"
            v-if="category_tallies[category] != 0">
        ({{category_tallies[category] | delim}})
      </span>

      <b-tooltip :target="'category-icon-' + category"
                 variant="light" placement="bottom">
        <span class="category_tooltip">
          {{category.toLowerCase()}}
        </span>
      </b-tooltip>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import HasTxCategories from '../mixins/has_tx_categories'

export default {
  name: 'TxsCategories',
  mixins : [HasTxCategories]
}
</script>

<style scoped>
#tx_categories{
  padding: 10px;
  padding-left: 30px;
  align-items: center;
}

#tx_categories .list-group-item{
  padding: 0;
  border: none;
}

.tx_category{
  cursor: pointer;
  display: flex;
  align-items: center;
}

.primary_category{
  flex-basis: 17%;
}

.secondary_category{
  flex-basis: 5%;
}

#primary_secondary_separator{
  flex-grow: 1;
  text-align: right;
  margin-right: 10px;
  font-size: 0.9rem;
}

.category_icon{
  width: 15px;
  height: 15px;
}

.category_name{
  text-transform: capitalize;
  font-size: 0.9rem;
  margin-left: 5px;
}

.category_name:not(.enabled){
  color: var(--theme-color2);
  opacity: 0.4;
}

.category_tally{
  font-size: 0.9rem;
  margin-left: 3px;
}

.category_tally:not(.enabled){
  color: var(--theme-color2);
  opacity: 0.4;
}

.category_tooltip{
  text-transform: capitalize;
  font-family: var(--theme-font1);
}
</style>
