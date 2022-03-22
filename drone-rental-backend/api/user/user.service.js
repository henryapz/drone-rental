const { indexOf } = require('lodash');
const get = require('lodash/get');
const User = require('./models/user.model');

async function getUserByEmail(email) {
  const user = await User.findOne({ email }) || {};
  return user;
}

async function updateBilling(user, info, type) {
  const creditCards = get(user, 'billing.creditCards', []);
  const customerId = get(user, 'billing.customerId', null);
  const customer = {
    billing: {
      creditCards: type === 'card' ? creditCards.concat(info) : creditCards,
      customerId: type === 'customer' ? info : customerId,
    },
  };
  // eslint-disable-next-line no-underscore-dangle
  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });
  return updatedUser;
}

module.exports = {
  getUserByEmail,
  updateBilling,
};
