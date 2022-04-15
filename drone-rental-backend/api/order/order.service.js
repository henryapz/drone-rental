const { createCardToken, createCustomer } = require('../payment/payment.service');

async function createTokenToPay(user, cardRequest) {
  const { success: cardSuccess, data: card } = await createCardToken(cardRequest);
  if (!cardSuccess) return { card };
  const { success: customerSuccess, data: customer } = await createCustomer(user, card);
  if (!customerSuccess) return { customer };
  return { customer, card };
}

module.exports = {
  createTokenToPay,
};
