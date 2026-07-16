const Queue = require("../models/Queue");
const QueueEntry = require("../models/QueueEntry");

const joinQueueService = async (queueId, userId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Check if user is already in the queue
    const existingEntry = await QueueEntry.findOne({
        queue: queueId,
        user: userId,
        status: {
            $in: ["waiting", "serving"],
        },
    });

    if (existingEntry) {
        throw new Error("You are already in this queue");
    }

    // Find the last token issued
    const lastEntry = await QueueEntry.findOne({
        queue: queueId,
    }).sort({ tokenNumber: -1 });

    // Generate next token
    const nextToken = lastEntry ? lastEntry.tokenNumber + 1 : 1;

    // Create queue entry
    const queueEntry = await QueueEntry.create({
        queue: queueId,
        user: userId,
        tokenNumber: nextToken,
    });

    // Calculate position
    const position = await QueueEntry.countDocuments({
        queue: queueId,
        status: "waiting",
    });

    // Calculate estimated waiting time
    const estimatedWaitingTime =
        (position - 1) * queue.averageServiceTime;

    return {
        queueEntry,
        tokenNumber: nextToken,
        position,
        estimatedWaitingTime,
    };
};

module.exports = {
    joinQueueService,
};