/*
 * Helper providing access to XLM transaction operation
 * metadata.
 *
 * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
 */

function all(tx){
  return (tx.envelope.tx || {})
             .operations || [];
}

function types(operations){
  return operations.map(function(op){
           return op._type;
         });
}

function first_operation_of_type(operations, type){
  return operations.find(function(op){
    return op._type == type;
  })
}

function prioritized(operations){
  const operation_types = types(operations);

  if(operation_types.includes("payment"))
    return first_operation_of_type(operations, "payment");

  else if(operation_types.includes("paymentPathStrictSend"))
    return first_operation_of_type(operations, "paymentPathStrictSend");

  else if(operation_types.includes("paymentPathStrictReceive"))
    return first_operation_of_type(operations, "paymentPathStrictReceive");

  else if(operation_types.includes("manageBuyOffer"))
    return first_operation_of_type(operations, "manageBuyOffer");

  else if(operation_types.includes("manageSellOffer"))
    return first_operation_of_type(operations, "manageSellOffer");

  else if(operation_types.includes("createPassiveSellOffer"))
    return first_operation_of_type(operations, "createPassiveSellOffer");

  else if(operation_types.includes("allowTrust"))
    return first_operation_of_type(operations, "allowTrust");

  else if(operation_types.includes("changeTrust"))
    return first_operation_of_type(operations, "changeTrust");

  return operations[0];
}

export default {
  all,
  types,
  prioritized
}
