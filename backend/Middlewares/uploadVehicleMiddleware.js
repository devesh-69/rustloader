const multer = require("multer");

// Define allowed file types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed."),
      false
    );
  }
};

// Use memory storage for multer
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadVehicleMiddleware = upload.fields([
  { name: "vehicleImages", maxCount: 4 }, // Accept up to 4 images
]);

module.exports = uploadVehicleMiddleware;
