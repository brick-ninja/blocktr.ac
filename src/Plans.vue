<!--
  * Plans Page
  * Renders payment plans for user selection with options for
  * additional addons. Once user selects plan they will be taken
  * to Plan page rendering overview and futhur customization.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="plans">
    <div id="plans">
      <h3>Plans</h3>

      <div id="plans_container">
        <div v-for="(plan, name) in plans"
             :key="name"
             class="plan"
             :class="{suggested : is_suggested_plan(name),
                      top_level : is_top_plan(name)}">
          <div class="plan_header">
            <h4 class="plan_name">
              {{name}}
              <span v-if="is_current_plan(name)">(Current Plan)</span>
            </h4>

            <h5 class="plan_cost">
              <b>{{plan.cost == 0 ? "Free" : "$" + plan.cost}}</b>
              <span v-if="plan.cost != 0"> /month</span>
            </h5>

            <div class="plan_details">
              <div class="plan_detail">
                <div class="label">Filters:</div>
                <span class="value">
                  <b>{{plan.filters}}</b>
                </span>
              </div>

              <div class="plan_detail">
                <div class="label">Sinks:</div>
                <span class="value">
                  <b>{{plan.sinks}}</b>
                </span>
              </div>

              <div class="plan_detail">
                <div class="label">Alert time:</div>

                <span class="value">
                  <b>{{plan.notification_times.includes(0) ? 'Instant' : plan.notification_times[0]}}</b>
                  <span v-if="!plan.notification_times.includes(0)"> min</span>
                </span>
              </div>
            </div>
          </div>

          <div class="plan_additions">
            <div class="buy_additional">
              <b-form-checkbox v-model="enable_additional_by_plan[name]"
                               class="form_switch" switch>
                <span class="enable_additional"
                     :class="{active : enable_additional_by_plan[name]}">Buy additional</span>
              </b-form-checkbox>
            </div>

            <table class="additional_items">
              <tr>
                <td>Filters:</td>
                <td><b-form-spinbutton class="additional_item" inline
                                       :max="max_filters"
                                       v-model="selected_additional_filters_by_plan[name]"
                                       :disabled="!enable_additional_by_plan[name] || max_filters == 0"/></td>
              </tr>

              <tr>
                <td>Sinks:</td>
                <td><b-form-spinbutton class="additional_item" inline
                                       :max="max_sinks"
                                       v-model="selected_additional_sinks_by_plan[name]"
                                       :disabled="!enable_additional_by_plan[name] || max_sinks == 0"/></td>
              </tr>
            </table>

            <router-link :to="{name: 'plan',
                               params: {plan : name,
                           specified_filters : selected_additional_filters_by_plan[name],
                             specified_sinks : selected_additional_sinks_by_plan[name]}}"
                         v-if="upgrade_enabled[name]">
              <b-button class="upgrade">
                Upgrade ${{total_cost[name]}}
              </b-button>
            </router-link>

            <b-button v-else-if="!logged_in"
                      class="upgrade"
                      v-b-modal.login_modal>
              Login to Upgrade
            </b-button>

            <b-button class="upgrade" v-else disabled>
              <span v-if="is_current_plan(name)">Current Plan</span>
              <span v-else>Subscription Ends in {{expires}} days</span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout'
import Authentication from './mixins/authentication'
import Maintenance    from './mixins/maintenance'
import TotalCost from './mixins/cost_calculator'

import config from './config/config'
import ziti   from './config/ziti'

export default {
  name: 'Plans',

  mixins : [Authentication, TotalCost, Maintenance],

  components: {
    MainLayout
  },

  data : function(){
    return {
      levels : ziti.membership_levels,
      plans : ziti.membership_features
    }
  },

  computed : {
    top_plan : function(){
      return this.levels[this.levels.length-1];
    },

    suggested_plan : function(){
      if(this.membership_level == this.top_plan)
        return null;

      return this.levels[this.levels.indexOf(this.membership_level)+1];
    },

    max_filters : function(){
      return ziti.max_additions.filters - this.additional_filters;
    },

    max_sinks : function(){
      return ziti.max_additions.sinks - this.additional_sinks;
    },
    
    upgrade_enabled : function(){
      var enabled = {};

      // Must be logged in to upgrade
      if(!this.logged_in){
        for(var l = 0; l < this.levels.length; l += 1)
          enabled[this.levels[l]] = false

        return enabled;
      }

      // only enable for current level if purchasing additional options
      enabled[this.membership_level] =
        this.total_cost[this.membership_level] > 0;

      // no downgrades
      var level_index = this.levels.indexOf(this.membership_level);
      if(level_index != 0)
        for(l = 0; l < level_index; l += 1)
          enabled[this.levels[l]] = false;

      // allow upgrade
      if(level_index != this.levels.length - 1)
        for(l = level_index + 1; l < this.levels.length; l += 1)
          enabled[this.levels[l]] = true;

      return enabled;
    },

    expires : function(){
      const remaining = Date.parse(this.renewal_date) - Date.now()
      const days = (remaining / 1000 / 60 / 60 / 24).toFixed(0)
      return days;
    }
  },

  watch : {
    enable_additional_by_plan : {
      handler : function(){
        Object.keys(this.plans).forEach(function(plan){
          if(!this.enable_additional_by_plan[plan]){
            this.selected_additional_filters_by_plan[plan] = 0;
            this.selected_additional_sinks_by_plan[plan] = 0;
          }
        }.bind(this))
      },

      deep : true
    }
  },

  methods : {
    is_current_plan : function(plan){
      return this.membership_level == plan;
    },

    is_suggested_plan : function(plan){
      return this.suggested_plan == plan;
    },

    is_top_plan : function(plan){
      return this.top_plan == plan;
    }
  },

  created : function(){
    if(this.maintenance_mode){
      this.nav_to_maintenance();
      return;
    }
  }
}
</script>

<style scoped>
#plans{
  margin: auto;
  margin-top: 20px;
}

#plans h3{
  font-family: var(--theme-font3);
}

#plans_container{
  display: flex;
  justify-content: space-evenly;
}

#main_layout.md #plans_container,
#main_layout.sm #plans_container,
#main_layout.xs #plans_container{
  flex-direction: column;
}

.plan{
  border: 3px solid var(--theme-color3);
  background-color: white;
  border-radius: 5px;
  width: 300px;
  margin: auto;
}

#main_layout.md .plan,
#main_layout.sm .plan,
#main_layout.xs .plan{
  margin-bottom: 20px;
}

.plan.suggested{
  border: 3px solid var(--theme-color1);
}

.plan.top_level{
  border: 3px solid #FCD16D;
}

.plan_header{
  background-color: var(--theme-color1);
  color: white;
  padding: 20px;
  text-align: center;
}

#main_layout.lg .plan_header{
  padding: 20px 5px;
}

.plan.suggested .plan_header{
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.plan.top_level .plan_header{
  background-color: #FCD16D;
  color: #8e8e8e;
}

.plan_name{
  text-transform: capitalize;
  font-family: var(--theme-font5);
}

.plan_cost{
  margin-bottom: 10px;
  font-family: var(--theme-font5);
}

.plan_details{
  display: flex;
  justify-content: space-between;
}

.plan_detail{
  border-right: 1px solid #cdd0d3;
  padding: 15px;
  padding-top: 0;
  padding-bottom: 0;
}

.plan_detail .label{
  font-family: var(--theme-font1);
}

.plan_detail .value{
  font-family: var(--theme-font2);
}

.plan_detail:last-child{
  border-right: none;
}

.plan_additions{
  margin-top: 5px;
  text-align: center;
}

.buy_additional{
  margin-top: 15px;
  margin-bottom: 15px;
}

.enable_additional{
  color: gray;
}

.enable_additional.active{
  color: black;
}

.additional_items{
  width: 85%;
  margin: auto;
  font-family: var(--theme-font1);
}

.additional_item{
  border: none;
  margin-top: 5px;
  margin-bottom: 5px;
}

.upgrade{
  background-color: var(--theme-color1);
  border: none;
  border-radius: 25px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.top_level .upgrade{
  background-color: #FCD16D;
  color: #8e8e8e;
}
</style>

<style>
.top_level .form_switch.custom-switch .custom-control-label::after{
  background-color: #FCD16D;
  opacity: 0.8;
}

.top_level .form_switch.custom-switch .custom-control-input:checked ~ .custom-control-label::before{
  background-color: var(--theme-color1);
  border-color: none;
}

.top_level .form_switch.custom-switch .custom-control-input:checked ~ .custom-control-label::after{
  background-color: #FCD16D;
  opacity: unset;
}
</style>
