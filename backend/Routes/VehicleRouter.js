const { Router } = require("express");
const {
  createVehicle,
  getVehicles,
  rentVehicle,
} = require("../Controllers/VehicleController");
const uploadVehicleMiddleware = require("../Middlewares/uploadVehicleMiddleware");

const router = Router();

// Route to list a new vehicle
router.post("/list", uploadVehicleMiddleware, createVehicle);

// Route to get all listed vehicles
router.get("/listings", getVehicles);

// Route to rent a vehicle (mark it as unavailable)
router.patch("/rent/:id", rentVehicle);

module.exports = router;
