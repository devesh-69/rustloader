const {
  signup,
  login,
  uploadMiddleware,
} = require("../Controllers/AuthController");
const {
  signUpValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");
const router = require("express").Router();

// login and signUp added for POST
router.post("/signup", uploadMiddleware, signUpValidation, signup); // Include uploadMiddleware for handling image uploads
router.post("/login", loginValidation, login);

module.exports = router;
