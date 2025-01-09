const express = require("express");
const router = express.Router();

// POST route for registering sellers
router.post("/register", (req, res) => {
  const { shopName, email, password, confirmPassword } = req.body;

  // Validation logic
  if (!shopName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Here you can add logic to save the seller data to the database

  res.status(201).json({ message: "Seller registered successfully" });
});

module.exports = router;
