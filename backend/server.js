const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const VendorRoutes = require("./routes/vendor");
const productRoutes = require('./routes/products');
const userRoutes = require("./routes/user");

dotenv.config(); // Load environment variables

const app = express();

// Enable CORS with detailed configuration
app.use(cors());

// Handle preflight requests
app.options('*', cors());  // Enable preflight for all routes

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON data
app.use(express.json());

// Use Vendor routes
app.use("/api/vendors", VendorRoutes);

// Use Product routes
app.use("/api/products", productRoutes);

// User routes
app.use("/api/users", userRoutes); 

// Serve the /uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
