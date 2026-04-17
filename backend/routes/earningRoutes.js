const express = require("express");
const router = express.Router();
const Earning = require("../models/Earning");

// add earning
router.post("/", async (req, res) => {
  try {
    const earning = new Earning(req.body);
    await earning.save();
    res.json(earning);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all earnings
router.get("/", async (req, res) => {
  try {
    const earnings = await Earning.find().populate("crane");
    res.json(earnings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;