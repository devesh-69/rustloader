// const mongoose = require("mongoose");
// const Vehicle = require("../Models/vehicle");

// // Create a new vehicle listing
// const createVehicle = async (req, res) => {
//   try {
//     const {
//       vehicleType,
//       VehicleName,
//       fuelType,
//       weightCapacity,
//       vehicleUse,
//       vehicleYear,
//       kmDriven,
//       otherDetails,
//       price,
//       duration,
//     } = req.body;

//     // Check if price is less than 6700
//     if (price < 6700) {
//       return res.status(400).json({ message: "₹6700 is a minimum amount." });
//     }

//     // Check if duration is less than 1
//     if (duration < 1) {
//       return res
//         .status(400)
//         .json({ message: "Duration must be at least 1 day." });
//     }

//     // Create the new vehicle document
//     const newVehicle = new Vehicle({
//       vehicleType,
//       VehicleName,
//       fuelType,
//       weightCapacity,
//       vehicleUse,
//       vehicleYear,
//       kmDriven,
//       otherDetails,
//       price,
//       duration,
//       vehicleImages: req.files.vehicleImages.map((file) => ({
//         data: file.buffer,
//         contentType: file.mimetype,
//       })),
//     });

//     await newVehicle.save();
//     res.status(201).json({ message: "Vehicle listed successfully!" });
//   } catch (error) {
//     console.error("Error listing vehicle:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to list vehicle", error: error.message });
//   }
// };

// // Get all listed vehicles
// const getVehicles = async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find({});
//     // Convert buffer data to base64 strings
//     const vehiclesWithBase64Images = vehicles.map((vehicle) => ({
//       ...vehicle.toObject(),
//       vehicleImages: vehicle.vehicleImages.map((image) => ({
//         contentType: image.contentType,
//         data: image.data.toString("base64"),
//       })),
//     }));

//     res.status(200).json(vehiclesWithBase64Images);
//   } catch (error) {
//     console.error("Error fetching vehicles:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch vehicles", error: error.message });
//   }
// };

// module.exports = { createVehicle, getVehicles };

const mongoose = require("mongoose");
const Vehicle = require("../Models/vehicle");

const createVehicle = async (req, res) => {
  try {
    // Check for multer errors (file size or format issues)
    if (!req.files || !req.files.vehicleImages) {
      return res.status(400).json({ message: "No vehicle images uploaded." });
    }

    // File validation (multer has already validated size and format)
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    }

    const {
      vehicleType,
      VehicleName,
      fuelType,
      weightCapacity,
      vehicleUse,
      vehicleYear,
      kmDriven,
      otherDetails,
      price,
      duration,
    } = req.body;

    // Check if price is less than 6700
    if (price < 6700) {
      return res.status(400).json({ message: "₹6700 is a minimum amount." });
    }

    // Check if duration is less than 1
    if (duration < 1) {
      return res
        .status(400)
        .json({ message: "Duration must be at least 1 day." });
    }

    // Create the new vehicle document
    const newVehicle = new Vehicle({
      vehicleType,
      VehicleName,
      fuelType,
      weightCapacity,
      vehicleUse,
      vehicleYear,
      kmDriven,
      otherDetails,
      price,
      duration,
      vehicleImages: req.files.vehicleImages.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      })),
    });

    await newVehicle.save();
    res.status(201).json({ message: "Vehicle listed successfully!" });
  } catch (error) {
    console.error("Error listing vehicle:", error);

    // Check for Multer error
    if (error instanceof multer.MulterError) {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to list vehicle", error: error.message });
    }
  }
};

// Get all listed vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    // Convert buffer data to base64 strings
    const vehiclesWithBase64Images = vehicles.map((vehicle) => ({
      ...vehicle.toObject(),
      vehicleImages: vehicle.vehicleImages.map((image) => ({
        contentType: image.contentType,
        data: image.data.toString("base64"),
      })),
    }));

    res.status(200).json(vehiclesWithBase64Images);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch vehicles", error: error.message });
  }
};

module.exports = { createVehicle, getVehicles };
