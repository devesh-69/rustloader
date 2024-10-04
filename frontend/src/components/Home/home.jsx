import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Reviews from "../reviews/Reviews";
import { ChevronRight } from "lucide-react";

// SVG Icon components
function BoltIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

const VehicleCard = ({ imageSrc, altText, title, category, linkTo }) => (
  <div className="bg-white rounded-sm shadow-md hover:shadow-sm transition-all duration-300 overflow-hidden">
    <div className="h-44 w-full object-cover relative">
      <img
        src={imageSrc}
        alt={altText}
        className="object-cover rounded-t-lg w-full h-full"
      />
    </div>
    <div className="p-6">
      <span className="text-sm font-semibold text-primary mb-2 block">
        {category}
      </span>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <a
        href={linkTo}
        className="inline-flex items-center w-full bg-yellow-300 text-white py-2 px-4 rounded-md text-center hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        View Vehicles
        <ChevronRight className="ml-2 w-4 h-4" />
      </a>
    </div>
  </div>
);

const Home = () => {
  const vehicles = [
    {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZ27VB0dBnFtW-3CxY68woCma8JpQY2axCg&s",
      altText: "FlatBed Truck",
      title: "FlatBed Truck",
      category: "Quick Pick-up",
      linkTo: "/vehicles",
    },
    {
      imageSrc:
        "https://media.istockphoto.com/id/154243306/photo/road-dump.jpg?s=612x612&w=0&k=20&c=ypd4JQh12tcMv7j1_0ZdsUjsXsr6Clr5n4S48_hFoFs=",
      altText: "Dump Truck",
      title: "Dump Truck",
      category: "Quick Pick-up",
      linkTo: "/vehicles",
    },
    {
      imageSrc:
        "https://media.istockphoto.com/id/104501743/photo/mobile-crane-with-its-boom-risen-outdoors.jpg?s=612x612&w=0&k=20&c=0u1Ij6McPQ4xAIhSpniZegok_2vIP6ZQKE_TE0N4r5Y=",
      altText: "Crane Truck",
      title: "Crane Truck",
      category: "Quick Pick-up",
      linkTo: "/vehicles",
    },
    {
      imageSrc:
        "https://media.istockphoto.com/id/695789348/photo/excavator-blue-sky-heavy-machine-construction-site.jpg?s=612x612&w=0&k=20&c=rfEUzRNSMuUWhQro6HV7W7J6URrRWyzZHGDtuYCcbVc=",
      altText: "Excavator",
      title: "Excavator",
      category: "Quick Pick-up",
      linkTo: "/vehicles",
    },
    {
      imageSrc:
        "https://media.istockphoto.com/id/636021590/photo/earth-mover-in-a-new-highway-construction-s3-poland.jpg?s=612x612&w=0&k=20&c=JjYo1TJt9zFeVxPLNcU5iWSZncT_ug5PvEgjhbCmobk=",
      altText: "Bulldozer",
      title: "Bulldozer",
      category: "Heavy Machinery",
      linkTo: "/vehicles",
    },
    {
      imageSrc:
        "https://media.istockphoto.com/id/1389144924/photo/commercial-site-development.jpg?s=612x612&w=0&k=20&c=NP6-nxLFm9oid-pGBKqxufuyzmcnyOiBm2Ei2J_MYYM=",
      altText: "Wheel Loader",
      title: "Wheel Loader",
      category: "Heavy Machinery",
      linkTo: "/vehicles",
    },
    {
      imageSrc:
        "https://5.imimg.com/data5/NSDMERP/Default/2022/9/JB/NF/UR/160705702/cargo-truck-body-1663660064369.jpg",
      altText: "Cargo Truck",
      title: "Cargo Truck",
      category: "Transportation",
      linkTo: "/vehicles",
    },
    {
      imageSrc:
        "https://media.istockphoto.com/id/1371511593/photo/concrete-mixer-india.jpg?s=612x612&w=0&k=20&c=a5BX2r9WnYILTGpb-KWcbD5PQulDbo4id8lP_1Bg_pw=",
      altText: "Concrete Mixer",
      title: "Concrete Mixer",
      category: "Specialized",
      linkTo: "/vehicles",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const hintTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    startHintTimer();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(hintTimeoutRef.current);
    };
  }, []);

  const startHintTimer = () => {
    clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
  };

  const handleTouchStart = () => {
    clearTimeout(hintTimeoutRef.current);
    setShowSwipeHint(false);
    console.log("Touch started");
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[550px] md:h-[650px] text-white"
        style={{
          backgroundImage: "url('../exacvater.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/50"></div>

        <div className="container mx-auto text-center md:py-16 relative z-10 flex flex-col justify-center h-full">
          <div className="max-w-lg mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-2xl sm:pt-8 md:pt-12 animate-fadeIn">
                Kharido nahi Rent Karo!
              </h1>
              <p className="text-sm sm:text-base md:text-lg mt-4 sm:mt-6 text-white font-medium drop-shadow-md transition-transform duration-500 ease-in-out transform hover:scale-95">
                Your One-stop platform for all construction vehicle needs.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col items-center">
              {/* Booking Container */}
              <div className="booking-container flex flex-col sm:flex-row items-center bg-gray-900 bg-opacity-90 backdrop-blur-lg p-4 sm:p-6 md:p-8 border border-yellow-400 rounded-3xl shadow-3xl w-full sm:w-[90%] md:w-[80%] lg:w-[550px] xl:w-[700px] my-6 font-sans transform transition-all duration-700 hover:shadow-sm">
                {/* Site Location Input */}
                <div className="input-group flex flex-col sm:mr-4 md:mr-6 w-full">
                  <label
                    htmlFor="pickup-place"
                    className="text-xs sm:text-sm text-yellow-400 font-bold mb-2"
                  >
                    Site Location
                  </label>
                  <input
                    type="text"
                    id="pickup-place"
                    placeholder="Enter pickup place"
                    className="border-2 border-gray-600 p-2 sm:p-3 rounded-md text-sm sm:text-base bg-gray-800 text-white transition duration-300 ease-in-out focus:outline-none focus:border-yellow-500 focus:bg-gray-700 focus:shadow-lg"
                  />
                </div>

                {/* Date Input */}
                <div className="input-group flex flex-col sm:mr-4 md:mr-6 w-full mt-4 sm:mt-0">
                  <label
                    htmlFor="pickup-date"
                    className="text-xs sm:text-sm text-yellow-400 font-bold mb-2"
                  >
                    Pick Date
                  </label>
                  <input
                    type="date"
                    id="pickup-date"
                    className="border-2 border-gray-600 p-2 sm:p-3 w-full rounded-md text-sm sm:text-base bg-gray-800 text-gray-400 transition duration-300 ease-in-out focus:outline-none focus:border-yellow-500 focus:bg-gray-700 focus:shadow-lg"
                  />
                </div>

                {/* Book Now Button */}
                <button className="book-now-btn border border-transparent p-2 md:mt-6 mt-6 md:w-80 w-full sm:mt-4 bg-yellow-300 text-black rounded-xl text-sm sm:text-md md:text-lg font-bold cursor-pointer transition-all duration-500 ease-in-out transform hover:bg-gradient-to-br hover:from-yellow-300 hover:to-yellow-300 hover:scale-95 hover:shadow-sm active:scale-90 active:bg-yellow-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Vehicle Showcase Section */}
      <section className="bg-gray-50 py-2">
        <div className="container mx-auto px-4 scale-90">
          <h2 className="text-2xl sm:text-4xl font-bold mb-12 text-center">
            Vehicle <span className="text-primary">Showcase</span>
          </h2>

          {isMobile ? (
            <div className="relative">
              {showSwipeHint && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-gray-700 text-yellow-300 text-xs px-4 py-2 rounded-full opacity-75 animate-pulse">
                    Swipe to see more &rarr;
                  </div>
                </div>
              )}
              <Swiper
                navigation
                pagination
                modules={[Navigation, Pagination]}
                className="mySwiper"
                onTouchStart={handleTouchStart}
              >
                {vehicles.map((vehicle, index) => (
                  <SwiperSlide key={index} className="p-2 lg:p-0">
                    <VehicleCard {...vehicle} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicles.map((vehicle, index) => (
                <VehicleCard key={index} {...vehicle} />
              ))}
            </div>
          )}

          {isMobile ? (
            <div className="relative">
              {showSwipeHint && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-gray-700 text-yellow-300 text-xs px-4 py-2 rounded-full opacity-75 animate-pulse">
                    Swipe to see more &rarr;
                  </div>
                </div>
              )}
              <Swiper
                navigation
                pagination
                modules={[Navigation, Pagination]}
                className="mySwiper"
                onTouchStart={handleTouchStart}
              >
                {vehicles.map((vehicle, index) => (
                  <SwiperSlide key={index} className="p-2 lg:p-0">
                    <VehicleCard {...vehicle} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
              {vehicles.map((vehicle, index) => (
                <VehicleCard key={index} {...vehicle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* statictcs */}
      <section className=" md:py-24 lg:py-24 min-[425px]:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl  font-semibold text-gray-700 text-center mb-24">
            Renting is more Feasible than buying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 flex items-center justify-center">
                2.5 Years
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Experience and Trust in Renting Business
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 flex items-center justify-center">
                445+
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Daily Constructions Happenings in Maharashra
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 flex items-center justify-center">
                2389+
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Happy Customers with RustLoader
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 RustLoader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
