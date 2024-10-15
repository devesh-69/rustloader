import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [signUpInfo, setsignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    profilePic: null,
    aadhaarNumber: "",
    aadhaarPhoto: null,
    panCardNumber: "",
    panCardPhoto: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mobileNumber") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Filter out non-numeric characters
      setsignUpInfo({ ...signUpInfo, [name]: numericValue });
    } else if (files) {
      setsignUpInfo({ ...signUpInfo, [name]: files[0] });
    } else {
      setsignUpInfo({ ...signUpInfo, [name]: value });
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      signUpInfo.name &&
      signUpInfo.email &&
      signUpInfo.password &&
      signUpInfo.mobileNumber &&
      signUpInfo.address &&
      signUpInfo.aadhaarNumber &&
      signUpInfo.panCardNumber
    ) {
      // Custom validation for password length
      if (signUpInfo.password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return; // Exit early if validation fails
      }

      try {
        const url = "http://localhost:8080/auth/signup";

        // Create a FormData object
        const formData = new FormData();
        for (const key in signUpInfo) {
          formData.append(key, signUpInfo[key]);
        }

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        const { success, message, error } = result;

        if (success) {
          // Navigate directly to login on success
          navigate("/login");
        } else if (error) {
          const details = error?.details[0].message;
          toast.error(details); // Show specific validation error from server
        } else {
          // Show the error message from the server
          toast.error(message); // Show the error message if the user already exists
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("An error occurred during signup.");
      }
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  // Password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSignUpSubmit}
        className="max-w-lg mx-auto p-8 shadow-lg rounded-lg bg-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={signUpInfo.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

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
            value={signUpInfo.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            minLength={8}
            maxLength={16}
            value={signUpInfo.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label
            htmlFor="mobileNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={signUpInfo.mobileNumber}
            onChange={handleChange}
            maxLength={10}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={signUpInfo.address}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Aadhaar Number */}
        <div className="mb-4">
          <label
            htmlFor="aadhaarNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Aadhaar Number
          </label>
          <input
            type="text"
            id="aadhaarNumber"
            name="aadhaarNumber"
            value={signUpInfo.aadhaarNumber}
            onChange={handleChange}
            maxLength={12}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* PAN Card Number */}
        <div className="mb-4">
          <label
            htmlFor="panCardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            PAN Card Number
          </label>
          <input
            type="text"
            id="panCardNumber"
            name="panCardNumber"
            value={signUpInfo.panCardNumber}
            onChange={handleChange}
            maxLength={10}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label
            htmlFor="profilePic"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Aadhaar Photo */}
        <div className="mb-4">
          <label
            htmlFor="aadhaarPhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Aadhaar Photo
          </label>
          <input
            type="file"
            id="aadhaarPhoto"
            name="aadhaarPhoto"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* PAN Card Photo */}
        <div className="mb-4">
          <label
            htmlFor="panCardPhoto"
            className="block text-sm font-medium text-gray-700"
          >
            PAN Card Photo
          </label>
          <input
            type="file"
            id="panCardPhoto"
            name="panCardPhoto"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <span>
          {" Already Have a Account yet? "}
          <Link to="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </span>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
