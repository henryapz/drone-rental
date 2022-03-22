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

module.exports = {
  createCardToken,
  createCustomer,
};
