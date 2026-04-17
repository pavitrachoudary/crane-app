const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  salary: Number,
  assignedCrane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crane"
  }
});

module.exports = mongoose.model("Operator", operatorSchema);