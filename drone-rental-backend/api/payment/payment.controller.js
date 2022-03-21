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
    return res.status(200).json({ status: 'success' });
  } catch (x) {
    console.log(x);
    return res.status(500).json({ status: 'failed' });
  }
}

async function createCustomerHandler(req, res) {
  const { user } = req;
  try {
    const result = await createCustomer(user);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createtTokenHandler,
  createCustomerHandler,
};
