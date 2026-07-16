const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    joinQueue,
    getQueueStatus,
    leaveQueue,
} = require("../controllers/queueEntryController");

// Join Queue
router.post("/:queueId/join", protect, joinQueue);

// Get My Queue Status
router.get("/:queueId/status", protect, getQueueStatus);

// Leave Queue
router.post("/:queueId/leave", protect, leaveQueue);

module.exports = router;