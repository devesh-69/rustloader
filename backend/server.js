const express = require("express");
const bodyParser = require("body-parser");
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
  res.send("Welcome to the homepage!");
});

app.get("/test", (req, res) => {
  res.send("Testing if it's working or not TEMP!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
