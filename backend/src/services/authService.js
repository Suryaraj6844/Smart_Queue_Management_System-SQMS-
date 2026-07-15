const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUserService = async (userData) => {
    const { fullName, email, password } = userData;

    // Check required fields
    if (!fullName || !email || !password) {
        throw new Error("Please fill all fields");
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
    };
};

module.exports = {
    registerUserService,
};