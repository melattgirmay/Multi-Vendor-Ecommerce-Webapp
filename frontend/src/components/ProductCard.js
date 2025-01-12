//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\frontend\src\components\ProductCard.js

import React from "react";
import { addToCart } from "../api/userApi"; // Importing API functions for adding to cart

const ProductCard = ({ product }) => {
  const baseUrl = "http://localhost:5000"; // Backend base URL
  const token = localStorage.getItem("token"); // Get token from localStorage

  // Function to handle adding product to the cart
  const handleAddToCart = async () => {
    const quantity = 1;
    if (token) {
      try {
        await addToCart(product._id, quantity, token); // Ensure correct ID
        alert("Product added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error.message);
      }
    } else {
      alert("Please sign in first to add to cart.");
    }
  };  

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <img
        src={product.imageUrl ? `${baseUrl}${product.imageUrl}` : "/placeholder.jpeg"}
        alt={product.name}
        className="w-40 h-40 object-cover mb-4"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-teal-600 font-bold">{product.price.toFixed(2)} Birr</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
