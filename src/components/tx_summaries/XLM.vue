<!--
  * XLM Tx Summary Component
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <div class="xlm_tx_summary"
      :class="success ? 'success' : 'failed'"
      :title="title">
    <CreateAccountTx            :tx="tx"      v-if="operation_type == 'createAccount'"            />
    <PaymentTx                  :tx="tx" v-else-if="operation_type == 'payment'"                  />
    <PaymentPathStrictSendTx    :tx="tx" v-else-if="operation_type == 'paymentPathStrictSend'"    />
    <PaymentPathStrictReceiveTx :tx="tx" v-else-if="operation_type == 'paymentPathStrictReceive'" />
    <ManageBuyOfferTx           :tx="tx" v-else-if="operation_type == 'manageBuyOffer'"           />
    <ManageSellOfferTx          :tx="tx" v-else-if="operation_type == 'manageSellOffer'"          />
    <CreatePassiveSellOfferTx   :tx="tx" v-else-if="operation_type == 'manageSellOffer'"          />
    <SetOptionsTx               :tx="tx" v-else-if="operation_type == 'setOptions'"               />
    <ChangeTrustTx              :tx="tx" v-else-if="operation_type == 'changeTrust'"              />
    <AllowTrustTx               :tx="tx" v-else-if="operation_type == 'allowTrust'"               />
    <AccountMergeTx             :tx="tx" v-else-if="operation_type == 'accountMerge'"             />
    <ManageDataTx               :tx="tx" v-else-if="operation_type == 'manageData'"               />
    <BumpSequenceTx             :tx="tx" v-else-if="operation_type == 'bumpSequence'"             />
  </div>
</template>

<script>
import CreateAccountTx            from './xlm/CreateAccount'
import PaymentTx                  from './xlm/Payment'
import PaymentPathStrictSendTx    from './xlm/PaymentPathStrictSend'
import PaymentPathStrictReceiveTx from './xlm/PaymentPathStrictReceive'
import ManageBuyOfferTx           from './xlm/ManageBuyOffer'
import ManageSellOfferTx          from './xlm/ManageSellOffer'
import CreatePassiveSellOfferTx   from './xlm/CreatePassiveSellOffer'
import SetOptionsTx               from './xlm/SetOptions'
import ChangeTrustTx              from './xlm/ChangeTrust'
import AllowTrustTx               from './xlm/AllowTrust'
import AccountMergeTx             from './xlm/AccountMerge'
import ManageDataTx               from './xlm/ManageData'
import BumpSequenceTx             from './xlm/BumpSequence'

// TODO: tx types:
//       beginSponsoringFutureReserves, endSponsoringFutureReserves, revokeSponsorship,
//       createClaimableBalance, claimClaimableBalance

import Meta from './xlm/meta'

export default {
  name: 'XLMTxSummary',

  mixins : [Meta],

  components : {
    CreateAccountTx,
    PaymentTx,
    PaymentPathStrictSendTx,
    PaymentPathStrictReceiveTx,
    ManageBuyOfferTx,
    ManageSellOfferTx,
    CreatePassiveSellOfferTx,
    SetOptionsTx,
    ChangeTrustTx,
    AllowTrustTx,
    AccountMergeTx,
    ManageDataTx,
    BumpSequenceTx
  },

  computed : {
    title : function(){
      return this.humanized_operation_types.join(", ") + " @ " + this.formatted_date;
    }
  }
}
</script>

<style scoped>
.xlm_tx_summary{
  padding: 10px;
  font-family: var(--theme-font1);
}

.xlm_tx_summary.failed{
  background-color: #faf2f1;
}
</style>
