import React from "react";

const ReviewCard = ({ name, review, rating }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-4">
      <img
        src="/placeholder.svg"
        alt="User"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1 text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  index < rating ? "fill-current" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-500">{name}</p>
      </div>
    </div>
    <p className="mt-4 text-gray-700">{review}</p>
  </div>
);

const Reviews = () => {
  const reviews = [
    {
      name: "Samay Shah",
      review:
        "RustLoader se rental lena hamare liye bahut faydemand raha. Machinery quality acchi hai aur service reliable. Highly recommend!",
      rating: 5,
    },
    // Add more review objects here
  ];

  return (
    <section className="bg-gray-100 py-16 w-full px-4">
      <h2 className="text-2xl font-bold text-center mb-8">
        What Our Clients Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            review={review.review}
            rating={review.rating}
          />
        ))}
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            review={review.review}
            rating={review.rating}
          />
        ))}
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            review={review.review}
            rating={review.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
