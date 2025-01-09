const express = require("express");
const cors = require("cors");
const app = express();

// Import the seller routes
const sellersRoutes = require("./api/sellers");

app.use(cors()); // Enable CORS to allow frontend requests
app.use(express.json()); // Parse incoming JSON data

// Use the sellers routes for any paths starting with /api/sellers
app.use("/api/sellers", sellersRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
