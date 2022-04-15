const {
  createCardToken,
  createCustomer,
  createPayment2,
  createPayment,
} = require('../payment/payment.service');
const Order = require('./order.model');
const { createTokenToPay } = require('./order.service');

async function createOrder(req, res) {
  const { user, body: orderRequest } = req;
  let paymentResponse = null;
  try {
    if (!orderRequest.cardToken) {
      const { customer, card } = await createTokenToPay(user, orderRequest.card);
      if (!customer || !card) {
        res.status(400).json(customer || card);
        return;
      }
      paymentResponse = await createPayment(customer, orderRequest.payment, card);
    } else {
      paymentResponse = await createPayment(user, orderRequest.payment);
    }
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ error });
  } finally {
    const order = {
      ...orderRequest.order,
      transactionStatus: paymentResponse ? paymentResponse.success : 'Failed',
      userId: user.id,
    };
    await Order.create(order);
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
