const express = require("express");
const router = express.Router();

// Example POST route for registering sellers
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Validation or database logic here
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  res.status(201).json({ message: "Seller registered successfully" });
});

module.exports = router;
