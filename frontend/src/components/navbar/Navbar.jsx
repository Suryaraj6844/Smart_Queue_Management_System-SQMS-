import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link 
          to="/"
          className="text-2xl font-bold"
        >
          SQMS
        </Link>


        <ul className="flex gap-6">

          <li>
            <Link to="/">
              Home
            </Link>
          </li>


          <li>
            <Link to="/queue/1">
              Queues
            </Link>
          </li>


          <li>
            <Link to="/login">
              Login
            </Link>
          </li>

        </ul>

      </div>

    </nav>
  );
}

export default Navbar;