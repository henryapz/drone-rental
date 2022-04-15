const { addCreditCards, updateBilling } = require('../user/user.service');
const { createCardToken, createCustomer, createPayment } = require('./payment.service');

async function createTokenHandler(req, res) {
  const { body: card } = req;
  try {
    const result = await createCardToken(card);
    const { user } = req;
    const creditCard = {
      expMonth: result.card.exp_month,
      expYear: result.card.exp_year,
      name: result.card.name,
      mask: result.card.mask,
      tokenId: result.id,
    };

    await updateBilling(user, creditCard, 'card');
    return res.status(200).json({ status: 'success' });
  } catch (x) {
    return res.status(500).json({ status: 'failed' });
  }
}

async function createCustomerHandler(req, res) {
  const { user } = req;
  try {
    const { data } = await createCustomer(user);
    console.log(data);
    await updateBilling(user, data.customerId, 'customer');
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'failed' });
  }
}

async function makePaymentHandler(req, res) {
  const { user, body: payment } = req;
  try {
    const { data, success } = await createPayment(user, payment);
    console.log(data, success);
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'failed' });
  }
}

module.exports = {
  createTokenHandler,
  createCustomerHandler,
  makePaymentHandler,
};
