const express = require('express');
const Product = require('../models/Product'); // Import the Product model

const router = express.Router();

// Add a product
router.post('/add', async (req, res) => {
    const { name, description, category, price, stockQuantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
    
    try {
        // Decode the token to get the vendorId
        const decodedToken = jwt.verify(token, 'your_secret_key');
        const vendorId = decodedToken.id;  // assuming vendor id is in the decoded token

        // Create a new product with the vendor reference
        const newProduct = new Product({
            name,
            description,
            category,
            price,
            stockQuantity,
            vendor: vendorId,  // Associate the product with the vendor
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        console.error(error);
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

module.exports = router;
