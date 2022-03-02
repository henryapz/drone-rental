const { Router } = require('express');
const { loadImage } = require('./cloudImage.controller');

const router = Router();

// CRUD
router.post('/', loadImage);

module.exports = router;
