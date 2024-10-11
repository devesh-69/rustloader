const multer = require("multer");

// Define allowed file types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only PDF, PNG, JPG, and JPEG are allowed."),
      false
    );
  }
};

// Use memory storage for multer
const storage = multer.memoryStorage();

const OwnerDocumentsMiddleware = multer({
  storage,
  fileFilter,
}).array("documents"); // Accept multiple documents

module.exports = OwnerDocumentsMiddleware;
