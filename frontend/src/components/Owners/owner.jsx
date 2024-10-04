import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OwnerPage = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    vehicleName: "",
    vehicleType: "",
    documents: [],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already registered and KYC is completed
    const registrationStatus = localStorage.getItem("isRegistered");
    const kycStatus = localStorage.getItem("isKYCCompleted");

    if (registrationStatus === "true" && kycStatus === "true") {
      navigate("/dashboard");
    } else if (registrationStatus === "true") {
      setActiveTab("kyc");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documents") {
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateRegistration = () => {
    const errors = {};
    if (!formData.companyName) errors.companyName = "Company Name is required";
    if (!formData.email) errors.email = "Email Address is required";
    if (!formData.password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateKYC = () => {
    return formData.documents.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "register" && validateRegistration()) {
      localStorage.setItem("isRegistered", "true"); // Mark user as registered
      setActiveTab("kyc"); // Move to KYC tab
    } else if (activeTab === "kyc" && validateKYC()) {
      localStorage.setItem("isKYCCompleted", "true"); // Mark KYC as completed
      setActiveTab("kyc"); // Move to List Vehicle tab
      navigate("/dashboard"); // Redirect to dashboard after successful vehicle listing
      console.log("Register Sucessfully !!:", formData);
    }
  };

  const canSwitchToTab = (tab) => {
    if (tab === "register") return true;
    if (tab === "kyc") return localStorage.getItem("isRegistered") === "true";
    return localStorage.getItem("isKYCCompleted") === "true";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4 flex flex-col items-center">
      <section className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl scale-90">
        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-300 mb-8">
          <button
            className={`py-2 px-4 text-base font-medium ${
              activeTab === "register"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-gray-600"
            } transition-colors duration-300`}
            onClick={() =>
              canSwitchToTab("register") && setActiveTab("register")
            }
            disabled={!canSwitchToTab("register")}
          >
            Register
          </button>
          <button
            className={`py-2 px-4 text-base font-medium ${
              activeTab === "kyc"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-gray-600"
            } transition-colors duration-300`}
            onClick={() => canSwitchToTab("kyc") && setActiveTab("kyc")}
            disabled={!canSwitchToTab("kyc")}
          >
            KYC
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "register" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                Register Here
              </h2>
              <p className="text-gray-600 mb-8">
                Create an account to list your vehicles and manage bookings
                effortlessly.
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex items-center bg-white border border-yellow-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full">
                    <label
                      htmlFor="companyName"
                      className="block text-xl font-medium text-gray-800 mb-2"
                    >
                      Owner & Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter your company name"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.companyName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center bg-white border border-yellow-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full">
                    <label
                      htmlFor="PhoneNumber"
                      className="block text-xl font-medium text-gray-800 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter your Mobile Number"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.mobileNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center bg-white border border-yellow-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full">
                    <label
                      htmlFor="Address"
                      className="block text-xl font-medium text-gray-800 mb-2"
                    >
                      Your Address
                    </label>
                    <input
                      type="text"
                      id="Address"
                      name="Address"
                      value={formData.Address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter your company name"
                    />
                    {errors.Address && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.Address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center bg-white border border-yellow-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block text-xl font-medium text-gray-800 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Email Address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center bg-white border border-yellow-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="block text-xl font-medium text-gray-800 mb-2"
                    >
                      Create Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Create Password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-300 text-white py-2 px-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Register
                </button>
              </form>
            </div>
          )}
          {activeTab === "kyc" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-700 mb-8">
                Submit KYC Documents
              </h2>
              <p className="text-base text-gray-600 mb-10">
                Please upload the following documents to complete your KYC
                verification:
              </p>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Document Uploads */}
                {[
                  "Proof of Business Registration",
                  "Valid Business License",
                  "Insurance Documents",
                  "Proof of Address",
                ].map((docType, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white border border-yellow-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-2/3">
                      <label
                        htmlFor={`document${index}`}
                        className="block text-xl font-medium text-gray-800 mb-2"
                      >
                        {docType}
                      </label>
                      <p className="text-gray-500 text-sm">
                        Upload your {docType.toLowerCase()} here.
                      </p>
                    </div>
                    <div className="w-1/3 text-right">
                      <input
                        type="file"
                        id={`document${index}`}
                        name="documents"
                        onChange={handleInputChange}
                        className="w-full cursor-pointer bg-yellow-100 border border-gray-300 rounded-md py-2 px-4 file:bg-yellow-300 file:text-gray-700 file:font-medium file:border-none file:rounded-md file:cursor-pointer hover:file:bg-yellow-400 overflow-hidden"
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-yellow-300 text-white py-2 px-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Submit KYC
                </button>
              </form>
            </div>
          )}{" "}
        </div>
      </section>
    </div>
  );
};

export default OwnerPage;
