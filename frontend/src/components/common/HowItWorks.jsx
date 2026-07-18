import {
  FaUserPlus,
  FaTicketAlt,
  FaChartLine,
  FaBell,
  FaCheckCircle,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Register",
      desc: "Create your account in seconds.",
    },
    {
      icon: <FaTicketAlt />,
      title: "Book Queue",
      desc: "Choose a service and get your token.",
    },
    {
      icon: <FaChartLine />,
      title: "Track Status",
      desc: "Watch your queue position live.",
    },
    {
      icon: <FaBell />,
      title: "Get Notification",
      desc: "Receive alerts when your turn is near.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Visit",
      desc: "Arrive only when needed.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <p className="text-center text-gray-600 mt-3 mb-14">
          Using SQMS is simple and takes only a few steps.
        </p>

        <div className="grid md:grid-cols-5 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl mx-auto">
                {step.icon}
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;