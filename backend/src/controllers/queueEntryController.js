const { joinQueueService } = require("../services/queueEntryService");

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

module.exports = {
    joinQueue,
};