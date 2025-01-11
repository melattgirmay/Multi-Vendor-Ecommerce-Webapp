// routes/product.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/product'); // Import product model

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');  // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp to avoid naming conflicts
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;  // Allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  },
}).single('image'); // 'image' will be the key for the file field in the form

// Route to add product
router.post('/add', upload, (req, res) => {
  const { name, description, category, price, stockQuantity } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Store image URL in the db

  const newProduct = new Product({
    name,
    description,
    category,
    price,
    stockQuantity,
    imageUrl,
  });

  newProduct.save()
    .then((product) => {
      res.status(201).json({ message: 'Product added successfully', product });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to add product', error: err });
    });
});

module.exports = router;
