<!--
  * Landing Page
  * First page displayed to the user at the root of the application,
  * consists of high level features and screenshots.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="landing">
    <div id="landing_container">
      <div id="section1" class="section">
        <div id="section1_subsection1">
          <div id="main_title">{{app_name}}</div>

          <ul class="main_features" v-if="mq_gte_md">
            <li>Monitor your {{blockchain_text}} account</li>
            <li>Look for money flow/volume patterns</li>
            <li>Watch DeFI / NFT updates &amp; status</li>
            <li>Much more!</li>
          </ul>

          <div class="begin_today_wrapper">
            <router-link to="/txs">
              <b-button v-if="mq_gte_md"
                        class="begin_today"
                        variant="primary">
                  <b>Begin today</b>
              </b-button>
            </router-link>
          </div>
        </div>

        <div id="section1_subsection2">
          <img id="section1_img" :src="img_src('section1')" />
        </div>

        <div id="section1_subsection3" v-if="mq_lt_md">
          <ul class="main_features">
            <li>Monitor your {{blockchain_text}} account</li>
            <li>Look for money flow/volume patterns</li>
            <li>Watch DeFI / NFT updates &amp; status</li>
            <li>Much more!</li>
          </ul>

          <div class="begin_today_wrapper">
            <router-link to="/txs">
              <b-button v-if="mq_lt_md"
                        class="begin_today"
                        variant="primary">
                  <b>Begin today</b>
              </b-button>
            </router-link>
          </div>
        </div>
      </div>

      <div id="section2" class="section">
        <div class="sub_title">Alert Notifications</div>

        <div id="section2_subsection">
          <img id="section2_img" :src="img_src('section2')" />

          <div id="section2_content">
            <p>Monitor {{blockchain_text}} transactions in real time and setup alerts to be delivered via email, text message, and more</p>

            <router-link to="/txs">
              <b-button id="setup_notifications" variant="primary">
                <b>Setup Notifications</b>
              </b-button>
            </router-link>
          </div>
        </div>
      </div>

      <div id="section3" class="section">
        <div class="sub_title">Filtering</div>

        <div id="section3_content">
          With {{app_name}} you can setup powerful filtering expressions to hone in on exactly the type of activity that you are interested in...
        </div>

        <img id="section3_img" :src="img_src('section3')" />
      </div>

      <div id="section4" class="section">
        <div class="sub_title">Pre-existing templates</div>

        <div id="section4_content1">
          Use pre-existing templates to setup alerts for many types of common patterns
        </div>

        <img id="section4_img1" :src="img_src('section4a')" />

        <div id="section4_subsection">
          <img v-if="mq_gte_md"
               class="section4_img2"
               :src="img_src('section4b')" />

          <div id="section4_content2">
            <div class="sub_sub_title">Create your first filter</div>

            <img v-if="mq_lt_md"
                 class="section4_img2"
                 :src="img_src('section4b')" />

            <p>Get notified when an interesting offer appears</p>

            <router-link to="/txs">
              <b-button id="create_personalized_filter" variant="primary">
                <b>Create your personalized filter</b>
              </b-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'
import Blockchain from './mixins/blockchain'

export default {
  name: 'Landing',

  mixins : [Blockchain],

  components: {
    MainLayout
  },

  computed : {
    blockchain_text : function(){
      return this.no_blockchain_configured ? 'Blockchain' : this.configured_blockchain_upper;
    }
  },

  methods : {
    img_src : function(img){
      return require('./assets/landing/' +
          (this.no_blockchain_configured ?
                            'blockchain' :
             this.configured_blockchain) +
                      "/" + img + '.png');
    }
  }
}
</script>

<style scoped>
#landing_container{
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 50px;
}

#main_layout.sm #landing_container,
#main_layout.xs #landing_container{
  margin-top: unset;
}

.section{
  padding-left: 7%;
  padding-right: 7%;
}

.sub_title{
  font-size: 3.5vw;
  font-weight: bold;
  margin-bottom: 20px;
}

#main_layout.sm .sub_title,
#main_layout.xs .sub_title{
  font-size: 6.5vw;
}

.sub_sub_title{
  font-size: 3.25vw;
  font-weight: bold;
}

#main_layout.sm .sub_sub_title,
#main_layout.xs .sub_sub_title{
  font-size: 5.5vw;
}

/****/

#section1{
  display: flex;
  padding-bottom: 50px;
}

#main_layout.sm #section1,
#main_layout.xs #section1{
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;
}

#section1_subsection1{
  flex-basis: 40%;
  flex-shrink: 0;
  padding-right: 20px;
}

#section1_subsection2{
  flex-basis: 60%;
}

#main_title{
  font-size: 4.5vw;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
}

#main_layout.sm #main_title,
#main_layout.xs #main_title{
  font-size: 10vw;
}

.main_features {
  list-style: none;
  padding-left: 25px;
  font-size: 1.8vw;
}

.main_features li::before{
  content: "\2022";
  color: var(--theme-color1);
  font-weight: bold;
  display: inline-block; 
  width: 1em; 
  margin-left: -1em;
}

#main_layout.sm .main_features,
#main_layout.xs .main_features{
  font-size: 4vw;
  padding-left: 50px;
}

#section1_subsection3{
  padding-top: 10px;
  align-self: flex-start;
  width: 100%;
}

.begin_today_wrapper{
  width: 100%;
  margin-left: 25px;
}

#main_layout.sm .begin_today_wrapper,
#main_layout.xs .begin_today_wrapper{
  margin-left: unset;
  text-align: center;
}

.begin_today{
  align-self: center;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 30vw;
  font-size: 2.3vw;
}

#main_layout.sm .begin_today,
#main_layout.xs .begin_today{
  font-size: 4.3vw;
  width: 90%;
}

.begin_today a{
  color: white;
  text-decoration: none;
}

#section1_img{
  width: 100%;
  box-shadow: 0 2px 35px 0 rgba(16,48,73,0.18);
  border-radius: 10px;
}

/****/

#section2{
  padding-top: 50px;
  padding-bottom: 75px;
  background-color: white;
  text-align: center;
}

#section2_subsection{
  display: flex;
  align-items: center;
}

#main_layout.sm #section2_subsection,
#main_layout.xs #section2_subsection{
  display: flex;
  flex-direction: column;
}

#section2_img{
  flex-basis: 60%;
  max-width: 50%;
}

#main_layout.sm #section2_img,
#main_layout.xs #section2_img{
  width: 100%;
  min-width: 100%;
}

#section2_content{
  flex-basis: 50%;
  font-size: 2vw;
  padding-top: 50px;
  padding-left: 45px;
}

#main_layout.sm #section2_content,
#main_layout.xs #section2_content{
  font-size: 4vw;
  padding-left: unset;
}

#setup_notifications{
  align-self: center;
  border-radius: 25vw;
  font-size: 2.5vw;
}

#main_layout.sm #setup_notifications,
#main_layout.xs #setup_notifications{
  font-size: 4vw;
  width: 90%;
}

/****/

#section3{
  padding-top: 50px;
  padding-bottom: 20px;
}

#main_layout.sm #section3 .sub_title,
#main_layout.xs #section3 .sub_title{
  text-align: center;
}

#section3_img{
  flex-basis: 60%;
  max-width: 100%;
}

#section3_content{
  margin: 20px;
  margin-bottom: 50px;
  font-size: 2vw;
}

#main_layout.sm #section3_content,
#main_layout.xs #section3_content{
  font-size: 4vw;
}

/****/

#section4{
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: white;
}

#main_layout.sm #section4 .sub_title,
#main_layout.xs #section4 .sub_title{
  text-align: center;
}

#section4_img1{
  width: 100%;
}

#section4_subsection{
  margin-top: 50px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f9;
}

#section4_content2{
  font-size: 2.15vw;
  padding-left: 50px;
}

#main_layout.sm #section4_content2,
#main_layout.xs #section4_content2{
  font-size: 3.15vw;
  padding-left: unset;
  width: 100%;
  text-align: center;
}

.section4_img2{
  max-width: 35%;
}

#create_personalized_filter{
  border-radius: 25px;
  font-size: 1.2rem;
}

#main_layout.sm #create_personalized_filter,
#main_layout.xs #create_personalized_filter{
  font-size: 3.5vw;
  width: 90%;
}
</style>
