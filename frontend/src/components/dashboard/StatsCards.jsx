import {
  FaUsers,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";

function StatsCards({ activeQueues }) {
  const stats = [
    {
      title: "Active Queues",
      value: activeQueues,
      icon: (
        <FaUsers className="text-3xl text-blue-600" />
      ),
    },
    {
      title: "Completed",
      value: 0,
      icon: (
        <FaCheckCircle className="text-3xl text-green-600" />
      ),
    },
    {
      title: "Total Visits",
      value: 0,
      icon: (
        <FaClipboardList className="text-3xl text-purple-600" />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {item.value}
            </h2>
          </div>

          {item.icon}
        </div>
      ))}
    </div>
  );
}

export default StatsCards;