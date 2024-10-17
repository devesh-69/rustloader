import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen"; // Adjust the path as necessary
import "../../index.css";

const reviews = [
  {
    id: 1,
    author: "Ramesh Singh",
    rating: 4,
    comment: "Great excavator, very powerful and efficient.",
    date: "2024-05-15",
  },
  {
    id: 2,
    author: "Rathod Keshav",
    rating: 5,
    comment: "Excellent machine, exceeded my expectations!",
    date: "2024-06-02",
  },
];

const CheckOut = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarVehicles, setSimilarVehicles] = useState([]); // State for similar vehicles
  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [isReviewing, setIsReviewing] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          `https://rustloader-backend.vercel.app/api/vehicles/listings/${id}` // Use the ID in the fetch request
        );
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle details");
        }
        const data = await response.json();
        console.log("Fetched vehicle data:", data);
        setVehicle(data); // Set the fetched data to state
      } catch (err) {
        console.error(err);
        setError("Error fetching vehicle details");
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarVehicles = async () => {
      try {
        const response = await fetch(
          `https://rustloader-backend.vercel.app/api/vehicles/listings` // Adjust the endpoint accordingly
        );
        if (!response.ok) {
          throw new Error("Failed to fetch similar vehicles");
        }
        const data = await response.json();
        console.log("Fetched similar vehicles:", data);
        setSimilarVehicles(data); // Set the fetched similar vehicles to state
      } catch (err) {
        console.error(err);
        setError("Error fetching similar vehicles");
      }
    };

    fetchVehicles();
    fetchSimilarVehicles(); // Fetch similar vehicles
  }, [id]);

  const handleThumbnailClick = (image) => {
    setLargeImage(image); // Set the clicked thumbnail as the large image
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;
  if (!vehicle || Object.keys(vehicle).length === 0)
    return <div>No vehicle found.</div>;

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

  return (
    <div className="container mx-auto space-y-16 scale-90">
      <div className="flex flex-col lg:flex-row gap-6 lg:scale-90">
        {/* Image card section */}
        <div className="bg-white border rounded-lg shadow-md flex flex-col flex-1">
          <div className="p-4 flex-1 space-y-4">
            <div className="relative flex justify-center">
              {largeImage ? (
                <img
                  src={`data:${largeImage.contentType};base64,${largeImage.data}`}
                  alt={vehicle.VehicleName}
                  className="object-contain rounded-lg w-auto h-100"
                />
              ) : vehicle.vehicleImages && vehicle.vehicleImages.length > 0 ? (
                <img
                  src={`data:${vehicle.vehicleImages[0].contentType};base64,${vehicle.vehicleImages[0].data}`}
                  alt={vehicle.VehicleName}
                  className="object-contain rounded-lg w-auto h-100"
                />
              ) : (
                <div>No Image Available</div>
              )}
            </div>

            {/* Small Image Thumbnails */}
            <div className="flex justify-center space-x-2 overflow-x-auto py-6">
              {vehicle.vehicleImages.slice(1).map((image, index) => (
                <div key={index} className="w-24 h-24">
                  <img
                    src={`data:${image.contentType};base64,${image.data}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover rounded-lg w-full h-full cursor-pointer"
                    onClick={() => handleThumbnailClick(image)} // Add onClick handler
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Rent now */}
          <div className="p-4">
            <h2 className="text-xl sm:text-2xl font-bold">
              {vehicle.VehicleName}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {vehicle.vehicleUse}
            </p>
            <div className="flex justify-center mt-4 lg:mt-8">
              <button className="bg-yellow-300 hover:bg-yellow-500 py-3 px-4 w-full rounded text-gray-800 font-semibold text-lg">
                Rent Now
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
                <p className="font-semibold">Vehicle Name</p>
                <p>{vehicle.VehicleName || "Unknown Vehicle"}</p>
              </div>
              <div>
                <p className="font-semibold">Vehicle Type</p>
                <p>{vehicle.vehicleType || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Fuel Type</p>
                <p>{vehicle.fuelType || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Max Distance</p>
                <p>{vehicle.kmDriven ? `${vehicle.kmDriven} km` : "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Price</p>
                <p>
                  {vehicle.price ? `₹ ${vehicle.price}` : "Price not available"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Duration</p>
                <p>{vehicle.duration ? `${vehicle.duration} Days` : "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Specifications section */}
          <div className="bg-gray-900 text-white border rounded-lg p-6 sm:p-8 h-[55%] animate-fadeIn">
            <h3 className="text-lg sm:text-xl lg:text-2xl pb-8 font-spartan text-yellow-500 text-left">
              Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
              <div>
                <p className="font-semibold flex items-center">
                  <i className="fas fa-cog mr-2"></i> Vehicle Year
                </p>
                <p className="px-2 hover:font-bold">
                  {vehicle.vehicleYear ? vehicle.vehicleYear : "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold flex items-center">
                  <i className="fas fa-exchange-alt mr-2"></i> Weight Capacity
                </p>
                <p className="px-2 hover:font-bold">
                  {vehicle.weightCapacity ? vehicle.weightCapacity : "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold flex items-center">
                  <i className="fas fa-bolt mr-2"></i> Fuel
                </p>
                <p className="px-2 hover:font-bold">
                  {vehicle.fuelType ? vehicle.fuelType : "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold flex items-center">
                  <i className="fas fa-tachometer-alt mr-2"></i> Use
                </p>
                <p className="px-2 hover:font-bold">
                  {vehicle.vehicleUse ? vehicle.vehicleUse : "N/A"}
                </p>
              </div>
            </div>
            <h4 className="text-base sm:text-lg lg:text-2xl py-4 font-spartan text-yellow-500 text-left mt-4">
              Additional Features
            </h4>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                {
                  name: "GPS Location",
                  info: "Real-time tracking of the vehicle's location.",
                },
                {
                  name: "Grease Intake",
                  info: "Automated grease intake for maintenance.",
                },
                {
                  name: "Damage Protection",
                  info: "Insurance coverage for accidental damages from owner.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-xs sm:text-sm text-white border-white px-4 py-2 relative w-full sm:w-auto hover:shadow-lg transition-shadow duration-300 ease-in-out"
                  onMouseEnter={(e) => {
                    const popup = e.currentTarget.querySelector(".popup");
                    if (popup) popup.classList.remove("hidden");
                  }}
                  onMouseLeave={(e) => {
                    const popup = e.currentTarget.querySelector(".popup");
                    if (popup) popup.classList.add("hidden");
                  }}
                >
                  <button className="w-full">{feature.name}</button>
                  <div className="absolute top-0 left-0 w-full bg-yellow-300 p-2 text-gray-700 hidden popup transition-opacity duration-300 opacity-100 animate-fadeIn">
                    <p>{feature.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar vehicles slider */}
      <div className="bg-white border rounded-lg flex flex-col animate-fadeIn">
        <h3 className="text-lg sm:text-xl lg:text-2xl p-6 font-semibold font-spartan text-start">
          Similar Vehicles
        </h3>
        <Slider {...settings}>
          {similarVehicles.map((similar) => (
            <div key={similar._id} className="p-4 px-16">
              <img
                src={`data:${similar.vehicleImages[0].contentType};base64,${similar.vehicleImages[0].data}`}
                alt={similar.VehicleName}
                className="object-contain rounded-lg w-full h-40 my-2"
              />
              <h4 className="text-lg font-semibold text-start">
                {similar.vehicleType}
                <p className="text-sm">
                  {similar.price
                    ? ` ${similar.vehicleUse}`
                    : "Vehicles Not available"}
                </p>
              </h4>
            </div>
          ))}
        </Slider>
      </div>

      {/* Reviews section */}
      <div className="bg-white rounded-lg flex flex-col animate-fadeIn">
        <h3 className="text-lg sm:text-xl lg:text-2xl p-6 font-semibold font-spartan">
          Reviews
        </h3>
        <div className="divide-y divide-gray-300">
          {reviews.map((review) => (
            <div key={review.id} className="p-4">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h4 className="font-semibold">{review.author}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`w-4 h-4 ${
                        index < review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <button
            onClick={() => setIsReviewing(true)}
            className="bg-yellow-300 hover:bg-yellow-500 py-2 px-4 rounded"
          >
            Leave a Review
          </button>
          {isReviewing && (
            <div className="mt-4">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    onClick={() => handleStarClick(index + 1)}
                    className={`w-6 h-6 cursor-pointer ${
                      index < userReview.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <textarea
                value={userReview.comment}
                onChange={handleCommentChange}
                placeholder="Your review"
                className="w-full p-2 border rounded mt-2"
              />
              <button
                onClick={handleSubmitReview}
                className="mt-2 bg-yellow-300 hover:bg-yellow-500 py-2 px-4 rounded"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
