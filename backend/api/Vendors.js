const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor"); // Assuming you have a Vendor model

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

module.exports = router;
