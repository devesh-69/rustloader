import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarIcon } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CheckOut = () => {
  const { id } = useParams(); // Get the vehicle ID from the URL
  const [vehicle, setVehicle] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [isReviewing, setIsReviewing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vehicle details by ID
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/vehicles/${id}`
        );
        const data = await response.json();
        setVehicle(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const handleStarClick = (rating) => {
    setUserReview((prev) => ({ ...prev, rating }));
  };

  const handleCommentChange = (e) => {
    setUserReview((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmitReview = () => {
    console.log("Submitting review:", userReview);
    setIsReviewing(false);
    setUserReview({ rating: 0, comment: "" });
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/vehicles/rent/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Vehicle rented successfully!");
        navigate("/confirmation"); // Redirect to confirmation page or handle successful checkout
      } else {
        alert("Error in renting vehicle");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto space-y-16 scale-90">
      <div className="flex flex-col lg:flex-row gap-6 lg:scale-90">
        {/* Image card section */}
        <div className="bg-white border rounded-lg shadow-md flex flex-col flex-1">
          <div className="p-4 flex-1 space-y-4">
            <div className="relative flex justify-center">
              {vehicle &&
              vehicle.vehicleImages &&
              vehicle.vehicleImages.length > 0 ? (
                <img
                  src={`data:${vehicle.vehicleImages[0].contentType};base64,${vehicle.vehicleImages[0].data}`}
                  alt={vehicle.VehicleName}
                  className="object-contain rounded-lg w-auto h-100"
                />
              ) : (
                <img
                  src="/buldozer.png" // Placeholder image if no image is available
                  alt="Default Vehicle"
                  className="object-contain rounded-lg w-auto h-100"
                />
              )}
            </div>
            <div className="flex justify-center space-x-2 overflow-x-auto py-6">
              {vehicle?.vehicleImages?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative w-20 h-16 rounded flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    currentImage === index ? "ring-2 ring-yellow-500" : ""
                  }`}
                >
                  <img
                    src={`data:${image.contentType};base64,${image.data}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover rounded w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Rent Now Button */}
          <div className="p-4">
            <h2 className="text-xl sm:text-2xl font-bold">
              {vehicle?.VehicleName || "N/A"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {vehicle?.vehicleType || "N/A"} for construction projects
            </p>
            <div className="flex justify-center mt-4 lg:mt-8">
              <button
                className="bg-yellow-300 hover:bg-yellow-500 py-3 px-4 w-full rounded text-gray-800 font-semibold text-lg"
                onClick={handleCheckout}
              >
                Confirm and Rent Now
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle details section */}
        <div className="bg-white border rounded-lg flex flex-col flex-1 animate-fadeIn">
          <div className="p-4 flex-1 text-left">
            <h3 className="text-lg sm:text-xl pt-1 pb-8 px-3 lg:text-2xl font-semibold font-spartan">
              Vehicle Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm sm:text-base px-3">
              <div>
                <p className="font-semibold">Company Name</p>
                <p>{vehicle?.companyName || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Model Name</p>
                <p>{vehicle?.VehicleName || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Fuel Type</p>
                <p>{vehicle?.fuelType || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Max Distance</p>
                <p>{vehicle?.maxDistance || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Specifications section */}
          <div className="bg-gray-900 text-white border rounded-lg p-6 sm:p-8 h-3/5 animate-fadeIn">
            <h3 className="text-lg sm:text-xl lg:text-2xl pb-8 font-spartan text-yellow-500 text-left">
              Specifications
            </h3>
            <div className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-4">
              {[
                { label: "Model", value: vehicle?.VehicleName || "N/A" },
                { label: "Engine", value: vehicle?.fuelType || "N/A" },
                { label: "Vehicle Width", value: vehicle?.width || "N/A" },
                { label: "Operating Weight", value: vehicle?.weight || "N/A" },
              ].map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">{spec.label}</p>
                    <p className="text-xs sm:text-sm">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div>
        <h3 className="text-xl sm:text-3xl font-bold font-spartan mb-4">
          Reviews
        </h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border rounded-lg p-4 mb-4 overflow-auto"
          >
            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {review.author}
              </span>
              <span className="ml-2 text-xs text-gray-400">{review.date}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
        {!isReviewing && (
          <button
            onClick={() => setIsReviewing(true)}
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-black py-2 rounded"
          >
            Write a Review
          </button>
        )}
        {isReviewing && (
          <div className="bg-white border rounded-lg shadow-md p-4 mt-4">
            <h4 className="text-lg font-semibold mb-2">Write Your Review</h4>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-6 h-6 ${
                    i < userReview.rating ? "text-yellow-400" : "text-gray-400"
                  }`}
                  onClick={() => handleStarClick(i + 1)}
                />
              ))}
            </div>
            <textarea
              className="w-full border rounded-md p-2"
              rows="4"
              placeholder="Your review..."
              value={userReview.comment}
              onChange={handleCommentChange}
            />
            <button
              onClick={handleSubmitReview}
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-black py-2 rounded mt-2"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
