const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            wishlist: [],
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: { _id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Wishlist
const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user.wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const addToWishlist = async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user._id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
        return res.status(200).json({ message: 'Product added to wishlist' });
      } else {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
    registerUser,
    userLogin,
    addToWishlist,
    getWishlist,
};
