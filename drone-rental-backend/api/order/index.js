const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');
const { createOrder, getAllOrders, getMyOrders, getOrders } = require('./order.controller');

const router = Router();

// CRUD
router.post('/', isAuthenticated(), createOrder);
router.get('/', isAuthenticated(), getOrders);

module.exports = router;
