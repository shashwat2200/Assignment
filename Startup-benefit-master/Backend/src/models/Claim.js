const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deal",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  },
  claimedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent same user from claiming same deal twice
claimSchema.index({ userId: 1, dealId: 1 }, { unique: true });

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
