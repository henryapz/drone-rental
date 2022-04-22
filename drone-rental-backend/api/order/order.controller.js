/* eslint-disable no-underscore-dangle */
const { default: mongoose } = require('mongoose');
const { createPayment } = require('../payment/payment.service');
const Order = require('./models/order.model');
const { createTokenToPay, createOrderInDB } = require('./order.service');

async function createOrder(req, res) {
  const { user, body: orderRequest } = req;
  let paymentResponse = null;
  try {
    const order = await createOrderInDB(orderRequest, user);
    const subscription = await createTokenToPay(
      user,
      orderRequest.card,
      orderRequest.payment,
    );
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

async function getOrders(req, res) {
  const { user, query } = req;
  const count = Number(query.count);
  const page = Number(query.page);
  const { orderId, email, status } = query;
  const start = count * (page - 1);
  const end = start + count;
  let orders = null;

  try {
    if (user.role === 'User') {
      orders = await Order.find({ userId: user._id })
        .populate('items.droneId', 'model')
        .select('transactionId createdAt total transactionStatus items')
        .sort({ createdAt: -1 });
    } else {
      const objectFilter = {};
      if (orderId) objectFilter.transactionId = new mongoose.Types.ObjectId(orderId);
      if (status) objectFilter.transactionStatus = status;

      const ordersFromDb = await Order.find(objectFilter)
        .select('transactionId createdAt total transactionStatus items')
        .populate('userId', 'email')
        .sort({ createdAt: -1 });
      orders = email
        ? ordersFromDb.filter((x) => (x.userId && x.userId.email === email))
        : ordersFromDb;
    }
    const filteredOrders = orders.slice(start, end);
    const orderResult = {
      totalOrders: orders.length,
      totalPages: Math.ceil(orders.length / count),
      orders: filteredOrders,
    };
    res.status(200).json(orderResult);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrders,
};
