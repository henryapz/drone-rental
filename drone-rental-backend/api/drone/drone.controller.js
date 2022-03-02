const Drone = require('./drone.model');

async function createDrone(req, res) {
  const data = req.body;
  try {
    const drone = await Drone.create(data);
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
  const { id } = req.body;
  try {
    const drone = await Drone.findByIdAndDelete(id);
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
};
