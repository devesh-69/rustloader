const express = require("express");
const { registerOwner, loginOwner } = require("../controllers/ownerController");
const {
  validateOwnerRegistration,
  validateOwnerLogin,
} = require("../middlewares/ownerValidation");
const OwnerDocumentsMiddleware = require("../middlewares/OwnerDocumentsMiddleware");

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
