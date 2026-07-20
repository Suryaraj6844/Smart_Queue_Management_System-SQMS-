import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userRoleLabel = user?.role === "student" ? "User" : user?.role;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64">
        {/* Reuse existing sidebar */}
          <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <DashboardNavbar />

        <main className="p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">

            <div className="flex flex-col items-center">

              <FaUserCircle
                className="text-blue-600"
                size={120}
              />

              <h2 className="text-4xl font-bold mt-4">
                {user?.fullName}
              </h2>

              <span className="mt-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
                {userRoleLabel}
              </span>
            </div>

            <div className="mt-10 space-y-6">

              <div className="bg-gray-50 rounded-xl p-5 flex items-center gap-4">
                <FaEnvelope className="text-blue-600 text-xl" />

                <div>
                  <p className="text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 flex items-center gap-4">
                <FaUserTag className="text-blue-600 text-xl" />

                <div>
                  <p className="text-gray-500">
                    Role
                  </p>

                  <p className="font-semibold capitalize">
                    {userRoleLabel}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-10 flex justify-between">

              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-lg"
              >
                <FaArrowLeft />
                Dashboard
              </button>

              <button
                disabled
                className="bg-blue-600 text-white px-6 py-3 rounded-lg opacity-60 cursor-not-allowed"
              >
                Edit Profile (Coming Soon)
              </button>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
