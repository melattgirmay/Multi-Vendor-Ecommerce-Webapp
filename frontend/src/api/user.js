//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\frontend\src\api\User.js
import axios from 'axios';

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', userData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// User Login
export const userLogin = async (loginData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', loginData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Add to Wishlist
export const addToWishlist = async (productId, token) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/wishlist', { productId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Add token for authentication
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Get Wishlist
export const getWishlist = async (token) => {
    try {
        const response = await axios.get('http://localhost:5000/api/users/wishlist', {
            headers: {
                Authorization: `Bearer ${token}`, // Add token for authentication
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};