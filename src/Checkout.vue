<!--
  * Checkout Page
  * Final page in the checkout process, where user specifies
  * payment details and receives confirmation after being charged.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="checkout">
    <div id="success_checkout" v-if="success">
      <div id="success_img_container">
        <img id="success_img" src="./assets/green-check.svg"/>
      </div>

      <h4>
        You have been successfully upgraded your plan!
      </h4>

      <div>
        You can manage you plans from
        <router-link to="/profile">your account</router-link>
      </div>
    </div>

    <div id="checkout_container" v-else>
      <h3>Checkout</h3>

      <div id="checkout_subcontainer">
        <h4 id="enjoy">
          Enjoy your {{period ? (period + ' month') : ''}} <span class="plan_name">{{plan}}</span> Plan
        </h4>

        <h5>
          <b>Total Due: ${{total_cost}}</b>
        </h5>

        <div id="next_payment">
          Next payment: {{next_payment}}
        </div>

        <table id="payment_details">
          <tr v-if="has_credit_card">
            <td colspan="2"
                id="use_existing_credit_card_wrapper">
              <b-form-checkbox switch
                 v-model="use_existing_credit_card">
                Use Existing Credit Card
              </b-form-checkbox>
            </td>
          </tr>

          <tr>
            <td v-if="mq_gte_md"
                class="form_text">
              Card Number:
            </td>

            <td>
              <div v-if="mq_lt_md"
                  class="form_text">
                Card Number:
              </div>

              <div id="credit_card_number_wrapper">
                <input id="credit_card_number"
                       class="form_input"
                       type="text"
                       maxlength="19"
                       size="19"
                       :disabled="has_credit_card && use_existing_credit_card"
                       :value="credit_card_number_with_dashes"
                       @input="set_credit_card_number($event.target.value)" />

                <div class="form_text form_error">
                  <span v-if="invalid_credit_card_number">Must be 14 to 16 digits</span>
                  <span v-else class="placeholder" />
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td v-if="mq_gte_md"
                class="form_text">
              Security Code:
            </td>

            <td>
              <div v-if="mq_lt_md"
                  class="form_text">
                Security Code:
              </div>

              <div id="credit_card_cvc_wrapper">
                <input id="credit_card_cvc"
                       class="form_input"
                       type="text"
                       maxlength="3"
                       size="3"
                       :disabled="has_credit_card && use_existing_credit_card"
                       :value="credit_card_cvc"
                       @input="evnt=> credit_card_cvc = evnt.target.value" />

                <div class="form_text form_error">
                  <span v-if="invalid_credit_card_cvc">Must be 3 digits</span>
                  <span v-else class="placeholder" />
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td v-if="mq_gte_md"
                class="form_text">
              Expiration Date:
            </td>

            <td>
              <div v-if="mq_lt_md"
                  class="form_text">
                Expiration Date:
              </div>

              <div id="credit_card_expiration_wrapper">
                <b-form-select id="credit_card_month"
                               :disabled="has_credit_card && use_existing_credit_card"
                               v-model="credit_card_month"
                               :options="credit_card_months" />

                <b-form-select id="credit_card_year"
                               :disabled="has_credit_card && use_existing_credit_card"
                               v-model="credit_card_year"
                               :options="credit_card_years" />
              </div>
            </td>
          </tr>

          <tr>
            <td colspan="2" id="tos_agree">
              <b-form-checkbox v-model="tos_agree">
              I agree to the <router-link to="/terms" target="_blank">Terms of Service</router-link>
              </b-form-checkbox>
            </td>
          </tr>

          <tr>
            <td v-if="mq_gte_md"></td>
            <td id="place_order_wrapper">
              <b-spinner id="spinner"
                         type="grow"
                         v-if="order_submitted" />

              <b-button id="place_order"
                        :disabled="!is_valid || order_submitted"
                        @click="submit">
                Place Order
              </b-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import Authentication from './mixins/authentication'
import HasCreditCard  from './mixins/has_credit_card'
import ServerAPI      from './mixins/server_api'
import Maintenance    from './mixins/maintenance'
import TotalCost from './mixins/cost_calculator'

import MainLayout     from './components/MainLayout'

import util   from './util'
import config from './config/config'
import ziti   from './config/ziti'

export default {
  name: 'Checkout',

  mixins : [
    Authentication,
    HasCreditCard,
    ServerAPI,
    Maintenance,
    TotalCost
  ],

  components: {
    MainLayout
  },

  props : {
               period : Number,
    specified_filters : Number,
      specified_sinks : Number
  },

  data : function(){
    return {
      success : false,
      use_existing_credit_card : true,
      card_number : '',
      expiration_date : '',
      security_code : '',
      tos_agree : false,
      order_submitted : false
    }
  },

  computed : {
    details : function(){
      if(!this.plan) return {};

      return ziti.membership_features[this.plan];
    },

    upgrading_plan : function(){
      return this.plan != this.membership_level
    },

    next_payment : function(){
      var period = this.period ? this.period : 1;
      var renewal = new Date(Date.now());
          renewal.setMonth(renewal.getMonth() + period)
      return renewal.toLocaleDateString()
    },

    credit_card_valid: function(){
      return (this.has_credit_card && this.use_existing_credit_card) ||
             (this.have_credit_card_number &&
             !this.invalid_credit_card_number &&
              this.have_credit_card_cvc &&
             !this.invalid_credit_card_cvc);
    },

    is_valid: function(){
      return this.credit_card_valid && this.tos_agree;
    },

    plan_params : function(){
      var params = {}
      if(this.upgrading_plan){
        params.membership_level = this.plan
        params.membership_months = this.period || 1
      }

      if(this.selected_additional_filters)
        params.additional_filters = this.selected_additional_filters

      if(this.selected_additional_sinks)
        params.additional_sinks = this.selected_additional_sinks

      return params;
    }
  },

  methods : {
    submit : function(){
      this.order_submitted = true

      if(!this.use_existing_credit_card){
        // store new credit card
        this.update_user({credit_card : this.credit_card_params})
            .then(function(){
              this.purchase_plan_()

            }.bind(this)).catch(function(err){
              const msg = util.capitalize(err.body.error)
              alert("Could not process credit card: " + msg)

              this.order_submitted = false
            }.bind(this))

      }else
        this.purchase_plan_()
    },

    purchase_plan_ : function(){
      this.purchase_plan(this.plan_params)
          .then(function(){
            this.success = true;

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Problem processing payment: " + msg)

            this.order_submitted = false
          }.bind(this))
    }
  },

  created : function(){
    if(this.maintenance_mode){
      this.nav_to_maintenance();
      return;
    }

    // if no plan specified, nav to plans
    if(!this.plan)
      this.$router.push({path : '/plans'});

    if(this.specified_filters || this.specified_sinks)
      this.enable_additional = true;

    if(this.specified_filters)
      this.selected_additional_filters = this.specified_filters;

    if(this.specified_sinks)
      this.selected_additional_sinks = this.specified_sinks;
    
    this.use_existing_credit_card = this.has_credit_card
  }
}
</script>

<style scoped>
#success_checkout{
  width: 50%;
  margin: auto;
  margin-top: 50px;
  padding: 100px;
  background-color: white;
  border: 1px solid var(--theme-color3);
  border-radius: 4px;
  text-align: center;
  font-family: var(--theme-font2);
}

#main_layout.md #success_checkout,
#main_layout.sm #success_checkout,
#main_layout.xs #success_checkout{
  width: unset;
  padding: 75px 20px;
}

#success_checkout h4{
  font-family: var(--theme-font3);
  margin-bottom: 20px;
}

#success_img_container{
  margin: auto;
  width: 125px;
  height: 125px;
  background-color: rgb(22, 190, 89, 0.2);
  border-radius: 50%;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#success_img{
  width: 100px;
}

#checkout_container{
  width: 50%;
  margin: auto;
  margin-top: 20px;
}

#main_layout.md #checkout_container,
#main_layout.sm #checkout_container{
  width: 80%;
}

#main_layout.xs #checkout_container{
  width: unset;
}


#checkout_container h3{
  font-family: var(--theme-font3);
}

#checkout_subcontainer{
  padding: 30px;
  background-color: white;
  border-radius: 4px;
}

#main_layout.xs #checkout_subcontainer{
  padding: 15px;
}

#checkout_subcontainer h5{
  font-family: var(--theme-font3);
}

#enjoy{
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  background-color: var(--theme-color1);
  color: white;
  font-family: var(--theme-font2);
  border-radius: 6px;
}

.plan_name{
  text-transform: capitalize;
}

#next_payment{
  color: var(--theme-color2);
  font-family: var(--theme-font1);
  opacity: 0.6;
}

#payment_details{
  width: 100%;
  border-collapse: separate;
  border-spacing: 15px;
}

#use_existing_credit_card_wrapper{
  text-align: right;
}

#credit_card_number_wrapper{
  text-align: right;
}

#credit_card_number{
  text-align: right;
  width: unset;
}

#credit_card_cvc_wrapper{
  text-align: right;
}

#credit_card_cvc{
  text-align: right;
  width: unset;
}

#credit_card_expiration_wrapper{
  text-align: right;
}

#credit_card_month{
  width: 125px;
  margin-right: 5px;
  text-align: right;
}

#credit_card_year{
  width: 100px;
  text-align: right;
}

#tos_agree{
  text-align: right;
  padding-bottom: 10px;
}

#place_order_wrapper{
  display: flex;
  justify-content: flex-end;
}

#place_order{
  background-color: var(--theme-color1);
  border: none;
  border-radius: 25px;
  padding: 6px 25px;
  font-family: var(--theme-font3);
  font-weight: bold;
}
</style>
