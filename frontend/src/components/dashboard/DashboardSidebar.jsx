import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaUser,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Join Queue",
      icon: <FaClipboardList />,
      path: "/dashboard",
    },
    {
      name: "Queue History",
      icon: <FaHistory />,
      path: "/history",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen shadow-lg">
      {/* Logo */}
      <div className="text-center py-8 border-b border-slate-700">
        <h2 className="text-3xl font-bold text-blue-400">
          SQMS
        </h2>

        <p className="text-slate-400 text-sm mt-2">
          Smart Queue Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-4 transition ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <span className="text-lg">{item.icon}</span>

            <span className="font-medium">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default DashboardSidebar;