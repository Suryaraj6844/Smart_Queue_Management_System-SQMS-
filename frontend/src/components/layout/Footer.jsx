import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              SQMS
            </h2>

            <p className="mt-4">
              Smart Queue Management System helps users avoid
              long waiting lines through virtual queue booking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
              <li><a href="/register" className="hover:text-white">Register</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact
            </h3>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>support@sqms.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaGithub />
                <span>github.com/your-repo</span>
              </div>

              <div className="flex items-center gap-3">
                <FaLinkedin />
                <span>linkedin.com</span>
              </div>

            </div>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} Smart Queue Management System.
          All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;