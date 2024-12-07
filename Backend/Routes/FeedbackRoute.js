const express = require('express');
const Feedback = require('../Models/Feedback');
const Order = require('../Models/Order');
const authMiddleware = require('../Middlewares/AuthMiddleware');

const router = express.Router();

// Submit feedback for an order
router.post('/submit', authMiddleware, async (req, res) => {
    try {
        const { orderId, rating, comment } = req.body;
        const userId = req.user.id;

        // Check if the order exists and belongs to the logged-in user
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        if (order.userId.toString() !== userId) {
            return res.status(403).json({ error: 'You can only leave feedback for your own orders' });
        }

        // Create a new feedback document
        const feedback = new Feedback({
            userId,
            orderId,
            rating,
            comment,
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

// Get all feedback for a particular order
router.get('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find feedback for the specific order
        const feedback = await Feedback.find({ orderId });
        if (!feedback) {
            return res.status(404).json({ error: 'No feedback found for this order' });
        }

        res.status(200).json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
});



module.exports = router;
