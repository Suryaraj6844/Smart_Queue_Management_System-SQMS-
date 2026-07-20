import {
  FaBuilding,
  FaTicketAlt,
  FaUsers,
  FaWalking,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { leaveQueue } from "../../services/queueService";

function MyActiveQueues({
  activeQueues,
  loading,
  refreshQueues,
}) {
  const handleLeaveQueue = async (queueId) => {
    try {
      const response = await leaveQueue(queueId);

      toast.success(response.message);

      await refreshQueues();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to leave queue."
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">
          My Active Queues
        </h2>

        <div className="flex justify-center items-center h-48">
          <p className="text-lg text-gray-500">
            Loading queues...
          </p>
        </div>
      </div>
    );
  }

  if (activeQueues.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">
          My Active Queues
        </h2>

        <div className="flex flex-col items-center justify-center h-56">
          <FaBuilding
            className="text-gray-300 mb-4"
            size={60}
          />

          <h3 className="text-2xl font-semibold text-gray-700">
            No Active Queues
          </h3>

          <p className="text-gray-500 mt-2">
            Join a queue to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-3xl font-bold mb-8">
        My Active Queues
      </h2>

      <div className="space-y-6">
        {activeQueues.map((queue) => (
          <div
            key={queue.queueId}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <FaBuilding
                  className="text-blue-600"
                  size={24}
                />

                <h3 className="text-2xl font-bold text-blue-600">
                  {queue.queueName}
                </h3>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  queue.status === "waiting"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {queue.status === "waiting"
                  ? "Waiting"
                  : "Serving"}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaTicketAlt />
                  <span className="text-sm">
                    Token
                  </span>
                </div>

                <p className="text-3xl font-bold mt-2">
                  #{queue.tokenNumber}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-600">
                  <FaUsers />
                  <span className="text-sm">
                    Position
                  </span>
                </div>

                <p className="text-3xl font-bold mt-2">
                  {queue.position}
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-orange-600">
                  <FaWalking />
                  <span className="text-sm">
                    Ahead
                  </span>
                </div>

                <p className="text-3xl font-bold mt-2">
                  {queue.peopleAhead}
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-600">
                  <FaClock />
                  <span className="text-sm">
                    ETA
                  </span>
                </div>

                <p className="text-3xl font-bold mt-2">
                  {queue.estimatedWaitingTime}m
                </p>
              </div>
            </div>

            {/* Now Serving */}
            <div className="mt-6 bg-gray-100 rounded-xl p-4 flex justify-between items-center">
              <span className="font-medium text-gray-700">
                Now Serving
              </span>

              <span className="text-2xl font-bold text-blue-600">
                #{queue.currentToken}
              </span>
            </div>

            {/* Button */}
            <button
              onClick={() =>
                handleLeaveQueue(queue.queueId)
              }
              className="mt-6 w-full border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
            >
              <FaSignOutAlt />
              Leave Queue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyActiveQueues;