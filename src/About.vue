<!--
  * About Page
  * User friendly explanatory text of application functionality
  * and contact form.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="about">
    <div id="about">
      <div id="about_content">
        <div id="about_section1" class="about_section">
          <h2>
            A Transaction Tracker for {{no_blockchain_configured ? 'The Blockchain' : configured_blockchain_upper}}
          </h2>

          <p>
            <span class="zt">{{app_name}}</span> allows you to monitor
            {{no_blockchain_configured ? 'Blockchain' : configured_blockchain_upper}} transactions
            in real time and setup alerts to be notified of ledger activity via email, text message, and more.
            By leveraging a rich and powerful pattern matching system, <span class="zt">{{app_name}}</span>
            facilitates the inclusion (and/or exclusion) of the exact transactions that you are interested in.
          </p>

          <div style="text-align: center">
            <iframe :width="mq_lte_sm ? 300 : 560" :height="mq_lte_sm ? 170 : 315"
                    src="https://www.youtube.com/embed/n0LcPuyFY6o"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    v-if="xrp_active">
            </iframe>

            <!-- TODO: replace this video w/ generic blocktr.ac video -->
          </div>
        </div>

        <div id="about_section2" class="about_section">
          <h4>Filtering On Your Terms</h4>

          <p>
            Let's say you are {{no_blockchain_configured ? 'a crypto' : 'an ' + configured_blockchain_upper}}
            account owner  or you are responsible for managing the account
            for your institution. It is pertinent that you are aware of all
            activity pertaining to your account, whether it is transactions
            originating from it or funds being sent to it by others.
            With <span class="zt">{{app_name}}</span> you can receive notifications
            immediately when this type of activity is detected and more.
          </p>

          <p>
            <span class="zt">{{app_name}}</span> not only allows you to filter transactions by type,
            but also to <b>deep inspect</b> every single transaction to only match certain criteria.
            Lets say you want to only be notified about payments in a particular currency and/or above
            a certain threshold. Or be notified when an offer is created for a rare or unique currency pair.
            <span class="zt">{{app_name}}</span> will notify you immediately via your preferred
            communication channel!
          </p>
        </div>

        <div id="about_section3" class="about_section">
          <h4>JSONPath Expressions</h4>

          <p>
            Transactions that are propagated across the Blockchain are expressed in JSON,
            a structured language that allows users to specify the exact intent of the action they are executing.
            <span class="zt">{{app_name}}</span> uses a powerful expression matching technology known as
            <b>JSONPath</b> to allow you to specify the exact content of the JSON transactions that you would like to match.
          </p>

          <p>
            For example to only inspect {{active_blockchain_upper}}
            {{blockchain_jsonpath_expression_example1_explanation}},
            the following expression can be used:
          </p>

          <div id="expression_example1" class="expression_example">
            {{blockchain_jsonpath_expression_example1}}
          </div>

          <p>
            To specify <i>Payments</i> which transfer more than
            <i>500 {{active_blockchain_upper}}</i>, you can use:
          </p>

          <div id="expression_example2" class="expression_example">
            {{blockchain_jsonpath_expression_example2}}
          </div>

          <p id="expression_example2_explanation">
            {{blockchain_jsonpath_expression_example2_explanation}}
          </p>

          <p>
          Or to only inspect {{blockchain_jsonpath_expression_example3_explanation}}:
          </p>

          <div id="expression_example3" class="expression_example">
            {{blockchain_jsonpath_expression_example3}}
          </div>

          <p>
            But if you do not want to build these expressions, fear not!
            <span class="zt">{{app_name}}</span> bundles a <b>library of pre-built expressions</b>,
            allowing you to quickly setup the filters you are interested in.
            Each of these pre-built expressions are fully parameterized allowing you to plugin the
            transaction type, currencies, payment ranges that you are interested in and much more!
          </p>

          <img :src="require('./assets/landing/' + active_blockchain + '/section4a.png')" />
        </div>

        <div id="about_section4" class="about_section">
          <h4>Programmatic Integration</h4>

          <p>
          With <span class="zt">{{app_name}}</span> you can receive alerts via email or text message,
          whichever you prefer. Advanced users can setup <b>webhooks</b> to be invoked on transaction activity.
          This means you can integrate the <span class="zt">{{app_name}}</span> notification system into any
          programatic environment including trading systems, auditing/forensics technologies, and much more!
          </p>

          <p>
          But this is just the tip of the iceberg, <router-link to="/txs">setup your first filter today!</router-link>
          </p>
        </div>

        <div id="about_section5" class="about_section">
          <div id="contact" />
          <h4>Contact Us</h4>

          <p style="text-align: center">
            Questions, feedback, and technical support can be obtained by contacting Dev Null Productions via the following form:
          </p>

          <ContactForm />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout  from './components/MainLayout'
import ContactForm from './components/forms/Contact'
import Blockchain  from './mixins/blockchain'
import config      from './config/config'

export default {
  name: 'About',

  mixins : [Blockchain],

  components: {
    MainLayout,
    ContactForm
  },

  methods : {
    pluralizer : function(num){
      return num == 1 ? '' : 's';
    }
  }
}
</script>

<style scoped>
#about{
  margin-bottom: 25px;
  padding: 25px;
}

#main_layout.sm #about,
#main_layout.xs #about{
  padding: unset;
  padding-top: 25px;
}

#about_content{
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: white;
  font-family: var(--theme-font1);
  text-align: justify;
}

#about_content h2,
#about_content h4{
  margin: 20px 0;
  text-align: center;
  font-family: var(--theme-font4);
}

.about_section{
  padding: 50px;
  color: var(--theme-color4);
}

#main_layout.sm .about_section,
#main_layout.xs .about_section{
  padding: 15px;
}

#about_section1 h2{
  color: var(--theme-color1);
}

#about_section2 h4,
#about_section3 h4,
#about_section4 h4,
#about_section5 h4{
  color: black;
}

#about_section2,
#about_section3,
#about_section4,
#about_section5{
  border-top: 1px solid #ededed;
}

#about_section2 ul{
  list-style-type: square;
}

#about_section3 img{
  display: block;
  width: 75%;
  margin: auto;
}

#main_layout.sm #about_section3 img,
#main_layout.xs #about_section3 img{
  width: 100%;
}

#expression_example2{
  margin-bottom: 3px;
}

#expression_example2_explanation{
  text-align: center;
  font-size: 0.8rem;
  margin-bottom: 25px;
}

.zt{
  font-weight: bold;
  color: var(--theme-color2);
}

.expression_example{
  color: var(--theme-color1);
  margin: 25px;
  text-align: center;
}
</style>
