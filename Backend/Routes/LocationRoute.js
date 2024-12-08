const express = require("express");
const router = express.Router();
const Location = require("../Models/Location"); // Assuming the Mongoose model exists

// GET: Fetch All Locations
router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err.message);
    res.status(500).json({ error: "Failed to fetch locations." });
  }
});

module.exports = router;
