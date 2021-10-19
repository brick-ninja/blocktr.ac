<!--
  * Batch Settings Form
  * Allows the user to set the batch size, the number of
  * transactions to accumulate before sending a notification.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div id="batch_settings">
    <h4 id="batch_size_title">Batch:</h4>

    <div id="batch_size_explanation">
    Controls how many transactions to queue up before you receive a notification.
    </div>

    <div>
      <b-form-group>
        <b-form-radio-group id="batch_size"
                            v-model="batch_size"
                            :options="batch_sizes" buttons />
      </b-form-group>
    </div>

    <div id="batch_size_summary">
    Receive notifications after <b>{{batch_size}}</b> transactions
    </div>
  </div>
</template>

<script>
import Authentication from '../../mixins/authentication'

export default {
  name: 'BatchSettingsForm',

  mixins : [Authentication],

  data : function(){
    return {
      batch_size : null
    }
  },

  computed : {
    // TODO also add privilege batch size if set
    batch_sizes : function(){
      return this.membership_features.batch_sizes.map(function(bs){
        return {
          value : bs,
          text : bs.toString()
        }
      })
    }
  },

  created : function(){
    this.batch_size = this.profile.batch_size
  }
}
</script>

<style scoped>
#batch_settings{
  border-bottom: 1px solid var(--theme-color3);
  font-family: var(--theme-font1);
}

#batch_size_title{
  font-family: var(--theme-font5);
}

#batch_size{
  display: flex;
  margin-top: 10px;
}

#batch_size_summary{
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;
}
</style>

<style>
#batch_size .btn{
  background-color: var(--theme-color6);
  color: black;
  border: 1px solid #D7DDE0
}

#batch_size .btn.active{
  background-color: var(--theme-color1);
  color: white;
}
</style>
