const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user: { id: user._id, email: user.email, name: user.name }, token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  // Validate the quantity
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity, it must be a positive number" });
  }

  const userId = req.user.id;

  try {
    // Find the user from the database
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the product already exists in the user's cart
    const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (productIndex >= 0) {
      // If product is already in the cart, update the quantity
      user.cart[productIndex].quantity += quantity;
    } else {
      // If product is not in the cart, add a new product entry
      user.cart.push({ productId, quantity });
    }

    // Save the updated cart in the database
    await user.save();

    // Return the updated cart to the client
    res.status(200).json({ message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    // Log the error and send a 500 status code with the error message
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error, could not update cart", error: error.message });
  }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;  // This comes from the authUserMiddleware (JWT)

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if product is already in the wishlist
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Fetch the user ID from the token

    // Fetch the user and populate the cart's productId with product details
    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If cart is empty, return a message
    if (user.cart.length === 0) {
      return res.status(200).json({ message: "Your cart is empty" });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the token

    // Populate the product details for each item in the wishlist
    const user = await User.findById(userId).populate({
      path: "wishlist", // We are populating the wishlist
      model: "Product", // Ensure this is pointing to the Product model
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the populated wishlist for debugging purposes
    console.log("User Wishlist:", user.wishlist); // This should contain product details

    // If wishlist is empty, return a message
    if (user.wishlist.length === 0) {
      return res.status(200).json({ message: "Your wishlist is empty" });
    }

    // Send the populated wishlist back to the frontend
    res.status(200).json(user.wishlist); // This will contain full product details
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Failed to fetch wishlist", error: error.message });
  }
};

module.exports = { registerUser, loginUser, addToCart, addToWishlist, getCart, getWishlist };
