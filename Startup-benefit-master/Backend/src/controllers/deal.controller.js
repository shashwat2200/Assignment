const Deal = require("../models/Deal");

const getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find();
        return res.status(200).json(deals);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch deals" });
    }
};

const getDealById = async (req, res) => {
    try {
        const { id } = req.params;

        const deal = await Deal.findById(id);
        if (!deal) {
            return res.status(404).json({ message: "Deal not found" });
        }

        return res.status(200).json(deal);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch deal" });
    }
};

module.exports = {
    getAllDeals,
    getDealById
};
