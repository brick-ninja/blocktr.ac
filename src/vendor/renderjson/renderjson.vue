<template>
  <div :id="id" :ref="id" />
</template>

<script>
import style from './renderjson.css'
import renderjson from './renderjson.js'

renderjson.set_show_to_level(1);

export default {
  name: 'renderjson',

  props : {
    data : {},
    level : null
  },

  computed : {
    id : function(){
      return "renderjson-" + Math.random();
    }
  },

  watch : {
    data : function(){
      var div = this.$refs[this.id];
      var rendered = renderjson(this.data);

      div.innerHTML = "";
      div.appendChild(rendered)
    }
  },

  mounted : function(){
    if(this.level)
      renderjson.set_show_to_level(this.level);

    var div = this.$refs[this.id];
    var rendered = renderjson(this.data);
    div.appendChild(rendered)
  },

  beforeDestroy : function(){
  },
}
</script>

<style scoped>
</style>
