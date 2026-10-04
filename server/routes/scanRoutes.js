const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createScan,
  getScanHistory,
} = require("../controllers/scanController");

router.post("/", protect, createScan);

router.get("/history", protect, getScanHistory);

module.exports = router;