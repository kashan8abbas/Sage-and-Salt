const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    contactNumber: { type: String, required: true },
    preferredAddress: { type: String, required: true },
    orderHistory: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    reservationHistory: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deliveryPreferences: {
        preferredAddress: { type: String, default: '' },
        contactNumber: { type: String, default: '' },
    }
});

module.exports = mongoose.model('User', userSchema);
