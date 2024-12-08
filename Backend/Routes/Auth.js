const express = require('express');

const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const router = express.Router();
const JWT_SECRET = "sfasdfasgasfsdfasdf"; // Replace with a secure key

// Register Route


const bcrypt = require('bcryptjs'); // Import bcrypt

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, contactNumber, preferredAddress } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new user with hashed password
        const newUser = new User({
            name,
            email,
            passwordHash, // Store hashed password
            contactNumber,
            preferredAddress,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (err) {
        console.error('Error during user registration:', err); // Log error details
        res.status(500).json({ error: 'Failed to register user' });
    }
});




// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id, message: 'Login successful' }); // Include userId
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});






















module.exports = router;


