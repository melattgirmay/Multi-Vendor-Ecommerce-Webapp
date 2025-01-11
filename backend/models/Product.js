//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\backend\models\Product.js
const mongoose = require("mongoose");

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String, // Store the image URL
    default: "",
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the Product model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
