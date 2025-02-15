import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import { useTheme } from "../../contexts/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

function Header() {
  const { isLoggedIn, user } = useAuth();
  const { loading } = useLoading();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  return (
    <header
      className={`py-4 px-6 flex justify-between items-center shadow-md transition-all ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center text-2xl font-bold">
        TourFolio
        <img
          src="/logo2.jpg"
          alt="TourFolio Logo"
          className="w-15 h-9 ml-2 object-cover rounded-xl"
        />
      </Link>

      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className={`transition ${
                isDark ? "hover:text-gray-400" : "hover:text-gray-600"
              }`}
            >
              Home
            </Link>
          </li>
          {["Tours", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                className={`transition ${
                  isDark ? "hover:text-gray-400" : "hover:text-gray-600"
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Section: Theme Toggle & User Info */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg cursor-pointer transition-all"
        >
          {isDark ? (
            <BsSun size={24} className="text-yellow-400" />
          ) : (
            <BsMoon size={24} className="text-gray-600" />
          )}
        </button>

        {/* User Authentication Section */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : isLoggedIn ? (
          <div
            className={`flex items-center space-x-4 p-2 rounded-lg shadow-md transition-all ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <img
              src={user?.photo || "/default.jpg"}
              alt={user?.name || "User"}
              className="w-10 h-10 rounded-full border border-gray-700 cursor-pointer"
              onClick={() => navigate("/me")}
            />
            <p className="text-lg font-semibold">
              Welcome,{" "}
              <span className="text-green-400">
                {user?.name || "Traveler"}!
              </span>
            </p>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className={`px-4 py-2 rounded-lg transition mr-3 ${
                isDark
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-4 py-2 rounded-lg transition ${
                isDark
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
