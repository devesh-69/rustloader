const mongoose = require("mongoose");

const OwnerLoginSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  documents: {
    type: [String],
    required: true,
  },
});

// Explicitly set collection name to "OwnerLogin"
const OwnerModel = mongoose.model("Owner", OwnerLoginSchema, "OwnerLogin");

module.exports = OwnerModel;
