<!--
  * XRP Tx Summary Component
  * Enapsulates tx-type specific component.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div class="xrp_tx_summary"
      :class="success ? 'success' : 'failed'"
      :title="title">
    <PaymentTx              :tx="tx"      v-if="tx_type == 'Payment'"              />
    <OfferCreateTx          :tx="tx" v-else-if="tx_type == 'OfferCreate'"          />
    <OfferCancelTx          :tx="tx" v-else-if="tx_type == 'OfferCancel'"          />
    <EscrowCreateTx         :tx="tx" v-else-if="tx_type == 'EscrowCreate'"         />
    <EscrowCancelTx         :tx="tx" v-else-if="tx_type == 'EscrowCancel'"         />
    <EscrowFinishTx         :tx="tx" v-else-if="tx_type == 'EscrowFinish'"         />
    <TrustSetTx             :tx="tx" v-else-if="tx_type == 'TrustSet'"             />
    <SignerListSetTx        :tx="tx" v-else-if="tx_type == 'SignerListSet'"        />
    <AccountSetTx           :tx="tx" v-else-if="tx_type == 'AccountSet'"           />
    <AccountDeleteTx        :tx="tx" v-else-if="tx_type == 'AccountDelete'"        />
    <PaymentChannelClaimTx  :tx="tx" v-else-if="tx_type == 'PaymentChannelClaim'"  />
    <PaymentChannelCreateTx :tx="tx" v-else-if="tx_type == 'PaymentChannelCreate'" />
    <PaymentChannelFundTx   :tx="tx" v-else-if="tx_type == 'PaymentChannelFund'"   />
  </div>
</template>

<script>
import PaymentTx              from './xrp/Payment'
import OfferCreateTx          from './xrp/OfferCreate'
import OfferCancelTx          from './xrp/OfferCancel'
import EscrowCreateTx         from './xrp/EscrowCreate'
import EscrowCancelTx         from './xrp/EscrowCancel'
import EscrowFinishTx         from './xrp/EscrowFinish'
import TrustSetTx             from './xrp/TrustSet'
import SignerListSetTx        from './xrp/SignerListSet'
import AccountSetTx           from './xrp/AccountSet'
import AccountDeleteTx        from './xrp/AccountDelete'
import PaymentChannelClaimTx  from './xrp/PaymentChannelClaim'
import PaymentChannelCreateTx from './xrp/PaymentChannelCreate'
import PaymentChannelFundTx   from './xrp/PaymentChannelFund'

import Meta                   from './xrp/meta'

// TODO: test all tx type edge cases, capture txs representing all possibilities

export default {
  name: 'XRPTxSummary',

  mixins : [Meta],

  components : {
    PaymentTx,
    OfferCreateTx,
    OfferCancelTx,
    EscrowCreateTx,
    EscrowCancelTx,
    EscrowFinishTx,
    TrustSetTx,
    SignerListSetTx,
    AccountSetTx,
    AccountDeleteTx,
    PaymentChannelClaimTx,
    PaymentChannelCreateTx,
    PaymentChannelFundTx
  },

  computed : {
    title : function(){
      return this.tx_type + " @ " + this.formatted_date;
    }
  }
}
</script>

<style scoped>
.xrp_tx_summary{
  padding: 10px;
  font-family: var(--theme-font1);
}

.xrp_tx_summary.failed{
  background-color: #faf2f1;
}
</style>
