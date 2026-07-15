const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createQueue,
    getAllQueues,
} = require("../controllers/queueController");

// Protected Route
router.post("/", protect, createQueue);


router.get("/", protect, getAllQueues);

module.exports = router;