// Add this at the top of your db.js file
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import the connectDB function
const VendorsRoutes = require("./api/Vendors");

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Use Vendor routes
app.use("/api/Vendors", VendorsRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});