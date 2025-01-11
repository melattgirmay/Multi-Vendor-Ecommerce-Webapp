//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\backend\server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const VendorRoutes = require("./routes/vendor");
const productRoutes = require('./routes/products');

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse incoming JSON data
app.use(express.json());

// Use Vendor routes
app.use("/api/vendors", VendorRoutes);

// Use Product routes
app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
