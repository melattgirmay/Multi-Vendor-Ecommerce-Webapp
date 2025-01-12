const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Vendor = require('../models/Vendor'); // Add this line to import the Vendor model
const Product = require('../models/Product'); // Import the Product model


console.log(Product);

const router = express.Router();

// Set up multer storage (store files in the 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// Add product route with image upload handling
router.post('/add', upload.single('image'), async (req, res) => {
  console.log('Headers:', req.headers); // Log request headers
  console.log('File:', req.file); // Log file
  console.log('Body:', req.body); // Log form fields

  const { name, description, category, price, stockQuantity } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Authorization Token:', req.headers.authorization);
  const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

  if (!name || !description || !category || !price || !stockQuantity || !req.file) {
    return res.status(400).json({ message: 'All fields, including image, are required.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decodedToken);

    // Correctly access the vendorId from the decoded token
    const vendorId = decodedToken.vendorId;

    const vendorExists = await Vendor.findById(vendorId);
    if (!vendorExists) {
      console.error('Vendor not found with ID:', vendorId);
      return res.status(404).json({ message: 'Vendor not found.' });
    }
    console.log('Vendor exists:', vendorExists);

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      stockQuantity,
      imageUrl,
      vendor: vendorId,
    });

    // Ensure that this part is inside the try block, to handle errors properly
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error("Error while saving product:", error); // Log the error
    res.status(500).json({ message: 'Failed to add product', error });
  }
});


// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const { name, description, category, price, stockQuantity } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, category, price, stockQuantity },
            { new: true } // Return the updated product
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
});

// Other product routes like GET, PUT, DELETE remain the same...

module.exports = router;
