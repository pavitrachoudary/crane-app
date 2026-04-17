const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema({
  crane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crane"
  },
  date: {
    type: Date,
    default: Date.now
  },
  income: Number,
  expenses: Number,
  description: String
});

module.exports = mongoose.model("Earning", earningSchema);