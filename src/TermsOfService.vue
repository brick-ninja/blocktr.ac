<!--
  * Terms of Service Page
  * Renders legal text and terms of service use.
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="terms">
    <div id="terms">
      <h1 id="terms_title">Terms Of Service</h1>

      <div id="terms_content">
        <p>
        Welcome to <b>{{app_name}}</b>. By using this website and/or service, you implicity agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms and conditions, please immediately cease using the {{app_name}} website and service.
        </p>

        <p>
        The use of this <b>{{app_name}}</b> is subject to the following terms of use:
        </p>

        <ul id="terms_list">
          <li>
          Neither Dev Null Productions nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website or from the {{app_name}} service for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
          </li>

          <li>
          Your use of the services provided here is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
          </li>

          <li>
          This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
          </li>

          <li>
          Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
          </li>

          <li>
          From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
          </li>

          <li>
          Dev Null Productions may change these Terms of Service at any time and without prior notice. Upon such event, you agree to comply and be bound with the new terms and conditions.
          </li>

          <li>
          Dev Null Productions may also change premium feature pricing in the future. For existing plans, new prices will take effect on renewal and/or the purchase of additional features.
          </li>

          <li>
          Your use of this website and any dispute arising out of such use of the website is subject to the laws of the state of New York, United States of America
          </li>
        </ul>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'
import Blockchain from './mixins/blockchain'

export default {
  name: 'TermsOfService',

  mixins : [Blockchain],

  components: {
    MainLayout
  }
}
</script>

<style scoped>
#terms{
  padding: 25px;
}

#terms_title{
  font-weight: bold;
  font-family: var(--theme-font4);
}

#terms_content{
  font-family: var(--theme-font1);
  background-color: white;
  padding: 25px;
}

#main_layout.sm #terms_list{
  padding-left: 25px;
}

#main_layout.xs #terms_list{
  padding-left: 15px;
}

#terms_list li{
  margin-bottom: 15px;
}
</style>
