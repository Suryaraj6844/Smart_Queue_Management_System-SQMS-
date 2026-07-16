const {
    joinQueueService,
    getQueueStatusService,
    leaveQueueService,
} = require("../services/queueEntryService");

// Join Queue
const joinQueue = async (req, res) => {
    try {
        const { queueId } = req.params;

        const result = await joinQueueService(queueId, req.user._id);

        return res.status(201).json({
            success: true,
            message: "Joined queue successfully",
            ...result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Queue Status
const getQueueStatus = async (req, res) => {
    try {
        const { queueId } = req.params;

        const result = await getQueueStatusService(
            queueId,
            req.user._id
        );

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Leave Queue
const leaveQueue = async (req, res) => {
    try {
        const { queueId } = req.params;

        const result = await leaveQueueService(
            queueId,
            req.user._id
        );

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    joinQueue,
    getQueueStatus,
    leaveQueue,
};