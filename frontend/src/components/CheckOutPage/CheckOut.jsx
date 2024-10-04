import React, { useState } from "react";
import { StarIcon } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Excavator X211 front view",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Excavator X211 side view",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Excavator X211 back view",
  },
];

const reviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 4,
    comment: "Great excavator, very powerful and efficient.",
    date: "2024-05-15",
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 5,
    comment: "Excellent machine, exceeded my expectations!",
    date: "2024-06-02",
  },
];

const CheckOut = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [isReviewing, setIsReviewing] = useState(false);

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
              <img
                src="/buldozer.png"
                // src={images[currentImage].src}
                alt={images[currentImage].alt}
                className="object-contain rounded-lg w-auto h-100"
              />
            </div>
            <div className="flex justify-center space-x-2 overflow-x-auto py-6">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative w-20 h-16 rounded flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    currentImage === index ? "ring-2 ring-yellow-500" : ""
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover rounded w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Rent now */}
          <div className="p-4">
            <h2 className="text-xl sm:text-2xl font-bold">Excavator X211</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Heavy-duty excavator for construction projects
            </p>
            <div className="flex justify-center mt-4 lg:mt-8">
              <button className="bg-yellow-300 hover:bg-yellow-500 py-3 px-4 w-full rounded text-gray-800 font-semibold text-lg">
                Rent Now
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle section */}
        <div className="bg-white border rounded-lg flex flex-col flex-1 animate-fadeIn">
          <div className="p-4 flex-1 text-left">
            <h3 className="text-lg sm:text-xl pt-1 pb-8 px-3 lg:text-2xl font-semibold font-spartan">
              Vehicle Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm sm:text-base px-3">
              <div>
                <p className="font-semibold">Company Name</p>
                <p>JCB</p>
              </div>
              <div>
                <p className="font-semibold">Model Name</p>
                <p>X211</p>
              </div>
              <div>
                <p className="font-semibold">Fuel Type</p>
                <p>Diesel</p>
              </div>
              <div>
                <p className="font-semibold">Max Distance</p>
                <p>100km</p>
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
                { label: "Model", value: "X211" },
                { label: "Engine", value: "Diesel" },
                { label: "Vehicle Width", value: "2.5 meters" },
                { label: "Operating Weight", value: "22 Ton" },
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
            <h4 className="text-base sm:text-lg lg:text-2xl py-4 font-spartan text-yellow-500 text-left mt-4">
              Additional Features
            </h4>
            <div className="flex flex-wrap gap-4 mt-2">
              {["GPS Location", "Grease Intake", "Damage Protection"].map(
                (feature, index) => (
                  <button
                    key={index}
                    className="text-xs sm:text-sm text-white border-white px-4 py-2 hover:bg-yellow-300 hover:rounded hover:text-gray-700 transition-colors duration-300"
                  >
                    {feature}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar section */}
      <div className="container pt-5">
        <h3 className="min-[320px]:text-2xl font-semibold font-spartan mb-4">
          Similar
        </h3>
        <Slider {...settings}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border rounded-lg shadow-md h-64 px-2"
            >
              {" "}
              {/* Added px-2 for horizontal padding */}
              <div className="p-4 space-y-2 h-48">
                <img
                  src="/buldozer.png?height=150&width=200"
                  alt={`Similar Excavator ${i}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h4 className="font-semibold">₹ 2500/hr</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Heavy-duty excavator for your construction needs.
                </p>
              </div>
            </div>
          ))}
        </Slider>
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
