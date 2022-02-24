const { Router } = require('express');
const { createUser } = require('./user.controller');

const router = Router();

// CRUD
router.post('/createUser', createUser);

module.exports = router;
