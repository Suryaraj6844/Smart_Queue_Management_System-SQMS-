import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllQueues,
  joinQueue,
} from "../../services/queueService";

function JoinQueue({ onQueueJoined }) {
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [joining, setJoining] = useState(false);

  const fetchQueues = async () => {
    try {
      const data = await getAllQueues();
      setQueues((data.queues || []).filter((queue) => queue.status === "open"));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load queues.");
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchQueues();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleJoinQueue = async () => {
    if (!selectedQueue) {
      toast.warning("Please select a queue.");
      return;
    }

    try {
      setJoining(true);

      const response = await joinQueue(selectedQueue);

      console.log("Join Response:", response);

      toast.success("Successfully joined the queue!");

      setSelectedQueue("");

      if (onQueueJoined) {
        await onQueueJoined();
      }

      window.dispatchEvent(new Event("queue-state-refresh"));
      window.dispatchEvent(new Event("queue-history-refresh"));
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to join queue."
      );
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        Join New Queue
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">
            Select Queue
          </label>

          <select
            value={selectedQueue}
            onChange={(e) =>
              setSelectedQueue(e.target.value)
            }
            disabled={joining}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Queue</option>

            {queues.map((queue) => (
              <option
                key={queue._id}
                value={queue._id}
              >
                {queue.queueName}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleJoinQueue}
          disabled={joining}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
        >
          {joining ? "Joining..." : "Join Queue"}
        </button>
      </div>
    </div>
  );
}

export default JoinQueue;