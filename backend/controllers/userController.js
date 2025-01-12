// controllers/userController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart"); // Assuming Cart is a separate model for user cart functionality

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Create a cart for the new user
    const userCart = new Cart({ userId: newUser._id });
    await userCart.save();

    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // Access user ID from the token

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    // Check if the product is already in the cart
    const productIndex = cart.items.findIndex(item => item.productId === productId);
    if (productIndex >= 0) {
      cart.items[productIndex].quantity += quantity; // Update the quantity if product exists
    } else {
      cart.items.push({ productId, quantity }); // Add new product to the cart
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Cart
const getCart = async (req, res) => {
  const userId = req.user.userId; // Access user ID from the token

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, addToCart, getCart };
