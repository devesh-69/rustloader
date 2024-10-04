const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    aadhaarNumber: {
      type: String,
      required: true,
    },
    panCardNumber: {
      type: String,
      required: true,
    },
    profilePic: {
      data: Buffer,
      contentType: String,
    },
    aadhaarPhoto: {
      data: Buffer,
      contentType: String,
    },
    panCardPhoto: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

// Explicitly set collection name to "CustomerLogin"
const UserModel = mongoose.model("User", UserSchema, "CustomerLogin");

module.exports = UserModel;
