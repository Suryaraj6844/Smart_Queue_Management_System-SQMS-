import { useEffect, useState } from "react";

import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import StatsCards from "../../components/dashboard/StatsCards";
import JoinQueue from "../../components/dashboard/JoinQueue";
import MyActiveQueues from "../../components/dashboard/MyActiveQueues";

import { getMyActiveQueues, getUserQueueStats } from "../../services/queueService";

function UserDashboard() {
  const [activeQueues, setActiveQueues] = useState([]);
  const [stats, setStats] = useState({ completedVisits: 0, totalVisits: 0 });
  const [loading, setLoading] = useState(true);

  const fetchActiveQueues = async () => {
    try {
      const data = await getMyActiveQueues();

      setActiveQueues(data.queues || []);
    } catch (error) {
      console.error(error);

      setActiveQueues([]);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getUserQueueStats();
      setStats(data.stats || { completedVisits: 0, totalVisits: 0 });
    } catch (error) {
      console.error(error);
      setStats({ completedVisits: 0, totalVisits: 0 });
    } finally {
      setLoading(false);
    }
  };

  const refreshDashboard = async () => {
    await Promise.all([fetchActiveQueues(), fetchStats()]);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshDashboard();
    }, 0);

    const handleQueueRefresh = () => {
      void refreshDashboard();
    };

    window.addEventListener("queue-state-refresh", handleQueueRefresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("queue-state-refresh", handleQueueRefresh);
    };
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

          <StatsCards
            activeQueues={activeQueues.length}
            completedVisits={stats.completedVisits}
            totalVisits={stats.totalVisits}
          />
          <div className="mt-8">
            <JoinQueue onQueueJoined={refreshDashboard} />
          </div>

          <div className="mt-8">
            <MyActiveQueues
              activeQueues={activeQueues}
              loading={loading}
              refreshQueues={refreshDashboard}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;