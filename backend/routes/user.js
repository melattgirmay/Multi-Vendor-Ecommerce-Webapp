// routes/user.js
const express = require("express");
const { registerUser, loginUser, addToCart, getCart } = require("../controllers/userController");
const authUserMiddleware = require("../middlewares/authUser");
const router = express.Router();

// User Registration and Login Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Add to Cart Route
router.post("/cart", authUserMiddleware, addToCart);
router.get("/cart", authUserMiddleware, getCart); // Ensure this is correctly defined

module.exports = router;
