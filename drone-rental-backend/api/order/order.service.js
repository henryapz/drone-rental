const { get } = require('lodash');
const Order = require('./models/order.model');
const { createCardToken, createCustomer } = require('../payment/payment.service');
const { updateCardsBilling, createCustomerBilling } = require('../user/user.service');

async function getCardToken(card, user) {
  const cards = get(user, 'billing.creditCards') || [];

  const existingCard = cards.length
    && cards.find((dbCard) => {
      const cardNumbers = dbCard.mask.split(/[*]{6}/);
      return (
        card.cardExpMonth === dbCard.expMonth
        && card.cardExpYear === dbCard.expYear
        && card.cardNumber.startsWith(cardNumbers[0])
        && card.cardNumber.endsWith(cardNumbers[1])
      );
    });

  if (existingCard) return existingCard.tokenId;

  const {
    success: cardSuccess,
    card: cardResponse,
    id: tokenId,
  } = await createCardToken(card);
  if (!cardSuccess) return null;

  const creditCard = {
    expMonth: cardResponse.exp_month,
    expYear: cardResponse.exp_year,
    name: cardResponse.name,
    mask: cardResponse.mask,
    tokenId,
  };
  // eslint-disable-next-line no-underscore-dangle
  await updateCardsBilling(user._id, cards, creditCard);
  return creditCard.tokenId;
}

async function getCustomerId(tokenId, user, payment) {
  const { success, data } = await createCustomer(tokenId, payment);
  if (!success) return null;

  // eslint-disable-next-line no-underscore-dangle
  await createCustomerBilling(user, data.customerId, 'customer');
  return data.customerId;
}

async function createTokenToPay(user, cardRequest, payment) {
  const tokenId = await getCardToken(cardRequest, user);
  if (!tokenId) return null;
  const customerId = get(user, 'billing.customerId') || await getCustomerId(tokenId, user, payment);
  if (!customerId) return null;
  return { customerId, tokenId };
}

async function createOrderInDB(orderRequest, user) {
  const order = {
    ...orderRequest.order,
    transactionStatus: 'Pending',
    userId: user.id,
  };
  const orderCreated = await Order.create(order);
  return orderCreated;
}

module.exports = {
  createTokenToPay,
  createOrderInDB,
};
