import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import { useTheme } from "../../contexts/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const { isLoggedIn, user } = useAuth();
  const { loading } = useLoading();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Tours", "About", "Contact"];

  const linkClass = `transition ${
    isDark ? "hover:text-gray-400" : "hover:text-gray-600"
  }`;

  return (
    <header
      className={`py-4 px-4 sm:px-6 shadow-md transition-all sticky top-0 z-50 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center text-xl sm:text-2xl font-bold">
            TourFolio
            <img
              src="/logo2.jpg"
              alt="TourFolio Logo"
              className="w-12 h-8 sm:w-15 sm:h-9 ml-2 object-cover rounded-xl"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg cursor-pointer transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <BsSun size={22} className="text-yellow-400" />
              ) : (
                <BsMoon size={22} className="text-gray-600" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        <div
          className={`${
            menuOpen ? "max-h-[500px] mt-3" : "max-h-0 md:max-h-[500px]"
          } overflow-hidden transition-all duration-300 md:mt-3`}
        >
          <div className="md:flex md:items-center md:justify-between md:gap-4">
            <nav>
              <ul className="flex flex-col md:flex-row gap-4 md:gap-6 pb-3 md:pb-0">
                <li>
                  <Link
                    to="/"
                    className={linkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className={linkClass}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {loading ? (
              <p className="text-gray-400 pb-3 md:pb-0">Loading...</p>
            ) : isLoggedIn ? (
              <div
                className={`flex items-center gap-3 p-2 rounded-lg shadow-md transition-all max-w-full ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={user?.photo || "/default.jpg"}
                  alt={user?.name || "User"}
                  className="w-10 h-10 rounded-full border border-gray-700 cursor-pointer shrink-0"
                  onClick={() => {
                    navigate("/me");
                    setMenuOpen(false);
                  }}
                />
                <p className="text-sm sm:text-base font-semibold truncate">
                  Welcome,{" "}
                  <span className="text-green-400">
                    {user?.name || "Traveler"}!
                  </span>
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 pb-3 md:pb-0">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition ${
                    isDark
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
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
        </div>
      </div>
    </header>
  );
}

export default Header;
