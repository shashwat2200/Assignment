const Claim = require("../models/Claim");
const Deal = require("../models/Deal");
const User = require("../models/User");

const claimDeal = async (req, res) => {
    try {
        const userId = req.user.userId;
        const dealId = req.params.dealId;

        const deal = await Deal.findById(dealId);
        if (!deal) {
            return res.status(404).json({ message: "Deal not found" });
        }

        const user = await User.findById(userId);

        if (deal.isLocked && !user.isVerified) {
            return res.status(403).json({
                message: "You must be verified to claim this deal"
            });
        }

        const existingClaim = await Claim.findOne({ userId, dealId });
        if (existingClaim) {
            return res.status(400).json({
                message: "Deal already claimed"
            });
        }

        await Claim.create({
            userId,
            dealId,
            status: "pending"
        });

        return res.status(201).json({
            message: "Deal claimed successfully. Status: pending"
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to claim deal" });
    }
};

const getUserClaims = async (req, res) => {
    try {
        const userId = req.user.userId;

        const claims = await Claim.find({ userId })
            .populate("dealId");

        return res.status(200).json(claims);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch claims" });
    }
};

module.exports = {
    claimDeal,
    getUserClaims
};
