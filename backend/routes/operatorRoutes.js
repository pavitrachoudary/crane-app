const express = require("express");
const router = express.Router();
const Operator = require("../models/Operator");

// CREATE operator
router.post("/", async (req, res) => {
  try {
    const operator = new Operator(req.body);
    await operator.save();
    res.json(operator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all operators
router.get("/", async (req, res) => {
  try {
    const operators = await Operator.find().populate("assignedCrane");
    res.json(operators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;