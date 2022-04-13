const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');
const { createOrder, getAllOrders } = require('./order.controller');

const router = Router();

// CRUD
router.post('/', isAuthenticated(),  createOrder);
router.get('/', isAuthenticated(), getAllOrders);

module.exports = router;
