const get = require('lodash/get');
const User = require('./models/user.model');

async function getUserByEmail(email) {
  const user = (await User.findOne({ email })) || {};
  return user;
}

async function updateCardsBilling(userId, cards, card) {
  await User.findByIdAndUpdate(userId, {
    'billing.creditCards': cards.concat(card),
  });
}

async function createCustomerBilling(userId, customerId) {
  await User.findByIdAndUpdate(userId, {
    'billing.customerId': customerId,
  });
}

module.exports = {
  getUserByEmail,
  updateCardsBilling,
  createCustomerBilling,
};
