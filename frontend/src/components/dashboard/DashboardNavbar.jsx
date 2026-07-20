import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DashboardNavbar() {
  const navigate = useNavigate();
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRoleLabel = user?.role === "student" ? "User" : user?.role;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      {/* Left */}
      <h1 className="text-2xl font-bold text-blue-600">
        SQMS Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative">
          <FaBell className="text-2xl text-gray-600 hover:text-blue-600 transition" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition"
          >
            <FaUserCircle className="text-4xl text-blue-600" />

            <div>
              <p className="font-semibold text-gray-800">
                {user ? user.fullName : "Loading..."}
              </p>

              <p className="text-sm text-gray-500">
                {userRoleLabel || ""}
              </p>
            </div>
          </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
}

export default DashboardNavbar;
