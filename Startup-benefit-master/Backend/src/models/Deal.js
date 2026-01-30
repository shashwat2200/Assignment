const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  partnerName: {
    type: String
  },
  eligibilityText: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Deal = mongoose.model("Deal", dealSchema);

module.exports = Deal;
