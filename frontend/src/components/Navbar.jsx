import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-white">AI Notes</h1>
        <div className="space-x-4">
          <Link
            to="/"
            className={`text-white hover:text-gray-200 ${
              location.pathname === "/" && "underline"
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`text-white hover:text-gray-200 ${
              location.pathname === "/create" && "underline"
            }`}
          >
            Create Note
          </Link>
        </div>
      </div>
    </nav>
  );
}
