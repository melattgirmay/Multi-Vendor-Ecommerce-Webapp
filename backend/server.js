// C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\backend\server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const VendorsRoutes = require("./api/Vendors");

dotenv.config(); // To load environment variables from .env

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS to allow cross-origin requests (from the frontend)
app.use(cors({ origin: "http://localhost:3000" }))

// Middleware to parse incoming JSON data
app.use(express.json());

// Use Vendor routes
app.use("/api/Vendors", VendorsRoutes);

// Set the server to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
