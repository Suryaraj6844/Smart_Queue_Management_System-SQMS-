import { useEffect, useState } from "react";
import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getNotifications, markNotificationsAsRead } from "../../services/queueService";

function DashboardNavbar() {
  const navigate = useNavigate();
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRoleLabel = user?.role === "student" ? "User" : user?.role;
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  const handleBellClick = async () => {
    const nextState = !showNotifications;
    setShowNotifications(nextState);

    if (nextState) {
      await markNotificationsAsRead();
      await loadNotifications();
    }
  };

  return (
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      {/* Left */}
      <h1 className="text-2xl font-bold text-blue-600">
        SQMS Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-6 relative">
        {/* Notification */}
        <div className="relative">
          <button className="relative" onClick={handleBellClick}>
            <FaBell className="text-2xl text-gray-600 hover:text-blue-600 transition" />

            {notifications.some((item) => !item.isRead) && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications.filter((item) => !item.isRead).length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
              <div className="p-3 border-b border-gray-100 font-semibold text-gray-700">
                Notifications
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500">No notifications yet.</p>
                ) : (
                  notifications.map((item) => (
                    <div key={item._id} className={`p-3 border-b border-gray-100 ${item.isRead ? "bg-white" : "bg-blue-50"}`}>
                      <p className="text-sm text-gray-700">{item.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

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
