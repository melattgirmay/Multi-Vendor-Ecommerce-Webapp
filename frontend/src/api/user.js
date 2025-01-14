import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Backend endpoint

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token"); // Adjust based on your localStorage setup
};

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

// Add to Cart (example)
export const addToCart = async (productId, userId, quantity = 1) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-to-cart`, 
      { productId, quantity }, // Include quantity in the request body
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Include token in Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Add to Cart error:", error.response?.data || error.message);
    throw error.response || { message: "Failed to add to cart" };
  }
};


// Add to Wishlist (example)
export const addToWishlist = async (productId, userId) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-to-wishlist`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Include token in Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Add to Wishlist error:", error.response?.data || error.message);
    throw error.response || { message: "Failed to add to wishlist" };
  }
};

// Fetch Cart Items
export const getCartItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    return response.data; // Assumes the API returns cart items with populated product data
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    throw error;
  }
};

// Fetch Wishlist Items
export const getWishlistItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    return response.data; // Assumes the API returns wishlist items with populated product data
  } catch (error) {
    console.error("Error fetching wishlist items:", error.message);
    throw error;
  }
};
