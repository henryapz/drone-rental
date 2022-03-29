const { createCardToken, createCustomer, createPayment } = require('../payment/payment.service');
const Order = require('./order.model');

async function createOrder(req, res) {
  const { user, body: payment } = req;
  try {
    if (!payment.hasCard) {
      const cardData = payment.cardInfo;
      const card = await createCardToken(cardData);
      const customer = await createCustomer(user);
    }
    const { data, success } = await createPayment(user, payment);
    const order = await Order.create(data);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getAllOrders(req, res) {
  try {
    const allOrders = await Order.find().populate('orderDetail.drone_id', 'brand model');
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
};
