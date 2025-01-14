import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";

const ProductCard = ({ product, fetchCartAndWishlist }) => {
  const userToken = localStorage.getItem("token");

  const handleAddToWishlist = async () => {
    if (!userToken) {
      alert("Please log in to add to wishlist.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/users/wishlist",
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      alert("Added to Wishlist!");
      fetchCartAndWishlist(); // Fetch updated wishlist
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      alert("Could not add to Wishlist.");
    }
  };

  const handleAddToCart = async () => {
    if (!userToken) {
      alert("Please log in to add to cart.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/users/cart",
        { productId: product._id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      alert("Added to Cart!");
      fetchCartAndWishlist(); // Fetch updated cart
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Could not add to Cart.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-xl shadow-xl overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-44 h-36 p-1 object-cover" />
      <div className="p-2 mt-2">
        <h3 className="text-xl font-semibold text-black">{product.name}</h3>
        <p className="text-gray-600 font-medium">{product.description}</p>
        <span className="text-gray-500 text-md">Price: {product.price} Birr</span>
      </div>
      <div className="flex space-x-2 p-2">
        <button onClick={handleAddToWishlist} className="text-red-500">
          <AiOutlineHeart size={24} />
        </button>
        <button onClick={handleAddToCart} className="text-white rounded-md w-36 h-9 text-center bg-[#cc3366]">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
