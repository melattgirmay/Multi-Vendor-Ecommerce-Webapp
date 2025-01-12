import React, { useEffect, useState } from "react";
import { getCart, updateCart } from "../api/userApi";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getCart(token);
        setCart(data.cart);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch cart.");
      }
    };
    fetchCart();
  }, []);

  const handleUpdate = async (updatedCart) => {
    try {
      const token = localStorage.getItem("token");
      const data = await updateCart(updatedCart, token);
      setCart(data.cart);
      setMessage("Cart updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update cart.");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => handleUpdate(cart.filter((i) => i.id !== item.id))}>Remove</button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Cart;
