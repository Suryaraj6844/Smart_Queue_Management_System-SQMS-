const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { joinQueue } = require("../controllers/queueEntryController");

router.post("/:queueId/join", protect, joinQueue);

module.exports = router;