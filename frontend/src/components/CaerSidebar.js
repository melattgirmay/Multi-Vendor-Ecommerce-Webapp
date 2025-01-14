import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const CartSidebar = ({ onClose }) => {
  const [cart, setCart] = useState([]);
  const userToken = localStorage.getItem("token"); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchCart = async () => {
      if (!userToken) {
        alert("Please log in to view your cart.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/users/cart", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        console.log("Cart Response:", response.data); // Debugging: log the cart data

        // Fetch product details for each cart item based on the product._id
        const updatedCart = await Promise.all(
          response.data.map(async (cartItem) => {
            if (!cartItem.product || !cartItem.product._id) {
              console.warn("Product ID is missing for cart item:", cartItem);
              return cartItem; // Skip this cart item if no productId is found
            }

            try {
              const productResponse = await axios.get(
                `http://localhost:5000/api/products/${cartItem.product._id}` // Use cartItem.product._id to get the product details
              );
              console.log("Fetched product details:", productResponse.data); // Debugging line

              return {
                ...cartItem,
                ...productResponse.data, // Merge product details into cart item
              };
            } catch (productError) {
              if (productError.response && productError.response.status === 404) {
                console.error("Product not found:", cartItem.product._id);
              } else {
                console.error("Failed to fetch product details for", cartItem.product._id);
              }
              return cartItem; // Return the cart item as is if product fetch fails
            }
          })
        );

        setCart(updatedCart); // Set the cart with product details
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        alert("Could not fetch cart.");
      }
    };

    fetchCart();
  }, [userToken]);

  return (
    <div className="cart-sidebar fixed top-0 right-0 h-full bg-white shadow-xl z-50 p-6 w-96">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black"
      >
        <AiOutlineClose />
      </button>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="flex items-center border-b pb-4">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
              )}
              <div className="flex-1">
                <span className="text-lg font-medium">{item.name || "Product Name"}</span>
                <div className="text-sm text-gray-500">
                  Price: {item.productPrice ? `${item.productPrice} Birr` : "N/A"}
                </div>
                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartSidebar;
