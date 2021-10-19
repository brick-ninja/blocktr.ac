<!--
  * Maintenance Page
  * Displayed whenever the app is in maintenance mode
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="maintenance_container">
    <MainTitle />

    <h3>We are currently undergoing maintenance</h3>
    <img :src="img" width="30%" />
    <h3>Please check back later</h3>
  </div>
</template>

<script>
import MainTitle   from './components/MainTitle'
import Blockchain  from './mixins/blockchain'
import Maintenance from './mixins/maintenance'

export default {
  name: 'Maintenance',

  mixins : [Blockchain, Maintenance],

  components: {
    MainTitle
  },

  computed : {
    img : function(){
      return require('./assets/maintenance/' +
              (this.no_blockchain_configured ?
                                'blockchain' :
           this.configured_blockchain_upper) +
                                      '.svg');
    }
  },

  created : function(){
    if(!this.maintenance_mode)
      this.$router.push({path : '/txs'});
  }
}
</script>

<style scoped>
#maintenance_container{
  height: 100%;
  padding: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;

  font-family: var(--theme-font1);
  background-color: #EEEEEE;
  border-radius: 15px;
}

#main_title_container{
  flex-grow: unset;
}

#maintenance_container h3{
  margin-top: 25px;
}

#maintenance_container img{
  margin: 25px;
}
</style>
