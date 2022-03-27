const Category = require('./category.model');

async function createCategory(req, res) {
  const data = req.body;
  try {
    const category = await Category.create(data);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function deleteCategory(req, res) {
  const { name } = req.body;
  try {
    const category = await Category.findOneAndDelete({ name });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error });
  }
}
async function updateCategory(req, res) {
  const data = req.body;
  try {
    const drone = await Category.findByIdAndUpdate(data.id, { ...data });
    res.status(200).json(drone);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.find().populate('image_id');
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
};
