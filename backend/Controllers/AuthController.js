const multer = require("multer");
const UserModel = require("../Models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Set up multer for handling image uploads
const storage = multer.memoryStorage(); // Store files in memory for easy access
const upload = multer({ storage });

// Sign-up logic with file uploads
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobileNumber,
      address,
      aadhaarNumber,
      panCardNumber,
    } = req.body;

    // Check if user with the same email, Aadhaar, or PAN already exists
    const customer = await UserModel.findOne({
      $or: [{ email }, { mobileNumber }, { aadhaarNumber }, { panCardNumber }],
    });

    if (customer) {
      let message = "";
      if (customer.email === email) {
        message = "Email is already registered. Please login.";
      } else if (customer.mobileNumber === mobileNumber) {
        message = "Mobile number is already in use. Please login.";
      } else if (customer.aadhaarNumber === aadhaarNumber) {
        message = "Aadhaar number is already registered. Please login.";
      } else if (customer.panCardNumber === panCardNumber) {
        message = "PAN card number is already registered. Please login.";
      }

      return res.status(409).json({ message, success: false });
    }

    // Create a new user with image data
    const newUser = new UserModel({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      mobileNumber,
      address,
      profilePic: {
        data: req.files.profilePic ? req.files.profilePic[0].buffer : null,
        contentType: req.files.profilePic
          ? req.files.profilePic[0].mimetype
          : null,
      },
      aadhaarNumber,
      aadhaarPhoto: {
        data: req.files.aadhaarPhoto[0].buffer,
        contentType: req.files.aadhaarPhoto[0].mimetype,
      },
      panCardNumber,
      panCardPhoto: {
        data: req.files.panCardPhoto[0].buffer,
        contentType: req.files.panCardPhoto[0].mimetype,
      },
    });

    await newUser.save();
    res.status(201).json({
      message: "Signup SUCCESSFULLY",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error: ", error); // Log the error for debugging
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// For Login Logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the same email already exists
    const customer = await UserModel.findOne({ email });
    const errorMsg = "Auth Failed: Email or Password is Wrong";

    if (!customer) {
      console.log("No customer found for email:", email);
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Decrypt Password and compare from user and server
    const isPassEqual = await bcrypt.compare(password, customer.password);
    console.log("Password comparison result:", isPassEqual); // Log the comparison result

    if (!isPassEqual) {
      console.log("Incorrect password for email:", email);
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Encrypt and throw JWT token
    const jwtToken = jwt.sign(
      { email: customer.email, _id: customer._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("Generated JWT Token:", jwtToken); // Log the generated token

    res.status(200).json({
      message: "Login SUCCESS",
      success: true,
      jwtToken,
      email: customer.email,
      name: customer.name,
    });
  } catch (error) {
    console.error("Login Error: ", error); // Log the error for debugging
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Middleware to handle file uploads
const uploadMiddleware = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "aadhaarPhoto", maxCount: 1 },
  { name: "panCardPhoto", maxCount: 1 },
]);

module.exports = {
  signup,
  login,
  uploadMiddleware,
};
