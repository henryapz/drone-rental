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

async function createCustomer(user, card) {
  const customerInfo = {
    token_card: card.id,
    name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    default: true,
  };
  return epayco.customers.create(customerInfo);
}

async function createPayment(user, payment, card = null) {
  const defaultCardToken = card ? card.id : get(user, 'billing.creditCards[0].tokenId');
  const customerId = card ? user.customerId : get(user, 'billing.customerId');
  const paymentInfo = {
    token_card: get(payment, 'tokenId', defaultCardToken),
    customer_id: get(payment, 'customerId', customerId),
    doc_type: get(payment, 'docType'),
    doc_number: get(payment, 'docNumber'),
    name: get(payment, 'firstName', user.firstName),
    last_name: get(payment, 'lastName', user.lastName),
    email: get(payment, 'email', user.email),
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

async function createPayment2(customer, card, payment) {
  const paymentInfo = {
    token_card: get(payment, 'tokenId', card.id),
    customer_id: get(payment, 'customerId', customer.customerId),
    doc_type: get(payment, 'docType'),
    doc_number: get(payment, 'docNumber'),
    name: get(payment, 'firstName', customer.firstName),
    last_name: get(payment, 'lastName', customer.lastName),
    email: get(payment, 'email', customer.email),
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
  createPayment2,
};
