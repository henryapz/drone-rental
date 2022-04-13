const {
  createCardToken,
  createCustomer,
  createPayment2,
} = require('../payment/payment.service');
const Order = require('./order.model');

async function createOrder(req, res) {
  const { user, body: orderRequest } = req;
  console.log('user: ', user.id);
  let card = null;
  let customer = null;
  try {
    if (!orderRequest.hasCard) {
      const cardData = orderRequest.cardInfo;
      const creditCardInfo = {
        'card[number]': cardData.cardNumber,
        'card[exp_year]': cardData.cardExpYear,
        'card[exp_month]': cardData.cardExpMonth,
        'card[cvc]': cardData.cardCvc,
      };
      card = await createCardToken(creditCardInfo);
      customer = await createCustomer(user, card);
    }
    const { data, success } = await createPayment2(customer.data, card, orderRequest.payment);
    console.log('data', data);
    const order = {
      ...orderRequest.order,
      transactionStatus: success ? 'Success' : 'Failed',
      userId: user.id,
    };
    const orderCreated = await Order.create(order);
    res.status(200).json(orderCreated);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getAllOrders(req, res) {
  try {
    const allOrders = await Order.find().populate('orderDetail.droneId', 'brand model');
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
};
