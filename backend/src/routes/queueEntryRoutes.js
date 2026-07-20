const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    joinQueue,
    getQueueStatus,
    leaveQueue,
    getMyActiveQueues,
    getQueueHistory,
} = require("../controllers/queueEntryController");
// Join Queue
router.post("/:queueId/join", protect, joinQueue);

// Get My Active Queues
router.get("/my-active", protect, getMyActiveQueues);
// Get Queue History
router.get("/history", protect, getQueueHistory);

// Get My Queue Status
router.get("/:queueId/status", protect, getQueueStatus);

// Leave Queue
router.post("/:queueId/leave", protect, leaveQueue);

module.exports = router;