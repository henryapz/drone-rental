const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');
const { createtTokenHandler, createCustomerHandler, makePaymentHandler } = require('./payment.controller');

const router = Router();

// CRUD
router.post('/card-token', isAuthenticated(), createtTokenHandler);
router.post('/create-customer', isAuthenticated(), createCustomerHandler);
router.post('/make-payment', isAuthenticated(), makePaymentHandler);

module.exports = router;
