const express = require('express');
const Reservation = require('../Models/Reservation');
const User = require('../Models/User');
const authMiddleware = require('../Middlewares/AuthMiddleware');

const router = express.Router();

// Create a reservation
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const {name, email, phone, date, time, partySize, message } = req.body; // Capture the input from the form
        const userId = req.user.id; // Get the logged-in user's ID from the middleware

        // Create a new reservation
        const newReservation = new Reservation({
            userId,
            name,
            email,
            phone,
            date,
            time,
            partySize,
            message,
            status: 'Pending',
        });

        // Save the reservation to the database
        const savedReservation = await newReservation.save();

        // Update the user's reservation history
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.reservationHistory.push(savedReservation._id);
        await user.save();

        res.status(201).json({
            message: 'Reservation created successfully',
            reservation: savedReservation,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
});



// Get all reservations for the logged-in user
router.get('/my-reservations', authMiddleware, async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.user.id });
        res.status(200).json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
});

// Cancel a reservation
router.patch("/cancel/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = await Reservation.findByIdAndUpdate(
        id,
        { status: "Cancelled" },
        { new: true }
      );
  
      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
  
      res.status(200).json({ message: "Reservation canceled successfully", reservation });
    } catch (err) {
      console.error("Error canceling reservation:", err);
      res.status(500).json({ error: "Failed to cancel reservation" });
    }
  });

module.exports = router;
