const express = require("express");
const {
  getAllDeals,
  getDealById
} = require("../controllers/deal.controller");

const router = express.Router();

router.get("/", getAllDeals);
router.get("/:id", getDealById);

module.exports = router;
