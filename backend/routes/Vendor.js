//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\backend\routes\vendor.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");
const router = express.Router();

// Vendor registration route
router.post("/register", async (req, res) => {
  const { shopName, email, password } = req.body;

  if (!shopName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Vendor
    const newVendor = new Vendor({ shopName, email, password: hashedPassword });
    await newVendor.save();

    res.status(201).json({
      message: "Registration successful!",
      vendor: {
        id: newVendor._id,
        shopName: newVendor.shopName,
        email: newVendor.email,
      },
    });
  } catch (error) {
    console.error("Error registering Vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Vendor login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { vendorId: vendor._id, email: vendor.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Vendor dashboard route
const authMiddleware = require("../middlewares/auth");

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.vendorId).select("-password");
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
