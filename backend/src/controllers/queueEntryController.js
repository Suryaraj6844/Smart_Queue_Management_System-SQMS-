const {
    joinQueueService,
    getQueueStatusService,
    leaveQueueService,
    getMyActiveQueuesService,
    getQueueHistoryService,
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

// Get Current Active Queue
// Get My Active Queues
const getMyActiveQueues = async (req, res) => {
    try {
        const queues = await getMyActiveQueuesService(req.user._id);

        return res.status(200).json({
            success: true,
            queues,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
// Get Queue History
const getQueueHistory = async (req, res) => {
    try {
        const history = await getQueueHistoryService(req.user._id);

        return res.status(200).json({
            success: true,
            history,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    joinQueue,
    getQueueStatus,
    getMyActiveQueues,
    leaveQueue,
    getQueueHistory,
};