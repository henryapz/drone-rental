const { Router } = require('express');
const { createOrder, getAllOrders } = require('./order.controller');

const router = Router();

// CRUD
router.post('/', createOrder);
router.get('/', getAllOrders);

module.exports = router;
