const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  customization: { type: String, default: '' }, // Add customization field
  totalPrice: { type: Number, required: true },
  tracking: {
    status: { type: String, enum: ['Preparing', 'Ready', 'Delivered'], default: 'Delivered' },
    lastUpdated: { type: Date, default: Date.now },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
