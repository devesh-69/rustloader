const mongoose = require("mongoose");
const Vehicle = require("./vehicle");

const VehicleSchema = new mongoose.Schema({
  vehicleType: { type: String, required: true },
  VehicleName: { type: String, required: true },
  fuelType: { type: String, required: true },
  weightCapacity: { type: Number, required: true },
  vehicleUse: { type: String, required: true },
  vehicleYear: { type: Number, required: true },
  kmDriven: { type: Number, required: true },
  otherDetails: { type: String },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  vehicleImages: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

// Specify the collection name as 'VehicleListings'
module.exports = mongoose.model("Vehicle", VehicleSchema, "VehicleListings");
