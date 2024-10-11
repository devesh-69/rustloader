import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Reviews from "../reviews/Reviews";
import { ChevronRight } from "lucide-react";

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="gray"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </svg>
);

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

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const hintTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const loadDataFromLocalStorage = () => {
    const savedLocation = localStorage.getItem("userLocation");
    const savedDate = localStorage.getItem("userDate");
    if (savedLocation) setLocation(savedLocation);
    if (savedDate) setDate(savedDate);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, [routerLocation]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    // Start hint timer
    hintTimeoutRef.current = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000); // Show hint for 3 seconds

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(hintTimeoutRef.current);
    };
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name;
            setLocation(address);
          } catch (error) {
            console.error("Error fetching address:", error);
            setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
          }
        },
        () => {
          alert("Error: The Geolocation service failed.");
        }
      );
    } else {
      alert("Error: Your browser doesn't support geolocation.");
    }
  };

  const handleBookNow = () => {
    localStorage.setItem("userLocation", location);
    localStorage.setItem("userDate", date);
    setLocation("");
    setDate("");
    navigate("/vehicles");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[450px] sm:h-[550px] md:h-[650px] text-white overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left side content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center md:pt-0 pt-28 px-12 md:px-8 z-10 relative">
            {/* Gradient overlay for mobile: top-to-bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-700 to-transparent sm:bg-gradient-to-r sm:to-transparent"></div>

            <div className="relative z-10 px-2 sm:px-4 md:px-10 lg:px-14">
              <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-2xl mb-1 sm:mb-4">
                Kharido nahi Rent Karo!
              </h1>
              <p className="text-xs sm:text-sm md:text-lg mb-3 sm:mb-6 font-medium drop-shadow-md pb-4">
                Your One-stop platform for all construction vehicle needs.
              </p>

              {/* Booking Container */}
              <div className="booking-container bg-gray-900 bg-opacity-85 backdrop-blur-lg p-4 sm:p-4 md:p-5 lg:p-6 border border-yellow-400 rounded-lg sm:rounded-2xl shadow-3xl w-full max-w-xs sm:max-w-sm md:max-w-md">
                {/* Site Location Input */}
                <div className="mb-4 sm:mb-4 relative">
                  <label
                    htmlFor="pickup-place"
                    className="text-xs sm:text-sm text-yellow-400 font-bold mb-2 sm:mb-2 block"
                  >
                    Site Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="pickup-place"
                      placeholder="Enter pickup place"
                      className="w-full border-2 border-gray-600 p-2 sm:p-2 pr-8 overflow-auto rounded-md text-xs sm:text-sm md:text-base bg-gray-800 text-white focus:outline-none focus:border-yellow-500 focus:bg-gray-700"
                      value={location}
                      onChange={handleLocationChange}
                    />
                    <button
                      onClick={handleUseCurrentLocation}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-400"
                      aria-label="Use current location"
                    >
                      <LocationIcon />
                    </button>
                  </div>
                </div>

                {/* Date Input */}
                <div className="mb-4 sm:mb-4">
                  <label
                    htmlFor="pickup-date"
                    className="text-xs sm:text-sm text-yellow-400 font-bold mb-2 sm:mb-2 block"
                  >
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    id="pickup-date"
                    className="w-full border-2 border-gray-600 p-2 sm:p-2 rounded-md text-xs sm:text-sm md:text-base bg-gray-800 text-white focus:outline-none focus:border-yellow-500 focus:bg-gray-700"
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>

                {/* Book Now Button */}
                <button
                  onClick={handleBookNow}
                  className="w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-md text-sm font-bold hover:bg-yellow-500 transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Right side video */}
          <div className="w-full md:w-1/2 md:relative h-full md:h-full">
            <div className="absolute inset-0 md:mt-0 lg:mt-20">
              <Swiper
                className="w-full h-full"
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                speed={2000}
                modules={[Autoplay]}
              >
                {[
                  "/Bulldozer.mp4",
                  "/Concrete_truck.mp4",
                  "/Excavator.mp4",
                  "/Road_roller.mp4",
                ].map((src, index) => (
                  <SwiperSlide key={index}>
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={src} type="video/mp4" />
                      Your browser does not support the video.
                    </video>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Showcase Section */}
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
    </>
  );
};

export default Home;