import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...LoginInfo, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (LoginInfo.email && LoginInfo.password) {
      if (LoginInfo.password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }

      try {
        const url = "http://localhost:8080/auth/login";
        // const url = "https://rustloader-back.vercel.app/login";

        // Prepare the payload
        const payload = {
          email: LoginInfo.email,
          password: LoginInfo.password,
        };

        // Log payload to ensure correctness
        console.log("Sending payload:", payload);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log("Server response:", result); // Log server response for debugging

        const { success, message, jwtToken, name } = result;

        if (success) {
          // Store token and navigate
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("LoggedInUser", name);
          navigate("/dashboard");
        } else {
          toast.error(message || "Login failed");
        }
      } catch (error) {
        console.error("Error during Login:", error);
        toast.error("An error occurred during Login.");
      }
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleLoginSubmit}
        className="max-w-lg mx-auto p-8 shadow-lg rounded-lg bg-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={LoginInfo.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={LoginInfo.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <span>
          {" Don't Have a Account yet? "}
          <Link to="/signup" className="text-blue-600 underline">
            Register here
          </Link>
        </span>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Login
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
