import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle("dark", savedDarkMode);
  }, []);

  const handleLogout = () => {
    // Clear local storage and redirect to the login page
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("users");
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("sortKey");
    localStorage.removeItem("sortDirection");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-50 dark:bg-gray-900 p-4 sticky top-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Link
              to="/"
              className="text-gray-800 font-bold text-xl dark:text-gray-200 hover:underline"
            >
              Profile
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-800 font-bold text-xl dark:text-gray-200 hover:underline"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="h-10 w-10 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="fill-violet-700 block dark:hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <svg
                className="fill-yellow-500 hidden dark:block"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="text-red-600 dark:text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </>
  );
};

export default NavBar;
