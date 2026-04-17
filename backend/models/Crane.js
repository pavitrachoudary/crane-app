const mongoose = require("mongoose");

const craneSchema = new mongoose.Schema({
  craneNumber: {
    type: String,
    required: true,
    unique: true
  },
  model: String,
  status: {
    type: String,
    default: "Active"
  },
  purchaseDate: Date
});

module.exports = mongoose.model("Crane", craneSchema);