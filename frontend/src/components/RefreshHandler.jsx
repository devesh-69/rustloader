import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/", { replace: true });
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
};
