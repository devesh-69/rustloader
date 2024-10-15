import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    window.lord?.init();
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const handleLoginRedirect = useCallback(
    (role) => {
      navigate(role === "owner" ? "/owners" : "/login");
      setShowDropdown(false);
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    console.log("Logout function called"); // Debug log
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("userDate");
    localStorage.removeItem("userLocation");
    navigate("/login");
  }, [navigate]);

  const handleListVehicle = useCallback(() => {
    console.log("handleListVehicle called"); // Debug log
    navigate("/dashboard");
    console.log("Navigation attempted"); // Debug log
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const navItems = ["Home", "Vehicles", "About", "Contact", "Checkout"];
  const mobileNavItems = [...navItems, "Owners"];

  return (
    <nav className="bg-gray-900 fixed w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-[5%] scale-90 lg:scale-100">
        <NavLink
          to="/"
          className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300"
        >
          <img
            src="/logo-color.png"
            alt="RustLoader"
            className="h-8 sm:h-10 rounded-sm"
          />
        </NavLink>

        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white focus:outline-none"
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

        <ul className="hidden lg:flex space-x-4 xl:space-x-8 justify-end items-center">
          {navItems.map((item) => (
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
          ))}
        </ul>

        <div className="hidden lg:flex items-center space-x-4 relative">
          <button
            className="bg-transparent border-2 border-yellow-300 text-yellow-300 hover:text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300 text-sm"
            onClick={handleListVehicle}
          >
            List Vehicle
          </button>

          <button
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center transition-transform duration-300 transform hover:scale-105"
          >
            <lord-icon
              src="https://cdn.lordicon.com/bgebyztw.json"
              trigger="hover"
              stroke="bold"
              state="hover-nodding"
              colors="primary:#1F2937,secondary:#1F2937"
              style={{ width: "24px", height: "24px" }}
            />
          </button>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
            >
              <ul className="py-1">
                <li className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-yellow-100 cursor-pointer">
                  <span
                    onClick={() => handleLoginRedirect("customer")}
                    className="flex-grow"
                  >
                    Customer Login
                  </span>
                  <span
                    onClick={handleLogout} // Make logout icon clickable
                    className="ml-2 cursor-pointer text-gray-800 hover:text-red-500"
                  >
                    <FaSignOutAlt />
                  </span>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-yellow-100 cursor-pointer">
                  <span onClick={() => handleLoginRedirect("owner")}>
                    Owner Login
                  </span>
                  {/* No logout icon for owner */}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showMobileMenu && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center py-8 lg:hidden">
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

          <button
            className="bg-transparent border-2 border-yellow-300 text-yellow-300 hover:text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300 mb-6"
            onClick={handleListVehicle}
          >
            List Vehicle
          </button>

          <ul className="flex flex-col space-y-6 text-white text-lg w-4/5">
            {mobileNavItems.map((item) => (
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
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
