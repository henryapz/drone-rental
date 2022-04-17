const { get } = require('lodash');
const epayco = require('epayco-sdk-node')({
  apiKey: process.env.EPAYCO_PUBLIC_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});

async function createCardToken(card) {
  const creditCardInfo = {
    'card[number]': card.cardNumber,
    'card[exp_year]': card.cardExpYear,
    'card[exp_month]': card.cardExpMonth,
    'card[cvc]': card.cardCvc,
  };
  return epayco.token.create(creditCardInfo);
}

async function createCustomer(tokenId, payment) {
  const customerInfo = {
    token_card: tokenId,
    name: payment.firstName,
    last_name: payment.lastName,
    email: payment.email,
    default: true,
  };
  return epayco.customers.create(customerInfo);
}

async function createPayment(customerId, tokenId, payment) {
  const paymentInfo = {
    token_card: get(payment, 'tokenId', tokenId),
    customer_id: get(payment, 'customerId', customerId),
    doc_type: get(payment, 'docType'),
    doc_number: get(payment, 'docNumber'),
    name: get(payment, 'firstName', payment.firstName),
    last_name: get(payment, 'lastName', payment.lastName),
    email: get(payment, 'email', payment.email),
    city: get(payment, 'city'),
    address: get(payment, 'address'),
    phone: get(payment, 'phone'),
    cell_phone: get(payment, 'cellPhone'),
    bill: get(payment, 'bill'),
    description: get(payment, 'description'),
    value: get(payment, 'value'),
    tax: get(payment, 'tax'),
    tax_base: get(payment, 'taxBase'),
    currency: get(payment, 'currency'),
    dues: get(payment, 'dues'),
    ip: get(payment, 'ip'),
    use_default_card_customer: true,
  };
  return epayco.charge.create(paymentInfo);
}

module.exports = {
  createCardToken,
  createCustomer,
  createPayment,
};
