const { Router } = require('express');
const verifyToken = require('../../middleware/auth');
const {
  createUser, loginUser, updateUser, updatePassword,
} = require('./user.controller');

const router = Router();

// CRUD
router.post('/createUser', createUser);
router.post('/login', loginUser);
router.patch('/updateUser', verifyToken, updateUser);
router.patch('/updatePassword', verifyToken, updatePassword);

module.exports = router;
