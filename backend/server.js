const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");

// required files
require("dotenv").config();
require("./Models/database");

// Initialize the app
const PORT = process.env.PORT || 8080;
const app = express();

// middleware and routes here
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
