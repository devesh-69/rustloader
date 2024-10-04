import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RefreshHandler = ({ setIsAuthenticated }) => {
  // Destructure props
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
};
