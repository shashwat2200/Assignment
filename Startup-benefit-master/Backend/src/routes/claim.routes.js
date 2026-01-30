const express = require("express");
// const authMiddleware = require("../middleware/auth.middleware");
const authMiddleware = require("../middleware/auth.middleware.js");
const { claimDeal, getUserClaims } = require("../controllers/claim.controller");

const router = express.Router();

router.post("/:dealId", authMiddleware, claimDeal);
router.get("/my", authMiddleware, getUserClaims);

module.exports = router;




