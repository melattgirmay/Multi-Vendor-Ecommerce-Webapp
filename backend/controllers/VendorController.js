const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const registerVendor = async (req, res) => {
    const { shopName, email, password } = req.body;

    try {
        // Check if email already exists
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Vendor
        const newVendor = new Vendor({
            shopName,
            email,
            password: hashedPassword,
        });

        // Save the Vendor to the database
        const savedVendor = await newVendor.save();

        res.status(201).json({ message: 'Vendor registered successfully', Vendor: savedVendor });
    } catch (error) {
        console.error('Error registering Vendor:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerVendor };
