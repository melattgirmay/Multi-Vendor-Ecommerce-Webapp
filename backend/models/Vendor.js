// C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\backend\models\Vendor.js
const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
