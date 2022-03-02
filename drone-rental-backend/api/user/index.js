const { Router } = require('express');
const { createUser, loginUser } = require('./user.controller');

const router = Router();

// CRUD
router.post('/createUser', createUser);
router.post('/login', loginUser);

module.exports = router;
