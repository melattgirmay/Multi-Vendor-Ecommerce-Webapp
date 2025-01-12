import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Backend endpoint

// User Registration
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// User Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login API error:", error.response?.data || error.message);
    throw error.response || { message: "Login failed" };
  }
};

// Fetch User Profile
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add to Cart
export const addToCart = async (itemId, token) => {
  const response = await axios.post(
    `${API_URL}/cart`,
    { itemId },
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
  const response = await axios.get(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update Cart
export const updateCart = async (cartItems, token) => {
  const response = await axios.put(`${API_URL}/cart`, cartItems, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add to Wishlist
export const addToWishlist = async (itemId, token) => {
  const response = await axios.post(
    `${API_URL}/wishlist`,
    { itemId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Fetch Wishlist
export const getWishlist = async (token) => {
  const response = await axios.get(`${API_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update Wishlist
export const updateWishlist = async (wishlistItems, token) => {
  const response = await axios.put(`${API_URL}/wishlist`, wishlistItems, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
