import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VehicleListingForm = () => {
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleType: "",
    VehicleName: "",
    fuelType: "",
    weightCapacity: "",
    vehicleUse: "",
    vehicleImages: [],
    otherDetails: "",
    vehicleYear: "",
    kmDriven: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails({
      ...vehicleDetails,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length !== 4) {
      toast.error("Please upload exactly 4 images.");
      e.target.value = ""; // Reset input if not exactly 4 images
    } else {
      setVehicleDetails({
        ...vehicleDetails,
        vehicleImages: files,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data to handle image uploads
    const formData = new FormData();
    for (let i = 0; i < vehicleDetails.vehicleImages.length; i++) {
      formData.append("vehicleImages", vehicleDetails.vehicleImages[i]);
    }
    formData.append("vehicleType", vehicleDetails.vehicleType);
    formData.append("VehicleName", vehicleDetails.VehicleName);
    formData.append("fuelType", vehicleDetails.fuelType);
    formData.append("weightCapacity", vehicleDetails.weightCapacity);
    formData.append("vehicleUse", vehicleDetails.vehicleUse);
    formData.append("otherDetails", vehicleDetails.otherDetails);
    formData.append("vehicleYear", vehicleDetails.vehicleYear);
    formData.append("kmDriven", vehicleDetails.kmDriven);

    try {
      const response = await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Vehicle listed successfully!");
        setVehicleDetails({
          vehicleType: "",
          VehicleName: "",
          fuelType: "",
          weightCapacity: "",
          vehicleUse: "",
          vehicleImages: [],
          otherDetails: "",
          vehicleYear: "",
          kmDriven: "",
        });
      } else {
        toast.error("Failed to list vehicle.");
      }
    } catch (error) {
      console.error("Error submitting vehicle data:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="vehicle-listing-section bg-white p-8 rounded-md shadow-md w-auto mx-auto transition duration-300 ease-in-out">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-yellow-500 pb-4 scale-95">
        List Your Vehicle
      </h2>

      <form className="space-y-6 scale-95" onSubmit={handleSubmit}>
        {/* Vehicle Type */}
        <div className="relative group">
          <label htmlFor="vehicleType" className="block font-medium mb-1">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={vehicleDetails.vehicleType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-transparent text-gray-900 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
            required
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="Excavator">Excavator</option>
            <option value="Dump Truck">Dump Truck</option>
            <option value="Crane">Crane</option>
            <option value="Bulldozer">Bulldozer</option>
            <option value="ForkLift">ForkLift</option>
            <option value="Backhoe">Backhoe</option>
            <option value="Roller">Roller</option>
            <option value="Grader">Grader</option>
            <option value="Loader">Loader</option>
          </select>
        </div>

        {/* Model Name */}
        <div className="relative group">
          <input
            type="text"
            id="VehicleName"
            name="VehicleName"
            value={vehicleDetails.VehicleName}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-transparent text-gray-900 placeholder-transparent focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
            required
          />
          <label
            htmlFor="VehicleName"
            className="absolute left-4 top-3 text-gray-500 group-focus-within:text-yellow-500 transform scale-90 -translate-y-7 transition-all duration-300 origin-0 bg-white px-1"
          >
            Vehicle Name
          </label>
        </div>

        {/* Fuel Type */}
        <div className="relative group">
          <select
            id="fuelType"
            name="fuelType"
            value={vehicleDetails.fuelType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-transparent text-gray-900 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
            required
          >
            <option value="">Select Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
          <label
            htmlFor="fuelType"
            className="absolute left-4 top-3 text-gray-500 group-focus-within:text-yellow-500 transform scale-90 -translate-y-7 transition-all duration-300 origin-0 bg-white px-1"
          >
            Fuel Type
          </label>
        </div>

        {/* Weight Capacity */}
        <div className="relative group">
          <input
            type="number"
            id="weightCapacity"
            name="weightCapacity"
            value={vehicleDetails.weightCapacity}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-transparent text-gray-900 placeholder-transparent focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
            required
          />
          <label
            htmlFor="weightCapacity"
            className="absolute left-4 top-3 text-gray-500 group-focus-within:text-yellow-500 transform scale-90 -translate-y-7 transition-all duration-300 origin-0 bg-white px-1"
          >
            Weight Capacity (Ton)
          </label>
        </div>

        {/* Vehicle Year */}
        <div className="relative group">
          <input
            type="number"
            id="vehicleYear"
            name="vehicleYear"
            value={vehicleDetails.vehicleYear}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-transparent text-gray-900 placeholder-transparent focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
            min="2010"
            max={new Date().getFullYear()}
            required
          />
          <label
            htmlFor="vehicleYear"
            className="absolute left-4 top-3 text-gray-500 group-focus-within:text-yellow-500 transform scale-90 -translate-y-7 transition-all duration-300 origin-0 bg-white px-1"
          >
            Vehicle Year
          </label>
        </div>

        {/* KM Driven */}
        <div className="relative group">
          <input
            type="number"
            id="kmDriven"
            name="kmDriven"
            value={vehicleDetails.kmDriven}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-transparent text-gray-900 placeholder-transparent focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
            min="0"
            required
          />
          <label
            htmlFor="kmDriven"
            className="absolute left-4 top-3 text-gray-500 group-focus-within:text-yellow-500 transform scale-90 -translate-y-7 transition-all duration-300 origin-0 bg-white px-1"
          >
            KM Driven
          </label>
        </div>

        {/* Image Upload (4 Angles) */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Upload 4 Images (One from each angle)
          </label>
          <input
            type="file"
            id="vehicleImages"
            name="vehicleImages"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block w-full text-gray-900 border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Other Details */}
        <div className="relative group">
          <textarea
            id="otherDetails"
            name="otherDetails"
            value={vehicleDetails.otherDetails}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-transparent text-gray-900 placeholder-transparent focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
            rows="4"
          />
          <label
            htmlFor="otherDetails"
            className="absolute left-4 top-3 text-gray-500 group-focus-within:text-yellow-500 transform scale-90 -translate-y-7 transition-all duration-300 origin-0 bg-white px-1"
          >
            Other Details
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
        >
          List Vehicle
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default VehicleListingForm;
