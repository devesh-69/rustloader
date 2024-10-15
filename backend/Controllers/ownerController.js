const bcrypt = require("bcryptjs");
const OwnerModel = require("../Models/owner");
const jwt = require("jsonwebtoken");

exports.registerOwner = async (req, res) => {
  try {
    const { companyName, mobileNumber, address, email, password } = req.body;

    const existingOwner = await OwnerModel.findOne({ email });
    if (existingOwner) {
      return res
        .status(400)
        .json({ message: "Owner with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert the documents to base64
    const documents = req.files.map((file) => file.buffer.toString("base64"));

    const newOwner = new OwnerModel({
      companyName,
      mobileNumber,
      address,
      email,
      password: hashedPassword,
      documents,
    });

    await newOwner.save();

    // Create a JWT token after successful registration
    const token = jwt.sign(
      { id: newOwner._id, email: newOwner.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Owner registered successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering owner", error: error.message });
  }
};

exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the owner exists
    const owner = await OwnerModel.findOne({ email });
    if (!owner) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: owner._id, email: owner.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Send the token and owner information back to the client
    res.status(200).json({
      message: "Login successful",
      token,
      owner: {
        id: owner._id,
        companyName: owner.companyName,
        mobileNumber: owner.mobileNumber,
        address: owner.address,
        email: owner.email,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error logging in owner", error: error.message });
  }
};
