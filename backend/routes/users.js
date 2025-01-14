const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { registerUser, userLogin, addToWishlist, getWishlist } = require('../controllers/UserController');
const authUser = require('../middlewares/authUser'); // Import the JWT authentication middleware
const User = require('../models/User');
const Product = require('../models/Product');

// User Registration Route
router.post('/register', registerUser);

// User Login Route
router.post('/login', userLogin);

// Route for adding a product to the user's wishlist (protected by authUser)
router.post('/wishlist', authUser, addToWishlist);

// Route for getting the user's wishlist (protected by authUser)
router.get('/wishlist', authUser, getWishlist);

module.exports = router;
