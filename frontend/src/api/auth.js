// src/api/auth.js
import axios from "axios";

// Login function
export const loginUser = async (formData) => {
  try {
    const response = await axios.post("/api/auth/login", formData);
    return response.data; // Expected: { token: <JWT token> }
  } catch (error) {
    throw error.response ? error.response : error; // Pass the error to the calling function
  }
};
