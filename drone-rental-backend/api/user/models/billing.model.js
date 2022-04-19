const { default: mongoose } = require('mongoose');
const { CreditCardSchema } = require('./card.model');

const BillingSchema = new mongoose.Schema(
  {
    creditCards: [CreditCardSchema],
    customerId: String,
  },
  { _id: false },
);

module.exports = {
  BillingSchema,
};
