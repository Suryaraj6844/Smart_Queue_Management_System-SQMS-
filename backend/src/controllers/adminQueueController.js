const {
    callNextStudentService,
    completeStudentService,
} = require("../services/adminQueueService");

const callNextStudent = async (req, res) => {
    try {
        const { queueId } = req.params;

        const result = await callNextStudentService(queueId);

        return res.status(200).json({
            success: true,
            message: "Next student called successfully",
            ...result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const completeStudent = async (req, res) => {
    try {
        const { queueId } = req.params;

        const result = await completeStudentService(queueId);

        return res.status(200).json({
            success: true,
            message: "Student service completed successfully",
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
    callNextStudent,
    completeStudent,
};