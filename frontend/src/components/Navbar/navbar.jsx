import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Popup component for Login/Signup with animation
function Popup({ show, onClose }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-transform duration-300 ${
          show ? "scale-100" : "scale-90"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Login or Signup
        </h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold px-4 py-3 rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full text-gray-600 hover:text-gray-800 transition duration-300"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (window.lord) {
      window.lord.init();
    }
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      console.log(`Searching for: ${searchInput}`);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 scale-90 ">
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/logo-color.png"
              alt="RustLoader"
              className="h-10 rounded-sm"
            />
          </NavLink>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <ul className="hidden md:flex space-x-8 justify-end items-center">
          {["Home", "Vehicles", "Owners", "About", "Contact", "Checkout"].map(
            (item) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-white font-medium text-sm uppercase tracking-wide ${
                      isActive ? "text-yellow-400" : "hover:text-yellow-400"
                    } transition duration-300`
                  }
                >
                  {item}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white w-64"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setShowPopup(true)}
            className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center transition-transform duration-300 transform hover:scale-105"
          >
            <lord-icon
              src="https://cdn.lordicon.com/bgebyztw.json"
              trigger="hover"
              stroke="bold"
              state="hover-nodding"
              colors="primary:#1F2937,secondary:#1F2937"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center py-8">
          <button
            onClick={toggleMobileMenu}
            className="self-end px-6 py-2 text-white mb-6"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="relative mb-6 w-4/5">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <button
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300 mb-6"
            onClick={() => setShowPopup(true)}
          >
            List Vehicle
          </button>

          <ul className="flex flex-col space-y-6 text-white text-lg w-4/5">
            {["Home", "Vehicles", "Owners", "About", "Contact", "Checkout"].map(
              (item) => (
                <li key={item}>
                  <NavLink
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `font-medium text-center block w-full py-2 ${
                        isActive
                          ? "text-yellow-400 border-b-2 border-yellow-400"
                          : "hover:text-yellow-400"
                      } transition duration-300`
                    }
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
    </nav>
  );
};

export default NavBar;
