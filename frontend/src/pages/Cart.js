//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\frontend\src\pages\Cart.js
import React, { useEffect, useState } from "react";
import { getCart, updateCart } from "../api/userApi";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getCart(token);
        setCart(data || []);
        setLoading(false);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch cart.");
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = cart.filter((item) => item.productId !== itemId);
      const token = localStorage.getItem("token");
      await updateCart(updatedCart, token);
      setCart(updatedCart);
      setMessage("Item removed successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update cart.");
    }
  };  

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      if (quantity < 1) return; // Prevent zero or negative quantities
      const updatedCart = cart.map((item) =>
        item.productId === itemId ? { ...item, quantity } : item
      );
      const token = localStorage.getItem("token");
      await updateCart(updatedCart, token);
      setCart(updatedCart);
      setMessage("Cart updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update cart.");
    }
  };

  if (loading) return <p>Loading your cart...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Cart Section */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link
              to="/products"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between p-4 border rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imageUrl || "/placeholder.jpeg"}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-gray-500">{item.product.category}</p>
                    <p className="text-teal-600 font-bold">
                      {(item.product.price * item.quantity).toFixed(2)} Birr
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <p className="px-4">{item.quantity}</p>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Cart;
