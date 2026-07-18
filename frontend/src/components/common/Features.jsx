import { FaClock, FaBell, FaMobileAlt } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaClock className="text-5xl text-blue-600" />,
      title: "Save Time",
      description:
        "Avoid standing in long queues by joining virtual queues from anywhere.",
    },
    {
      icon: <FaBell className="text-5xl text-blue-600" />,
      title: "Instant Notifications",
      description:
        "Receive alerts when your turn is approaching so you arrive at the right time.",
    },
    {
      icon: <FaMobileAlt className="text-5xl text-blue-600" />,
      title: "Access Anywhere",
      description:
        "Book, monitor, and manage your queue using any device with internet access.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Why Choose SQMS?
        </h2>

        <p className="text-gray-600 text-center mb-14">
          Everything you need for a smarter queue experience.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;