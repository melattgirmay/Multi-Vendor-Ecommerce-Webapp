//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\backend\controllers\VendorController.js
const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Vendor Login Controller
const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if vendor exists
        const vendor = await Vendor.findOne({ email: email.toLowerCase() });
        if (!vendor) {
            console.log('Vendor not found for email:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            console.log('Password mismatch for email:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a token
        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Respond with success
        res.status(200).json({
            message: 'Login successful',
            token,
            vendor: { id: vendor._id, email: vendor.email },
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { vendorLogin };
