const express = require("express");
const authMiddleware = require("../middlewares/auth");
const VendorController = require("../controllers/VendorController");
const router = express.Router();

// Vendor registration route
router.post("/register", VendorController.registerVendor);

// Vendor login route
router.post("/login", VendorController.vendorLogin);

// Vendor dashboard route (protected)
router.get("/dashboard", authMiddleware, VendorController.vendorDashboard);

module.exports = router;
