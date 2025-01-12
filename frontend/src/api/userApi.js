// src/api/userApi.js

import axios from "axios";

// User Registration
export const registerUser = async (userData) => {
  const response = await axios.post("http://localhost:5000/api/users/register", userData);
  return response.data;
};

// User Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", userData);
    return response.data;
  } catch (error) {
    console.error("Login API error:", error.response?.data || error.message);
    throw error.response || { message: "Login failed" };
  }
};

// Fetch User Profile
export const getUserProfile = async (token) => {
  const response = await axios.get("http://localhost:5000/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add to Cart
export const addToCart = async (productId, quantity, token) => {
  const response = await axios.post(
    "http://localhost:5000/api/users/cart",
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Fetch Cart
export const getCart = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/api/users/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Update Cart
export const updateCart = async (cartItems, token) => {
  const response = await axios.put("http://localhost:5000/api/users/cart", cartItems, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
