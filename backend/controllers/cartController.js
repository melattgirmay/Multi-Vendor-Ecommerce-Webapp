// controllers/cartController.js

const Cart = require("../models/Cart");
const Product = require("../models/Product"); // Assuming you have a Product model

// Add a product to the user's cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // The user ID is retrieved from the token

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (productIndex >= 0) {
      // If product exists in the cart, update its quantity
      cart.items[productIndex].quantity += quantity;
    } else {
      // Otherwise, add the product to the cart
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  const userId = req.user.userId; // The user ID is retrieved from the token

  try {
    // Find the user's cart and populate the product details
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

// Remove an item from the user's cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId; // The user ID is retrieved from the token

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the product to remove
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update the quantity of an item in the user's cart
const updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // The user ID is retrieved from the token

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Product ID and valid quantity are required" });
  }

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity of the product in the cart
    cart.items[productIndex].quantity = quantity;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear the user's cart
const clearCart = async (req, res) => {
  const userId = req.user.userId; // The user ID is retrieved from the token

  try {
    // Find the user's cart and clear it
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear the items in the cart
    cart.items = [];

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
};
