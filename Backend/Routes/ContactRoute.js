const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact'); // Assuming you have a Mongoose model

// POST Route: Handle Contact Form Submission
router.post('/contact', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Basic Validation
    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save Contact Info to Database
    const contact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    await contact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error sending message:", err.message);
    res.status(500).json({ error: "Failed to send your message." });
  }
});

module.exports = router;
