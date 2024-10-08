const { Router } = require('express');
const { createVehicle, getVehicles } = require('../Controllers/VehicleController');
const uploadVehicleMiddleware = require('../Middlewares/uploadVehicleMiddleware');

const router = Router();

// Route to list a new vehicle
router.post('/list', uploadVehicleMiddleware, createVehicle);

// Route to get all listed vehicles
router.get('/listings', getVehicles);

module.exports = router;
