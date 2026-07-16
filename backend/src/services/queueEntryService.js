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

const getQueueStatusService = async (queueId, userId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Find user's queue entry
    const queueEntry = await QueueEntry.findOne({
        queue: queueId,
        user: userId,
    }).sort({ joinedAt: -1 });

if (!queueEntry) {
    throw new Error("You have never joined this queue.");
}

// If service is completed
if (queueEntry.status === "completed") {
    return {
        queueName: queue.queueName,
        tokenNumber: queueEntry.tokenNumber,
        status: "completed",
        message: "Your service has been completed.",
    };
}

    // If queue was cancelled
    if (queueEntry.status === "cancelled") {
        return {
            queueName: queue.queueName,
            tokenNumber: queueEntry.tokenNumber,
            status: "cancelled",
            message: "You have left the queue.",
        };
    }

    // Calculate people ahead
    const peopleAhead = await QueueEntry.countDocuments({
        queue: queueId,
        status: "waiting",
        tokenNumber: {
            $lt: queueEntry.tokenNumber,
        },
    });

    // Calculate current position
    const position = peopleAhead + 1;

    // Calculate waiting time
    const estimatedWaitingTime =
        peopleAhead * queue.averageServiceTime;

    return {
        queueName: queue.queueName,
        tokenNumber: queueEntry.tokenNumber,
        status: queueEntry.status,
        position,
        peopleAhead,
        estimatedWaitingTime,
        currentToken: queue.currentToken,
    };
};

const leaveQueueService = async (queueId, userId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Find active queue entry
    const queueEntry = await QueueEntry.findOne({
        queue: queueId,
        user: userId,
        status: {
            $in: ["waiting", "serving"],
        },
    });

    if (!queueEntry) {
        throw new Error("You are not in an active queue.");
    }

    // Prevent leaving while being served
    if (queueEntry.status === "serving") {
        throw new Error(
            "You cannot leave the queue while being served."
        );
    }

    // Cancel queue entry
    queueEntry.status = "cancelled";
    queueEntry.cancelledAt = new Date();

    await queueEntry.save();

    return {
        tokenNumber: queueEntry.tokenNumber,
        status: queueEntry.status,
        message: "You have successfully left the queue.",
    };
};

module.exports = {
    joinQueueService,
    getQueueStatusService,
    leaveQueueService,
};