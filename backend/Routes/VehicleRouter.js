const { Router } = require("express");
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  rentVehicle,
} = require("../Controllers/VehicleController");
const uploadVehicleMiddleware = require("../Middlewares/uploadVehicleMiddleware");

const router = Router();

// Route to list a new vehicle
router.post("/list", uploadVehicleMiddleware, createVehicle);

// Route to get all listed vehicles
router.get("/listings", getVehicles);

// Route to get a specific vehicle by ID
router.get("/listings/:id", getVehicleById);

// Route to rent a vehicle (mark it as unavailable)
router.patch("/listings/:id", rentVehicle);

module.exports = router;
