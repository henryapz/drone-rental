const { Router } = require('express');
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require('./category.controller');

const router = Router();

router.post('/', createCategory);
router.put('/', updateCategory);
router.delete('/', deleteCategory);
router.get('/', getAllCategories);
// router.get('/:id', );

module.exports = router;
