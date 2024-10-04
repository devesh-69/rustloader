const Joi = require("joi");

// signUp validation
const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
    mobileNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]{10}$/) // Ensure it's exactly 10 digits
      .required(),
    address: Joi.string().max(200).required(),
    aadhaarNumber: Joi.string()
      .pattern(/^(?![01])[0-9]{12}$/) // Format: 12 digits, no spaces
      .required(),
    panCardNumber: Joi.string()
      .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) // Format for PAN card
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

// Login validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

module.exports = { signUpValidation, loginValidation };
