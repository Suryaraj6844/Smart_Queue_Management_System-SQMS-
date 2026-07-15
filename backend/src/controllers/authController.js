const { registerUserService } = require("../services/authService");

const registerUser = async (req, res) => {
    try {
        const user = await registerUserService(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        const statusCode =
            error.message === "Email already registered" ? 409 : 400;

        return res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    registerUser,
};