const { get } = require('lodash');

const epayco = require('epayco-sdk-node')({
  apiKey: process.env.EPAYCO_PUBLIC_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});

async function createCardToken(creditCardInfo) {
  return epayco.token.create(creditCardInfo);
}

async function createCustomer(user) {
  const customerInfo = {
    token_card: user.billing.creditCards[0].tokenId,
    name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    default: true,
  };
  return epayco.customers.create(customerInfo);
}

async function createPayment(user, payment) {
  const defaultCardToken = get(user, 'billing.creditCards[0].tokenId');
  const customerId = get(user, 'billing.customerId');
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

module.exports = {
  createCardToken,
  createCustomer,
  createPayment,
};
