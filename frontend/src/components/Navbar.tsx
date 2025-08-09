import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { Link ,useNavigate} from "react-router-dom"

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call backend logout if needed
    fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
    <div className="flex">
    <nav className="bg-[#2b2b2b] dark:bg-gray-900 text-white dark:text-gray-100 w-full flex items-center  px-6 py-2 shadow-md transition-colors duration-300">
      {/* Logo */}
      <div className="flex flex-col leading-tight cursor-pointer" onClick={() => navigate("/home")}>
        <span className="font-bold text-lg tracking-wide">
          DEZIGN <span className="text-red-500">SHARK</span>
          <sup className="text-xs">®</sup>
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-300">ALL ABOUT DESIGN</span>
      </div>

      {/* Toggle */}
      <button
        onClick={toggleTheme}
        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white transition-all duration-300 hover:scale-110 ml-auto"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <FaMoon size={16} /> : <FaSun size={16} />}
      </button>
      {/* Login / Logout button */}
      {token ? (
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-white"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="ml-4 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-white"
        >
          Login
        </Link>
      )}
    </nav>
    </div>
  )
;
};

export default Navbar;