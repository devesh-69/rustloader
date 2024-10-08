const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const VehicleRouter = require("./Routes/VehicleRouter");

// Required files
require("dotenv").config();
require("./Models/database");

// Initialize the app
const PORT = process.env.PORT || 8080;
const app = express();

// Middleware and routes here
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/api/vehicles", VehicleRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
