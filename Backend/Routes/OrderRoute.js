const express = require('express');
const Order = require('../Models/Order');
const Stripe = require('stripe');
const User = require('../Models/User');
const authMiddleware = require('../Middlewares/AuthMiddleware');

const router = express.Router();
const stripe = new Stripe('sk_test_51QTOXLAoW233urmFyxXu7qbRwhyImWF90cnXhbJ36EtxT63poCSL2IGFDOX7EwZjDBa6ZnuiCvytAchuhASaGhch00QBTDmYd9');
















router.post('/create-payment-intent', authMiddleware, async (req, res) => {
  try {
    const { amount, orderDetails } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: 'usd',
      metadata: { orderDetails: JSON.stringify(orderDetails) }, // Store order details in metadata
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});



// Create a new order
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice, customization, paymentIntentId } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided in the order' });
    }

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Payment intent ID is required' });
    }

    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      customization,
      paymentIntentId,
      tracking: { status: 'Preparing', lastUpdated: Date.now() },
    });

    const savedOrder = await newOrder.save();

    // Update User's Order History
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.orderHistory = user.orderHistory || [];
    user.orderHistory.push(savedOrder._id);

    await user.save();

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
