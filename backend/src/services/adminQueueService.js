const Queue = require("../models/Queue");
const QueueEntry = require("../models/QueueEntry");

const callNextStudentService = async (queueId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Find the first waiting student
    const nextStudent = await QueueEntry.findOne({
        queue: queueId,
        status: "waiting",
    })
        .sort({ tokenNumber: 1 })
        .populate("user", "fullName email");

    if (!nextStudent) {
        throw new Error("No students waiting in queue");
    }

    // Update status
    nextStudent.status = "serving";
    nextStudent.servedAt = new Date();

    await nextStudent.save();

    // Update queue
    queue.currentToken = nextStudent.tokenNumber;
    await queue.save();

    return {
        currentToken: queue.currentToken,
        student: nextStudent,
    };
};
const completeStudentService = async (queueId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Find student currently being served
    const currentStudent = await QueueEntry.findOne({
        queue: queueId,
        status: "serving",
    }).populate("user", "fullName email");

    if (!currentStudent) {
        throw new Error("No student is currently being served");
    }

    // Mark service as completed
    currentStudent.status = "completed";

    await currentStudent.save();

    return {
        completedStudent: currentStudent,
    };
};

const getDashboardStatsService = async () => {
    const totalQueues = await Queue.countDocuments();

    const activeQueues = await Queue.countDocuments({
        status: "open",
    });

    const waitingStudents = await QueueEntry.countDocuments({
        status: "waiting",
    });

    const servingStudents = await QueueEntry.countDocuments({
        status: "serving",
    });

    const completedStudents = await QueueEntry.countDocuments({
        status: "completed",
    });

    const cancelledStudents = await QueueEntry.countDocuments({
        status: "cancelled",
    });

    return {
        totalQueues,
        activeQueues,
        waitingStudents,
        servingStudents,
        completedStudents,
        cancelledStudents,
    };
};
 
// Pause Queue
const pauseQueueService = async (queueId) => {
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    if (queue.status === "paused") {
        throw new Error("Queue is already paused");
    }

    if (queue.status === "closed") {
        throw new Error("Closed queue cannot be paused");
    }

    queue.status = "paused";
    await queue.save();

    return queue;
};

// Resume Queue
const resumeQueueService = async (queueId) => {
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    if (queue.status === "open") {
        throw new Error("Queue is already open");
    }

    if (queue.status === "closed") {
        throw new Error("Closed queue cannot be resumed");
    }

    queue.status = "open";
    await queue.save();

    return queue;
};

// Close Queue
const closeQueueService = async (queueId) => {
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    if (queue.status === "closed") {
        throw new Error("Queue is already closed");
    }

    queue.status = "closed";
    await queue.save();

    return queue;
};

module.exports = {
    callNextStudentService,
    completeStudentService,
    getDashboardStatsService,
    pauseQueueService,
    resumeQueueService,
    closeQueueService,
};