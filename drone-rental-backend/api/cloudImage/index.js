const { Router } = require('express');
const { loadImage, getAllImages } = require('./cloudImage.controller');

const router = Router();

// CRUD
router.post('/', loadImage);
router.get('/', getAllImages);

module.exports = router;
