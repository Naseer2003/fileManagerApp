import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <nav className="bg-[#2b2b2b] dark:bg-gray-900 w-full flex items-center justify-between px-6 py-2 shadow-md transition-colors duration-300">
      {/* Logo & Tagline */}
      <div className="flex flex-col leading-tight">
        <span className="text-white font-bold text-lg tracking-wide">
          DEZIGN <span className="text-red-500">SHARK</span>
          <sup className="text-xs">®</sup>
        </span>
        <span className="text-xs text-gray-400">ALL ABOUT DESIGN</span>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white transition"
      >
        {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
      </button>
    </nav>
  );
};

export default Navbar;
