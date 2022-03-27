const { Router } = require('express');
const {
  createDrone,
  updateDrone,
  deleteDrone,
  getAllDrones,
  getDroneById,
  getDronesPerPage,
} = require('./drone.controller');

const router = Router();

// CRUD
router.post('/', createDrone);
router.put('/', updateDrone);
router.delete('/', deleteDrone);
router.get('/', getAllDrones);
router.get('/:id', getDroneById);
router.post('/:page', getDronesPerPage);

module.exports = router;
