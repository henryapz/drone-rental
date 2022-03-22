const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');
const { createtTokenHandler, createCustomerHandler } = require('./payment.controller');

const router = Router();

// CRUD
router.post('/card-token', isAuthenticated(), createtTokenHandler);
router.post('/create-customer', isAuthenticated(), createCustomerHandler);

module.exports = router;
