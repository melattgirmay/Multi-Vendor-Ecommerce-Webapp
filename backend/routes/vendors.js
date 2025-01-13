const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { registerVendor, vendorLogin, getVendorProducts } = require('../controllers/VendorController');
const authMiddleware = require('../middlewares/authMiddleware');
const Vendor = require('../models/Vendor');

// Vendor Registration Route
router.post('/register', registerVendor);

// Vendor Login Route
router.post('/login', vendorLogin);

// Dashboard Route for getting vendor details
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const vendorId = req.vendorId;  // vendorId comes from the decoded JWT

        // Validate the vendorId format using mongoose ObjectId
        if (!mongoose.Types.ObjectId.isValid(vendorId)) {
            return res.status(400).json({ message: 'Invalid vendorId format' });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        console.error('Error in /dashboard route:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Route for getting vendor products (protected by authMiddleware)
router.get('/products/vendor', authMiddleware, getVendorProducts);

module.exports = router;
