import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerPage = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [formData, setFormData] = useState({
    companyName: "",
    mobileNumber: "",
    address: "",
    email: "",
    password: "",
    documents: [],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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
      const documentFiles = Array.from(files);
      setFormData((prevFormData) => ({
        ...prevFormData,
        documents: [...prevFormData.documents, ...documentFiles],
      }));
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
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile Number is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.email) errors.email = "Email Address is required";
    if (!formData.password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateKYC = () => {
    return formData.documents.length > 0;
  };

  const validateLogin = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email Address is required";
    if (!formData.password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "register" && validateRegistration()) {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "documents") {
          for (let i = 0; i < formData.documents.length; i++) {
            formDataToSubmit.append("documents", formData.documents[i]);
          }
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      });

      // Log the FormData entries for debugging
      for (let [key, value] of formDataToSubmit.entries()) {
        console.log("successfull registeration");
      }

      try {
        const response = await fetch("https://rustloader-backend.vercel.app/owner/register", {
          method: "POST",
          body: formDataToSubmit,
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token); // Save token if you use JWT
          localStorage.setItem("isRegistered", "true");
          toast.success("Registration successful!");

          // Redirect after a delay
          setTimeout(() => {
            setActiveTab("kyc");
          }, 1000);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to register");
        }
      } catch (error) {
        toast.error("Failed to register");
      }
    } else if (activeTab === "kyc" && validateKYC()) {
      localStorage.setItem("isKYCCompleted", "true");
      toast.success("KYC submitted successfully!");

      // Redirect after a delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      console.log("Registration Successful:");
    } else if (activeTab === "login" && validateLogin()) {
      try {
        const response = await fetch("https://rustloader-backend.vercel.app/owner/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          toast.success("Login successful!");

          // Redirect after a delay
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to log in");
        }
      } catch (error) {
        toast.error("Failed to log in");
      }
    } else {
      toast.error("Please fill the form properly.");
    }
  };

  const canSwitchToTab = (tab) => {
    // Allow access to the Login tab regardless of registration status
    if (tab === "login") return true;

    // Restrict access to the Register and KYC tabs based on registration status
    if (tab === "register")
      return localStorage.getItem("isRegistered") !== "true";
    if (tab === "kyc") return localStorage.getItem("isRegistered") === "true";
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4 flex flex-col items-center">
      <ToastContainer />
      <section className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl scale-90">
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
          <button
            className={`py-2 px-4 text-base font-medium ${
              activeTab === "login"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-gray-600"
            } transition-colors duration-300`}
            onClick={() => canSwitchToTab("login") && setActiveTab("login")}
          >
            Login
          </button>
        </div>

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
                <InputField
                  id="companyName"
                  label="Owner & Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  error={errors.companyName}
                />
                <InputField
                  id="mobileNumber"
                  label="Phone Number"
                  type="tel"
                  max={10}
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  error={errors.mobileNumber}
                />
                <InputField
                  id="address"
                  label="Your Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                />
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <InputField
                  id="password"
                  label="Create Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-300 text-white py-2 px-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Register
                </button>
              </form>
            </div>
          )}

          {activeTab === "login" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                Login Here
              </h2>
              <p className="text-gray-600 mb-8">
                If you already have an account, please log in to access your
                dashboard.
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-300 text-white py-2 px-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Login
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
                {[
                  "Proof of Business Registration",
                  "Valid Business License",
                  "Insurance Documents",
                  "Proof of Address",
                ].map((docType, index) => (
                  <DocumentUploadField
                    key={index}
                    docType={docType}
                    handleInputChange={handleInputChange}
                  />
                ))}
                <button
                  type="submit"
                  className="w-full bg-yellow-300 text-white py-2 px-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Submit KYC
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Other components remain unchanged

const InputField = ({ id, label, type = "text", value, onChange, error }) => (
  <div className="flex items-center bg-white border border-yellow-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-xl font-medium text-gray-800 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder={label}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  </div>
);

const DocumentUploadField = ({ docType, handleInputChange }) => (
  <div className="flex items-center bg-white border border-yellow-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="w-2/3">
      <label
        htmlFor={docType}
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
        name="documents"
        onChange={handleInputChange}
        className="w-full cursor-pointer bg-yellow-100 border border-gray-300 rounded-md py-2 px-4 file:bg-yellow-300 file:text-gray-700 file:font-medium file:border-none file:rounded-md file:cursor-pointer hover:file:bg-yellow-400"
        required
      />
    </div>
  </div>
);

export default OwnerPage;
