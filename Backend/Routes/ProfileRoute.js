const express = require('express');
const User = require('../Models/User');
const Order = require('../Models/Order');
const authMiddleware = require('../Middlewares/AuthMiddleware');

const router = express.Router();

// View Profile Details
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('orderHistory') // Populate order details
            .populate('reservationHistory'); // Populate reservation details

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
            preferredAddress: user.preferredAddress,
            deliveryPreferences: user.deliveryPreferences,
            orderHistory: user.orderHistory,
            reservationHistory: user.reservationHistory,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch profile details' });
    }
});


// Update Personal Information (Name, Contact Details)
router.put('/update', authMiddleware, async (req, res) => {
    try {
        const { name, contactNumber } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update the user details
        user.name = name || user.name;
        user.contactNumber = contactNumber || user.contactNumber;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Set Delivery Preferences (Preferred Address, Contact Number)
router.put('/delivery-preferences', authMiddleware, async (req, res) => {
    try {
        const { preferredAddress, contactNumber } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update delivery preferences
        user.deliveryPreferences.preferredAddress = preferredAddress || user.deliveryPreferences.preferredAddress;
        user.deliveryPreferences.contactNumber = contactNumber || user.deliveryPreferences.contactNumber;

        await user.save();
        res.status(200).json({ message: 'Delivery preferences updated', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update delivery preferences' });
    }
});

// View Order History and Reorder from Past Orders
router.get('/order-history', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('orderHistory');

        if (!user) return res.status(404).json({ error: 'User not found' });

        // Fetch order history
        const orders = user.orderHistory;

        res.status(200).json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
});



module.exports = router;