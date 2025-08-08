import React from "react";
import Navbar from "../components/Navbar"; // adjust path as needed

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Your existing content */}
      <main className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to DEZIGN SHARK
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Your design content here...
        </p>
        
        {/* Test dark mode with more elements */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dark Mode Test
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            This section should change colors when you toggle theme
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;