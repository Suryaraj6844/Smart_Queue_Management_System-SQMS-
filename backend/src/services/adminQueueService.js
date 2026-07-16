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

module.exports = {
    callNextStudentService,
    completeStudentService,
};