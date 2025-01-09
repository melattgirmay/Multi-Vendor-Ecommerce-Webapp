const Seller = require('../models/Seller');
const bcrypt = require('bcryptjs');

const registerSeller = async (req, res) => {
    const { shopName, email, password } = req.body;

    try {
        // Check if email is already registered
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new seller
        const newSeller = new Seller({
            shopName,
            email,
            password: hashedPassword,
        });

        const savedSeller = await newSeller.save();

        res.status(201).json({ message: 'Seller registered successfully', seller: savedSeller });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerSeller };
