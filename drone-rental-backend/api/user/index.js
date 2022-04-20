const { Router } = require('express');
const verifyToken = require('../../middleware/auth');
const verifyAdminRole = require('../../middleware/isAdmin');
const {
  createUser, loginUser, updateUser, updatePassword, countUsers,
} = require('./user.controller');

const router = Router();

// CRUD
router.post('/createUser', createUser);
router.post('/login', loginUser);
router.patch('/updateUser', verifyToken, updateUser);
router.patch('/updatePassword', verifyToken, updatePassword);

// Admin
router.get('/countUsers', verifyToken, verifyAdminRole, countUsers);

module.exports = router;
