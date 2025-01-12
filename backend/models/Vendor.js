const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
