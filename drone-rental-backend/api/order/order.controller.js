const { createPayment } = require('../payment/payment.service');
const Order = require('./models/order.model');
const { createTokenToPay, createOrderInDB } = require('./order.service');

async function createOrder(req, res) {
  const { user, body: orderRequest } = req;
  let paymentResponse = null;
  try {
    const order = await createOrderInDB(orderRequest, user);
    const subscription = await createTokenToPay(user, orderRequest.card, orderRequest.payment);
    if (!subscription) {
      await Order.findByIdAndUpdate(order.id, { transactionStatus: 'Failed' });
      res.status(400).json({ success: false, validCard: false });
      return;
    }
    paymentResponse = await createPayment(
      subscription.customerId,
      subscription.tokenId,
      orderRequest.payment,
    );
    const status = paymentResponse && paymentResponse.status ? 'Success' : 'Failed';
    await Order.findByIdAndUpdate(order.id, { transactionStatus: status });
    res.status(201).json({ success: paymentResponse && paymentResponse.status });
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
