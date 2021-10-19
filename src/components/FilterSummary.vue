<!--
  * Filter Summary Component
  * Consise high level summary of filter displayed in various
  * components in the site.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div>
    <div class="filter_title">
      <span>{{filter.name}}</span>
      <sup v-if="filter.disabled"
           class="filter_disabled">
        (Disabled)
      </sup>
    </div>

    <div v-if="filter.Template">
      <div class="template_name">{{filter.Template.name}}:</div>
      <div v-for="param in params" :key="param"
           class="template_param">
        {{param}}
      </div>
    </div>

    <div v-else>
      <div class="expression_title">Expression:</div>
      <div class="filter_expression">{{filter.jsonpath}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Summary',

  props : {
    filter : {
      type : Object,
      required : true
    }
  },

  computed : {
    params : function(){
      if(!this.filter.Template) return [];

      return this.filter.Template.params
                 .map(function(param, index){
                   return param['name'] + ": " + this.filter.params[index];
                 }.bind(this));
    }
  }
}
</script>

<style scoped>
.filter_title{
  font-weight: bold;
  font-family: var(--theme-font4);
}

.template_name,
.expression_title{
  font-style: italic;
  font-family: var(--theme-font4);
  font-size: 0.9rem;
}

.template_param,
.filter_expression{
  font-family: var(--theme-font2);
  font-size: 0.8rem;
}

.filter_disabled{
  font-style: italic;
  font-weight: normal;
  color: red;
  font-size: 0.8rem;
}
</style>
