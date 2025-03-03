const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  item_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage']
  },
  availability: {
    type: Boolean,
    default: true
  },
  image: {
    // Store image as a base64 string or file path
    data: String,
    contentType: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Pre-save hook to update timestamps
menuItemSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('MenuItem', menuItemSchema);