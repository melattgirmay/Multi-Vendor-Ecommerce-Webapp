const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Consider hashing passwords
});

module.exports = mongoose.model('Seller', sellerSchema);
