const express = require("express");
const { registerOwner, loginOwner } = require("../Controllers/ownerController");
const {
  validateOwnerRegistration,
  validateOwnerLogin,
} = require("../Middlewares/ownerValidation");
const OwnerDocumentsMiddleware = require("../Middlewares/OwnerDocumentsMiddleware");

const router = express.Router();

// Route for owner registration
router.post(
  "/register",
  OwnerDocumentsMiddleware,
  validateOwnerRegistration,
  registerOwner
);

// Route for owner login
router.post("/login", validateOwnerLogin, loginOwner);

module.exports = router;
