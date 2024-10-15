const express = require("express");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const VehicleRouter = require("./routes/VehicleRouter");
const OwnerRouter = require("./routes/ownerRoutes");

require("dotenv").config();
require("./models/database");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

// Add routes
app.use("/auth", AuthRouter);
app.use("/api/vehicles", VehicleRouter);
app.use("/owner", OwnerRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the RustLoader!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
