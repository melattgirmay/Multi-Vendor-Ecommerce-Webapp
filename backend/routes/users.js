const express = require("express");
const authUserMiddleware = require("../middlewares/authUser");
const { registerUser, loginUser, addToCart, addToWishlist, getCart, getWishlist } = require("../controllers/UserController");

const router = express.Router();

// Routes for user authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes for cart and wishlist
router.post("/add-to-cart", authUserMiddleware, addToCart); // Add product to cart
router.post("/add-to-wishlist", authUserMiddleware, addToWishlist); // Add product to wishlist

router.get('/cart', authUserMiddleware, getCart);
router.get('/wishlist', authUserMiddleware, getWishlist);

module.exports = router;

