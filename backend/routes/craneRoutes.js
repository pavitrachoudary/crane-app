const express = require("express");
const router = express.Router();
const Crane = require("../models/Crane");

// CREATE
router.post("/", async (req, res) => {
  try {
    const crane = new Crane(req.body);
    await crane.save();
    res.json(crane);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const cranes = await Crane.find();
    res.json(cranes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Crane.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;