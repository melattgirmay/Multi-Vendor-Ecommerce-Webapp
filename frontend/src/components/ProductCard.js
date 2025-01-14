import React, { useState } from "react";
import { addToCart, addToWishlist } from "../api/user"; // Assume these methods exist

const ProductCard = ({ product }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false); // Check authentication based on localStorage token

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please sign in first to add items to the cart.");
      return;
    }
  
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID is not available.");
      return;
    }
  
    const quantity = 1;  // Adjust based on your actual cart logic (e.g., could be dynamic)
    
    // Validate quantity before sending
    if (isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity.");
      return;
    }
  
    try {
      await addToCart(product._id, userId, quantity);  // Send valid quantity
      setCartCount(cartCount + 1);
    } catch (error) {
      console.error("Add to Cart error:", error.message);
    }
  };     

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      alert("Please sign in first to add items to the wishlist.");
      return; // Prevent further action
    }
    
    // Get the user ID from localStorage (or from where you store it after login)
    const userId = localStorage.getItem("userId");  // Adjust based on how you store the user ID
  
    if (!userId) {
      alert("User ID is not available.");
      return;
    }
  
    try {
      await addToWishlist(product._id, userId);  // Pass productId and userId as arguments
      setWishlistCount(wishlistCount + 1);
    } catch (error) {
      console.error(error.message);
    }
  };  

  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-xl shadow-xl overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-44 h-36 p-1 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-black">{product.name}</h3>
        <p className="text-gray-600 font-medium">{product.description}</p>
        <span className="text-gray-500 text-md">Price: {product.price} Birr</span>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
