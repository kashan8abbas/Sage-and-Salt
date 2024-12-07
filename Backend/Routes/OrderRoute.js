const express = require('express');
const Order = require('../Models/Order');
const User = require('../Models/User');
const authMiddleware = require('../Middlewares/AuthMiddleware');

const router = express.Router();

// Create a new order
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice, customization } = req.body; // Accept customization
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided in the order' });
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      customization, // Save customization
      tracking: { status: 'Preparing', lastUpdated: Date.now() },
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});


// Get orders for the logged-in user
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
      .populate("items.itemId", "name") // Populate itemId with the name of the item
      .exec();

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Update order tracking status
router.patch('/update-tracking/:orderId', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { 'tracking.status': status, 'tracking.lastUpdated': Date.now() },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Tracking status updated', order: updatedOrder });
  } catch (err) {
    console.error('Error updating tracking status:', err);
    res.status(500).json({ error: 'Failed to update tracking status' });
  }
});

module.exports = router;
