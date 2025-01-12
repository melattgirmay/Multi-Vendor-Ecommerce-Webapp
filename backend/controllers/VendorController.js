const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

        const token = jwt.sign({ vendorId: newVendor._id, email: newVendor.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            message: "Registration successful!",
            token,
            vendor: {
                id: newVendor._id,
                shopName: newVendor.shopName,
                email: newVendor.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Vendor Login
const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ vendorId: vendor._id, email: vendor.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: 'Login successful',
            token,
            vendor: { id: vendor._id, email: vendor.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Vendor Dashboard
const vendorDashboard = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.vendor.vendorId).select("-password");
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerVendor, vendorLogin, vendorDashboard };
