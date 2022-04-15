const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');
const { createTokenHandler, createCustomerHandler, makePaymentHandler } = require('./payment.controller');

const router = Router();

// CRUD
router.post('/card-token', isAuthenticated(), createTokenHandler);
router.post('/create-customer', isAuthenticated(), createCustomerHandler);
router.post('/make-payment', isAuthenticated(), makePaymentHandler);

module.exports = router;
