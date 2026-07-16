const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    callNextStudent,
    completeStudent,
} = require("../controllers/adminQueueController");

// Call next student
router.post(
    "/queues/:queueId/call-next",
    protect,
    adminOnly,
    callNextStudent
);

// Complete current student
router.post(
    "/queues/:queueId/complete",
    protect,
    adminOnly,
    completeStudent
);

module.exports = router;