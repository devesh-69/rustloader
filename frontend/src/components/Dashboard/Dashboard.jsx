import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import VehicleListingForm from "../Forms/VehicleListingForm";
import axios from "axios";
import {
  FaUsers,
  FaDollarSign,
  FaCar,
  FaSignOutAlt,
  FaBell,
  FaFileAlt,
  FaArrowRight,
  FaChartBar,
  FaCalendarAlt,
  FaMapPin,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("7d"); // Default to last 7 days

  // Mock data for now, we can replace with real API data
  const mockData = {
    earnings: [1000, 2200, 1500, 3200, 3400, 2600, 5000],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchEarnings = async () => {
      try {
        const response = await axios.get("/api/earnings", {
          params: { timeFrame },
        });
        setEarningsData(response.data); // Assuming response.data has the structure { earnings: [], months: [] }
      } catch (error) {
        console.error("Error fetching earnings data", error);
        // Fallback to mock data on error
        setEarningsData(mockData);
      } finally {
        setLoading(false);
      }
    };

    // Uncomment the following line to use real data
    // fetchEarnings();

    // Simulate API call delay with mock data
    setTimeout(() => {
      setEarningsData(mockData);
      setLoading(false);
    }, 1000);
  }, [timeFrame]);

  const chartOptions = (earningsData) => ({
    chart: {
      type: "column",
      backgroundColor: "transparent",
      borderWidth: 0,
      plotBackgroundColor: "rgba(255, 255, 255, 0.05)",
      style: {
        fontFamily: "'Inter', sans-serif",
      },
      spacing: [10, 10, 10, 10],
    },
    title: {
      text: "Earnings Over Time",
      style: {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#1F2937",
      },
      align: "left",
      margin: 100,
    },
    xAxis: {
      categories: earningsData.months,
      gridLineWidth: 0,
      labels: {
        style: {
          color: "#4B5563",
          fontSize: "12px",
        },
      },
      tickColor: "#D1D5DB",
    },
    yAxis: {
      title: {
        text: "Earnings (₹)",
        style: {
          color: "#1F2937",
          fontSize: "14px",
          fontWeight: "600",
        },
      },
      gridLineColor: "rgba(229, 231, 235, 0.3)",
      labels: {
        style: {
          color: "#4B5563",
          fontSize: "12px",
        },
      },
    },
    series: [
      {
        name: "Earnings",
        data: earningsData.earnings,
        color: "#22C55E",
        borderColor: "transparent",
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
      },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      backgroundColor: "#F9FAFB",
      borderColor: "#E5E7EB",
      borderRadius: 8,
      style: {
        color: "#374151",
        fontSize: "12px",
      },
      headerFormat: "<span style='font-weight:600;'>{point.key}</span><br/>",
      pointFormat: "<span>Earnings: <strong>₹{point.y}</strong></span>",
    },
    plotOptions: {
      column: {
        borderRadius: 5,
      },
    },
    credits: {
      enabled: false,
    },
  });

  const options = chartOptions(earningsData);

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  // Mock data
  const activeRentals = 6;
  const revenue = 18000;
  const fleetUtilization = 78;

  const vehicles = [
    { id: 1, name: "Bulldozer", status: "Available", performance: "Good" },
    { id: 2, name: "JCB", status: "Rented", performance: "Excellent" },
  ];

  const rentals = [
    {
      id: 1,
      customer: "Devesh Tatkare",
      vehicle: "Bulldozer",
      startDate: "2024-06-01",
      endDate: "2024-06-07",
    },
    {
      id: 2,
      customer: "Chirag Mahakal",
      vehicle: "JCB",
      startDate: "2024-06-03",
      endDate: "2024-06-10",
    },
  ];

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isKYCCompleted");
      localStorage.removeItem("isRegistered");
      toast.success("Logout successful!");

      // Redirect after a delay
      setTimeout(() => {
        navigate("/owners");
      }, 1000);
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="bg-white shadow-sm sticky top-0 h-screen overflow-auto w-16 md:w-64 min-[320px]:pt-20 md:pt-16">
          <div className="p-4 hidden md:block">
            <h1 className="text-xl font-bold text-gray-800">
              Rental Dashboard
            </h1>
          </div>
          <nav className="scale-90">
            <a
              href="#overview"
              className="flex items-center p-4 text-gray-800 border-b border-gray-200"
            >
              <FaChartBar size={20} />
              <span className="ml-2 hidden md:inline">Overview</span>
            </a>
            <a
              href="#list-vehicle"
              className="flex items-center p-4 text-gray-800 border-b border-gray-200"
            >
              <FaCar size={20} />
              <span className="ml-2 hidden md:inline">List Vehicle</span>
            </a>
            <a
              href="#rental-mana"
              className="flex items-center p-4 text-gray-800 border-b border-gray-200"
            >
              <FaCalendarAlt size={20} />
              <span className="ml-2 hidden md:inline">Rental Management</span>
            </a>

            <a
              href="#vehicle-mana"
              className="flex items-center p-4 text-gray-800 border-b border-gray-200"
            >
              <FaCalendarAlt size={20} />
              <span className="ml-2 hidden md:inline">Vehicle Management</span>
            </a>
            <a
              href="#"
              className="flex items-center p-4 text-gray-800 border-b border-gray-200"
            >
              <FaBell size={20} />
              <span className="ml-2 hidden md:inline">Alerts</span>
            </a>
            <a
              href="#"
              className="flex items-center p-4 text-gray-800 border-b border-gray-200"
            >
              <FaMapPin size={20} />
              <span className="ml-2 hidden md:inline">Location Tracking</span>
            </a>
            <a href="#" className="flex items-center p-4 text-gray-800">
              <FaCog size={20} />
              <span className="ml-2 hidden md:inline">User Settings</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center p-4 text-gray-800 border-b border-gray-200 w-full text-left"
            >
              <FaSignOutAlt size={20} />
              <span className="ml-2 hidden md:inline">Logout</span>
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:p-2 min-[320px]:p-3 overflow-auto scroll-smooth scale-95">
          {/* HiCharts and Overview */}
          <div
            id="overview"
            className="flex flex-col md:flex-row justify-between pt-20 pb-10 gap-8"
          >
            {/* Highcharts Container */}
            <div className="h-auto w-full md:w-[70%]">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>

            {/* Overview Section */}
            <div className="w-full md:w-[30%] mb-8">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="bg-white rounded-md shadow-sm p-4 flex-1">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-base font-bold pr-3 ">
                        Active Rentals
                      </h3>
                      <FaCar size={20} />
                    </div>
                    <p className="text-3xl font-bold">{activeRentals}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4 flex-1">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-base font-bold">
                        Vehicle Utilization
                      </h3>
                      <FaArrowRight size={20} />
                    </div>
                    <p className="text-3xl font-bold">{fleetUtilization}%</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 flex-1">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-base font-bold">Revenue</h3>
                    <FaDollarSign size={20} />
                  </div>
                  <p className="text-3xl font-bold">₹{revenue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* List Vehicle */}
          <div id="list-vehicle">
            <VehicleListingForm />
          </div>

          {/* Rental Management */}
          <div className="my-6">
            <h2 id="rental-mana" className="text-xl font-bold mb-4">
              Rental Management
            </h2>
            <div className="flex gap-4 flex-wrap">
              {rentals.map((rental) => (
                <div
                  key={rental.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex-1 min-w-[250px]"
                >
                  <h3 className="font-bold">{rental.customer}</h3>
                  <p className="py-1">{rental.vehicle}</p>
                  <p>
                    <FaCalendarAlt className="inline" /> {rental.startDate} -{" "}
                    {rental.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Management */}
          <div className="mb-8 py-6">
            <h2 id="vehicle-mana" className="text-xl font-bold mb-4">
              Vehicle Management
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-gray-200 p-2 text-left text-sm md:text-base">
                      Vehicle
                    </th>
                    <th className="border-b border-gray-200 p-2 text-left text-sm md:text-base">
                      Status
                    </th>
                    <th className="border-b border-gray-200 p-2 text-left text-sm md:text-base">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="text-sm md:text-base">
                      <td className="p-2">{vehicle.name}</td>
                      <td className="p-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-md text-white ${
                            vehicle.status === "Available"
                              ? "bg-green-500"
                              : vehicle.status === "Rented"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="p-2">{vehicle.performance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
