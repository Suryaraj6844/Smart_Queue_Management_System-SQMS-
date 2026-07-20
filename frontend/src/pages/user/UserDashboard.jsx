import { useEffect, useState } from "react";

import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import StatsCards from "../../components/dashboard/StatsCards";
import JoinQueue from "../../components/dashboard/JoinQueue";
import MyActiveQueues from "../../components/dashboard/MyActiveQueues";

import { getMyActiveQueues } from "../../services/queueService";

function UserDashboard() {
  const [activeQueues, setActiveQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveQueues = async () => {
    try {
      const data = await getMyActiveQueues();

      setActiveQueues(data.queues || []);
    } catch (error) {
      console.error(error);

      setActiveQueues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchActiveQueues();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <DashboardNavbar />

        {/* Main Content */}
        <main className="p-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-600 mt-2">
            Manage your queues from here.
          </p>

          <StatsCards activeQueues={activeQueues.length} />
          <div className="mt-8">
            <JoinQueue onQueueJoined={fetchActiveQueues} />
          </div>

          <div className="mt-8">
            <MyActiveQueues
              activeQueues={activeQueues}
              loading={loading}
              refreshQueues={fetchActiveQueues}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;