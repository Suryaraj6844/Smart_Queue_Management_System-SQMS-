import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.svg";

function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Skip the Queue,
            <span className="text-blue-600"> Save Your Time</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Smart Queue Management System helps users book queue tokens
            online, monitor live queue status, receive estimated waiting
            times, and get notified when their turn is near.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Smart Queue"
            className="w-full max-w-lg mx-auto"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;