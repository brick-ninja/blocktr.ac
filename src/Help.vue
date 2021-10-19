<!--
  * Help Page
  * User friendly help topics w/ answers.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="help">
    <div id="help">
      <h1 id="help_title">Help</h1>

      <div id="help_content">
        <div id="help_categories">
          <b-list-group v-if="mq_gt_md">
            <b-list-group-item v-for="cat in categories"
                               :key="cat"
                               class="help_category"
                               :class="{active : is_active(cat)}"
                               @click="set_active(cat)">
              <div class="category_icon">
                <img :src="icon_for(cat)" />
              </div>

              <span class="category_title">{{cat}}</span>

              <div class="category_expand">
                <img src="./assets/right-arrow.svg" />
              </div>
            </b-list-group-item>
          </b-list-group>

          <multiselect v-else
                       v-model="active"
                       :options="categories"
                       :searchable="false"
                       deselectLabel="">
            <template slot="option" slot-scope="props">
              <div class="help_category">
                <div class="category_icon">
                  <img :src="icon_for(props.option)" />
                </div>

                <span class="category_title">{{props.option}}</span>
              </div>
            </template>
          </multiselect>
        </div>

        <div id="help_topics">
          <div v-for="topic in topics" :key="topic.title" class="topic">
            <div class="topic_title">{{topic.title}}</div>
            <div class="topic_content" v-html="topic.value" />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'
import Blockchain from './mixins/blockchain'

import util from './util'
import ziti from './config/ziti'

const sinks_caps_text =
  Object.keys(ziti.monthly_sink_caps).map(function(type){
    return type.toUpperCase() + " (" + ziti.monthly_sink_caps[type] + ")"
  }).join(", ")

export default {
  name: 'Help',

  mixins : [Blockchain],

  components: {
    MainLayout
  },


  props : {
    category : String
  },

  data : function(){
    return {
      active : 'General',
    }
  },

  computed : {
    content : function(){
      return {
        "General" : {
          icon : "gear-gray",
          topics : [
            {
              title : "What is " + this.app_name + "?",
              value : this.app_name + " is a persistent Blockchain transaction tracker. It allows you to setup filters to notify you of ledger activity via any number of mechanisms."
            },

            {
               title : "Why should I care about transactions?",
               value : "Transactions are a core component of the Blockchain, allowing users to send and receive currencies and tokens representing value over the Internet."
            },

            {
              title : "How do I select which Blockchain to monitor?",
              value : "Use the control on the upper left to switch blockchains. Currently <b>" + this.active_blockchain_upper + "</b> is selected."
            },

            {
               title : "What is " + this.active_blockchain_upper + "?",
               value : this.blockchain_description,
            },

            {
               title : "Where can I find out more about " + this.active_blockchain_upper + "?",
               value : "Many resources are avaiable online pertaining to " + this.active_blockchain_upper + " technologies. See the <a href='" + this.blockchain_moreinfo.url + "'>" + this.blockchain_moreinfo.title + "</a> portal for example.",
            },

            {
               title : "Help! I'm really lost / need tech support / have questions...",
               value : "You may contact Dev Null Productions using this <a href='/about#contact'>form</a>."
            }
          ]
        },

        "Account" : {
          icon : "person",
          topics : [
            {
              title : "How do I sign up?",
              value : "You may sign up for a new " + this.app_name + " account by clicking <b>Register</b> in the upper right corner. You will be prompted to supply a valid email and password. We will send you an email containing a confirmation link, one confirmed you are good to go!"
            },

            {
              title : "What if I forgot my password?",
              value : "Passwords may be reset by clicking <b>Login</b> and then <b>Forgot Password?</b>. You will be prompted for the email you supplied when you signed up. The password reset link will be sent to that."
            },

            {
              title : "How do I modify my profile?",
              value : "Once logged in, click <b>My Account</b> in the upper right and then click <b>Profile</b> in the menu. You can then change your email, password, billing info and more from there."
            },

            {
              title : "How am I notified of new transactions?",
              value : "You can setup sinks (notification endpoints) to be notified of transactions via email, text message, and webhooks. These can all be configured via the <b>Filter Settings</b> once logged in. Note certain sink types are only available to users signed up for premium plans."
            },

            {
              title : "How many filters / sinks am I permitted to have?",
              value : "This is determined on a plan-by-plan basis, see <a href='/plans'>Plans</a> for more details. You may purchase up to " + ziti.max_additions.filters + " additional filters and " + ziti.max_additions.sinks + " additional sinks beyond your plan"
            }
          ]
        },

        "Filters" : {
          icon : "down-triangle-lines-gray",
          topics : [
            {
              title : "How do I create new filters?",
              value : "Filters may be created by clicking <b>Add New Filter</b>. Note you will only be able to create a certain amount of filters depending on your subscription level."
            },

            {
              title : "What is this JSONPath business?",
              value : "JSONPath is a powerful expression matching language that is used when inspecting each and every transaction in the live transaction stream. We offer a introductory guide to building your own expressions <a href='/jsonpath'>here</a>. There are many online resources with JSONPath documentation and examples, we encourage all users to explore the powerful deep-inspection capabilities that this syntax supports."
            },

            {
              title : "What if I am a non-technical person?",
              value : this.app_name + " also provides an extensive library of pre-built expressions for you to use in lieu of writing your own JSONPath filters. Each expression is parameterized with placeholders allowing you to customize them to match exactly the type of transactions you are looking for. Create a new filter and select the <b>Category</b> option to see all the ones that are available!"
            },

            {
              title : "Why isn't my expression working?",
              value : "Make sure you are building expressions for the correct transaction structure, account for the wrapping of transactions in the top level <b>transaction</b> object, and do not have any typos or other mistakes. See the <a href='/jsonpath#gotchyas'>gotchyas</a> in our JSONPath guide for more details."
            },

            {
              title : "Why am I getting the error 'Filter is too complex' or 'Filter is invalid'?",
              value : "Filter expressions are validated for safety and complexity before being saved to " + this.app_name + ". Loops, function definitions, and function calls (outside of <i>parseInt</i> and <i>parseFloat</i>) are not permitted. Expressions may not contain more than " + ziti.max_jsonpath_complexity.binary + " logical operations (<b>&&</b> and <b>||</b>) and no more than " + ziti.max_jsonpath_complexity.logical + " binary operations (<b>==</b>, <b>+</b>, <b>-</b>, <b>*</b>, <b>/</b>).<br/>Filter parameters cannot contain the string \"<b>)]</b>\" due to parsing restrictions"
            },

            {
              title : "Is filter history retained?",
              value : "Currently " + this.app_name + " retains the latest " + ziti.filter_match_history + " transactions matched by a filter. After this transactions are removed on a first-in first-out basis. These transactions are accessible on the <b>Filter Details</b> page."
            },

            {
              title : "Are there limits to filter matches?",
              value : "Currently " + this.app_name + " imposes the a limit of " + ziti.filter_interval_cap + " matches every " + (ziti.timeouts.filter_reset/1000) + " seconds for every filter. Once a filter has exceeded the limit excess matches will be discard."
            },

            {
              title : "But I need more filter matches beyond the limit!",
              value : "Contact Dev Null Productions using this <a href='/about#contact'>form</a> and we'll discuss increasing the your cap."
            }
          ]
        },

        "Notifications" : {
          icon : "txs/offers-gray",
          topics : [
            {
              title : "How often am I notified of matched filters?",
              value : "Depending on your subscription level, you will be notified of transactions once a certain number of them have been matched and/or a minimum amount of time has gone by. See the different <a href='/plans'>Plans</a> for more info"
            },

            {
              title : "How can I be alerted more frequently / instantaneously?",
              value : "Sign up for a higher subscription level to access more features."
            },

            {
              title : "Are there limits to notifications?",
              value : "Currently " + this.app_name + " imposes the following base caps on the following notification types: " + sinks_caps_text + ". For multi-month subscriptions, multiply the number of months by the base cap to determine the total cap. For example for a 3 month subscription, you are allowed up to " + (ziti.monthly_sink_caps.sms * 3) + " SMS notifications.<br/>Once you have exceeded the limit for a particular type, notifications will not be sent via that channel until your subscription is renewed."
            },

            //{
            //  title : "Can I limit the rate of notifications?",
            //  value : "Yes! You may edit the number of notifications of each type you receive per hour via the <b>Settings</b> control in the <b>Filters List</b>. Once " + this.app_name + " has exceed the limit configured for a particular type, notifications will not be sent via that channel until the next hour."
            //},

            {
              title : "What happens if my email, sms, url is unavailable when a notification is sent?",
              value : "At the current time we only send notifications once when " + this.app_name + " detects matching transactions. Please make sure the target destination is online and accessible to ensure you receive notifications. In the future we may offer the ability to retry notification attempts."
            },

            {
              title : "Can I control how often I receive notifications?",
              value : "Yes! You may edit transaction batch sizes and notification times via the <b>Filter Settings</b> control. You will receive a notification whichever comes first, a filter matches the number of transactions specified by batch size or the amount of time specified by notification time passes since the first matched transaction is detected."
            },

            {
              title : "How long are notifications retained?",
              value : "Notifications are retained for " + ziti.notification_retention_days + " days before they are deleted. You may see current notifications on record <a href='/notifications'>here</a>."
            }
          ]
        },

        "Payments" : {
          icon : "txs/payment-channels-gray",
          topics : [
            {
                title : "What are the different membership levels?",
                value : "Currently " + ziti.membership_levels.join(", ") + " plans are available"
            },

            {
              title : "What is a pro account?",
              value : "Everything above the first (free) membership tier is considered a <b>pro</b> account. These provide advanced features and quicker notification times."
            },

            {
                title : "How much do Pro accounts cost?",
                value : "See available <a href='/plans'>Plans</a> for more details."
            },

            {
              title : "What payment options are available to me?",
              value : "We currently accept only accept credit card payments but are exploring additional payment options (available in the near future)."
            },

            {
              title : "What happens when my account becomes unfunded?",
              value : "You will automatically be billed for your new subscription period when your current one ends. If we are unable to bill your credit card your account will be downgraded to the free tier. If you update your information at any point we will restore your account along with the filters you created."
            },

            {
              title : "If I cancel my subscription will I be refunded?",
              value : "Unfortunately we are not able to offer refunds at the current time. If you wish to cancel, please do so before your subscription is renewed to avoid unintended charges. In the future we will explore offering prorated refunds for unused portions of subscriptions."
            }
          ]
        }
      }
    },

    categories : function(){
      return Object.keys(this.content);
    },

    topics : function(){
      return this.content[this.active].topics;
    }
  },

  methods : {
    is_active : function(category){
      return this.active == category;
    },

    set_active : function(category){
      this.active = category;
    },

    icon_for : function(category){
      return require('./assets/' + this.content[category].icon + '.svg');
    }
  },

  created : function(){
    if(this.category){
      const category = util.capitalize(this.category)
      if(this.categories.includes(category))
        this.set_active(category)
    }
  }
}
</script>

<style scoped>
#help{
  margin-bottom: 25px;
  padding: 5px;
  padding-top: 25px;
}

#help_title{
  font-family: var(--theme-font3);
  font-weight: bold;
}

#help_content{
  padding: 25px;
  display: flex;
  justify-content: space-between;
}

#main_layout.md #help_content,
#main_layout.sm #help_content,
#main_layout.xs #help_content{
  padding: 5px;
  flex-direction: column;
}

#help_categories{
  flex-basis:  18%;
}

.help_category{
  display: flex;
  cursor: pointer;
  border: none;
  font-family: var(--theme-font5);
  padding: 10px;
  background-color: unset;
  color: #ABB4BF;
}

#main_layout.md .help_category,
#main_layout.sm .help_category,
#main_layout.xs .help_category{
  padding: unset;
}

.help_category:first-child{
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.help_category:last-child{
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.help_category.active{
  background-color: var(--theme-color6);
  border: 1px solid var(--theme-color1);
  color: black;
  opacity: 0.7;
}

.category_icon{
  flex-basis: 5%;
}

.category_icon img{
  width: 20px;
}

.category_title{
  flex-grow: 1;
  margin-left: 10px;
}

.category_expand{
  flex-basis: 7%;
}

#help_topics{
  flex-basis: 80%;
  padding: 15px;
  border: 1px solid #ededed;
  background-color: white;
}

#main_layout.md #help_topics,
#main_layout.sm #help_topics,
#main_layout.xs #help_topics{
  padding: unset;
  border: unset;
  background-color: unset;
}

.topic{
  padding: 10px;
  text-align: justify;
  border-bottom: 1px solid var(--theme-color3);
}

#main_layout.md .topic,
#main_layout.sm .topic,
#main_layout.xs .topic{
  text-align: unset;
}

.topic:last-child{
  border-bottom: none;
}

.topic_title{
  font-weight: bold;
  font-family: var(--theme-font4);
  margin-bottom: 5px;
}

.topic_content{
  font-family: var(--theme-font1);
}
</style>
