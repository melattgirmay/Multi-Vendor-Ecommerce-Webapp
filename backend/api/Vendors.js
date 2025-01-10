const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor"); // Assuming you have a Vendor model
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  try {
    const { shopName, email, password } = req.body;

    // Validation logic
    if (!shopName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the Vendor to the database
    const newVendor = new Vendor({ shopName, email, password });
    await newVendor.save(); // This should insert the data into MongoDB

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error registering Vendor:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are being received
  console.log('Received login data:', { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (vendor.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { vendorId: vendor._id, email: vendor.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;