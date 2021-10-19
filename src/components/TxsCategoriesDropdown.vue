<!--
  * Txs Categories Dropdown Component
  * Displays toggleable list of categories on smaller layouts.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="tx_categories">
    <multiselect v-model="selected_categories"
                 :options="categories"
                 placeholder="Select Transaction Types"
                 :multiple="true"
                 :close-on-select="false"
                 :searchable="false"
                 selectLabel=""
                 deselectLabel="">
      <template slot="option" slot-scope="props">
        <div class="tx_category">
          <img :src="category_icon(props.option)" class="category_icon" />

          <div class="category_name">
            {{props.option.toLowerCase()}}
          </div>
        </div>
      </template>
    </multiselect>
  </div>
</template>

<script>
import HasTxCategories from '../mixins/has_tx_categories'

export default {
  name: 'TxsCategoriesDropdown',

  mixins : [HasTxCategories],

  data : function(){
    return {
      selected_categories : []
    };
  },

  computed : {
    categories : function(){
      return this.all_categories.filter(function(c){
               return c != "ALL";
             });
    }
  },

  watch : {
    selected_categories : function(new_categories, old_categories){
      if(new_categories.length == 0)
        this.$store.commit('clear_tx_categories');
      else{
        const added   = new_categories.filter(function(c){
                          return !old_categories.includes(c);
                        });
        const removed = old_categories.filter(function(c){
                          return !new_categories.includes(c);
                        });
        this.toggle_categories(added);
        this.toggle_categories(removed);
      }
    }
  }
}
</script>

<style scoped>
#tx_categories{
  padding: 5px 0;
}

.tx_category{
  display: flex;
}

.category_name{
  text-transform: capitalize;
  margin-left: 5px;
}
</style>
