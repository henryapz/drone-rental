const get = require('lodash/get');
const User = require('./models/user.model');

async function getUserByEmail(email) {
  const user = await User.findOne({ email }) || {};
  return user;
}

async function updateCardsBilling(user, card) {
  const creditCards = get(user, 'billing.creditCards', []);
  const customer = {
    billing: {
      creditCards: creditCards.concat(card),
    },
  };
  // eslint-disable-next-line no-underscore-dangle
  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });
  return updatedUser;
}

async function createCustomerBilling(userId, customerId) {
  const customer = {
    billing: {
      customerId,
    },
  };
  const updatedUser = await User.findByIdAndUpdate(userId, customer, {
    new: true,
  });
  return updatedUser.billing.customerId;
}

module.exports = {
  getUserByEmail,
  updateCardsBilling,
  createCustomerBilling,
};
