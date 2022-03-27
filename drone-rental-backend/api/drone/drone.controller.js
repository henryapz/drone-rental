/* eslint-disable no-underscore-dangle */
const Drone = require('./drone.model');
const Category = require('../category/category.model');

async function createDrone(req, res) {
  const data = req.body;
  const categoryId = await Category.findOne({ name: data.category_id }).exec();
  const payload = { ...data, category_id: categoryId._id };
  try {
    const drone = await Drone.create(payload);
    res.status(200).json(drone);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function updateDrone(req, res) {
  const data = req.body;
  try {
    const drone = await Drone.findByIdAndUpdate(data.id, { ...data });
    res.status(200).json(drone);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function deleteDrone(req, res) {
  const { ids } = req.body;
  try {
    const drone = await Drone.deleteMany({ _id: { $in: ids } });
    res.status(200).json(drone);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getAllDrones(req, res) {
  try {
    const allDrones = await Drone.find().populate('productImage category_id');
    res.status(200).json(allDrones);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getDronesPerPage(req, res) {
  const { perPage } = req.body;
  const page = Number(req.params.page);
  const start = perPage * (page - 1);
  const end = start + perPage;

  try {
    const drones = await Drone.find().populate('productImage category_id');
    const filteredDrones = drones.slice(start, end);
    res.status(200).json(filteredDrones);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getDroneById(req, res) {
  const { id } = req.params;
  try {
    const drone = await Drone.findById(id);
    res.status(200).json(drone);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createDrone,
  updateDrone,
  deleteDrone,
  getAllDrones,
  getDroneById,
  getDronesPerPage,
};
