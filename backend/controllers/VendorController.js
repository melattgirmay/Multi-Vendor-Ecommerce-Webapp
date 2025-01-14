const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Vendor Registration
const registerVendor = async (req, res) => {
    const { shopName, email, password } = req.body;

    if (!shopName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({ shopName, email, password: hashedPassword });
        await newVendor.save();

        const token = jwt.sign(
            { vendorId: newVendor._id, email: newVendor.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "Registration successful!",
            token,
            vendor: { id: newVendor._id, shopName: newVendor.shopName, email: newVendor.email },
        });
    } catch (error) {
        console.error('Error during vendor registration:', error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Vendor Login
const vendorLogin = async (req, res) => {
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

        res.status(200).json({
            message: "Login successful",
            token,
            vendor: { id: vendor._id, email: vendor.email },
        });
    } catch (error) {
        console.error('Error during vendor login:', error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Vendor Products
const getVendorProducts = async (req, res) => {
    const vendorId = req.vendorId;

    if (!vendorId) {
        console.error('No vendorId found in request');
        return res.status(400).json({ message: 'VendorId is missing' });
    }

    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
        console.error('Invalid vendorId format:', vendorId);
        return res.status(400).json({ message: 'Invalid vendorId format' });
    }

    try {
        const products = await Product.find({ vendor: new mongoose.Types.ObjectId(vendorId) });
        
        if (products.length === 0) {
            return res.status(200).json({
                message: 'No products found for this vendor',
                products: [],
            });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

module.exports = { registerVendor, vendorLogin, getVendorProducts };