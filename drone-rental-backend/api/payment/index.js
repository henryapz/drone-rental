const { Router } = require('express');
const { createtTokenHandler } = require('./payment.controller');

const router = Router();

// CRUD
router.post('/card-token', createtTokenHandler);

module.exports = router;
