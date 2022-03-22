const { addCreditCards, updateBilling } = require('../user/user.service');
const { createCardToken, createCustomer } = require('./payment.service');

async function createtTokenHandler(req, res) {
  const {
    cardNumber, cardExpYear, cardExpMonth, cardCvc,
  } = req.body;
  const creditCardInfo = {
    'card[number]': cardNumber,
    'card[exp_year]': cardExpYear,
    'card[exp_month]': cardExpMonth,
    'card[cvc]': cardCvc,
  };

  try {
    const result = await createCardToken(creditCardInfo);
    console.log('resuuult: ', result);
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

module.exports = {
  createtTokenHandler,
  createCustomerHandler,
};
