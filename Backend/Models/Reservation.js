const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Use string for consistency with input, or Date if you handle conversions
    required: true,
  },
  time: {
    type: String, // Use string to match form input
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Cancelled', 'Confirmed'],
    default: 'Confirmed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
