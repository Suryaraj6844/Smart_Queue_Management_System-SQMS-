import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUserAlt,
  FaEye,
  FaEyeSlash,
  FaClipboardCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authService";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Please enter your full name";
    }

    if (formData.fullName.trim().length < 2) {
      return "Full name must be at least 2 characters";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      return "Please enter a valid email address";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-4">
            <FaClipboardCheck size={28} />
          </div>

          <h1 className="text-4xl font-bold text-blue-600">SQMS</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Welcome! Create your account and join the queue faster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="fullName" className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
              <FaUserAlt className="text-gray-400" />
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 outline-none bg-transparent"
                autoComplete="name"
                aria-label="Full Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
              <FaEnvelope className="text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 outline-none bg-transparent"
                autoComplete="email"
                aria-label="Email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
              <FaLock className="text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 outline-none bg-transparent"
                autoComplete="new-password"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-500 hover:text-blue-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
              <FaLock className="text-gray-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-3 outline-none bg-transparent"
                autoComplete="new-password"
                aria-label="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-gray-500 hover:text-blue-600 transition"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;