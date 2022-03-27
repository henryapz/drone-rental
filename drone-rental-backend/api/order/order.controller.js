const Order = require('./order.model');

async function createOrder(req, res) {
  const data = req.body;
  try {
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
