import React, { useState, useEffect } from "react";
import { FaClock, FaTags } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThreeDots } from "react-loader-spinner";
import Fuse from "fuse.js";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen"; // Adjust the path as necessary
import "../../index.css";

export default function ConstructionRental() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState([6.7, 100]); // Default budget range for 'All' is full range
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [vehicleListings, setVehicleListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vehicle types and icons for filtering
  const vehicleTypes = [
    { name: "All", icon: "🚜" },
    { name: "Excavator", icon: "🚜" },
    { name: "Dump Truck", icon: "🚛" },
    { name: "Crane", icon: "🏗️" },
    { name: "Bulldozer", icon: "🚜" },
    { name: "Forklift", icon: "🚜" },
    { name: "Backhoe", icon: "🚜" },
    { name: "Roller", icon: "🚜" },
    { name: "Grader", icon: "🚜" },
    { name: "Loader", icon: "🚜" },
  ];

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          "https://rustloader-backend.vercel.app/api/vehicles/listings"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicleListings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Ensure all vehicles are shown automatically on load and reset budget for "All"
  useEffect(() => {
    if (selectedType === "All") {
      setBudget([6.7, 100]); // Full budget range when "All" is selected
    } else {
      setBudget([6.7, 100]);
    }
  }, [selectedType]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Initialize Fuse.js for fuzzy searching
  const fuse = new Fuse(vehicleListings, {
    keys: ["VehicleName"], // Use VehicleName for fuzzy searching
    threshold: 0.3, // sensitivity
  });

  // Fuzzy filter based on search term
  const fuzzyFilteredVehicles = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : vehicleListings;

  // Filter vehicles based on selected type and price range
  const filteredVehicles = fuzzyFilteredVehicles
    .filter((vehicle) => {
      const matchesType =
        selectedType === "All" ||
        vehicle.vehicleType.trim().toLowerCase() ===
          selectedType.trim().toLowerCase();

      const minPrice = budget[0] * 1000;
      const maxPrice = budget[1] * 1000;

      const matchesPrice =
        vehicle.price >= minPrice && vehicle.price <= maxPrice;

      return matchesType && matchesPrice;
    })
    .sort((a, b) => {
      console.log("Sorting vehicles:", a.price, b.price, sortOrder);
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      if (sortOrder === "low-to-high") {
        return priceA - priceB;
      } else if (sortOrder === "high-to-low") {
        return priceB - priceA;
      }
      return 0; // No sorting
    });

  // Filter vehicles based on the selected category
  const categoryFilteredVehicles = category
    ? filteredVehicles.filter(
        (vehicle) =>
          vehicle.vehicleType.toLowerCase() === category.toLowerCase()
      )
    : filteredVehicles; // Show all vehicles if no category is selected

  return (
    <div className="container mx-auto p-4 w-full scale-100 sm:scale-90">
      <div className="flex flex-col md:flex-row gap-8 my-16 sm:my-10">
        {/* Mobile-first layout */}
        <div className="w-full md:hidden space-y-6">
          {/* this was going to use for AI intigration but it can wait for to scaling project first */}
          {/* <Card>
            <CardHeader>
              <CardTitle>
                Choosing the correct construction vehicle is important.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If you're unsure which one to select, don't hesitate to contact
                us and we'll gladly help you find the best option for your
                needs.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                className="p-0 text-yellow-500 hover:text-yellow-600"
              >
                Find Vehicle →
              </Button>
            </CardFooter>
          </Card> */}

          {/* Search bar */}
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              type="search"
              placeholder="Find vehicle"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Budget slider */}
          <div className="space-y-2">
            <Label>Budget</Label>
            <Slider
              min={6.7} // Start from ₹6700
              max={100}
              step={0.1}
              value={budget}
              onValueChange={setBudget}
              className="[&>span]:bg-yellow-300 [&>span]:border-yellow-400"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹ {budget[0] * 1000}</span>
              <span>₹ {budget[1] * 1000}</span>
            </div>
          </div>

          {/* Vehicle type selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="min-[320px]:text-sm text-lg min-[320px]:py-2">
                Vehicle Type
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            {isOpen && (
              <div className="grid grid-cols-3 gap-2">
                {vehicleTypes.map((type) => (
                  <Button
                    key={type.name}
                    variant={
                      selectedType === type.name ? "secondary" : "outline"
                    }
                    className={`h-20 ${
                      selectedType === type.name
                        ? "bg-yellow-300 text-yellow-900 hover:bg-yellow-400"
                        : "hover:bg-yellow-100"
                    }`}
                    onClick={() => setSelectedType(type.name)}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-2xl">{type.icon}</span>
                      <span className="text-xs mt-1">{type.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar for desktop */}
        <div className="hidden md:block w-1/4 h-fit">
          <Card className="h-full">
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="desktop-search"
                  className="text-lg flex items-center justify-start py-2"
                >
                  Search
                </Label>
                <Input
                  id="desktop-search"
                  type="search"
                  placeholder="Find vehicle"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg flex items-center justify-start py-2">
                  Budget
                </Label>
                <Slider
                  min={6.7} // Start from ₹6700
                  max={100}
                  step={0.1}
                  value={budget}
                  onValueChange={setBudget}
                  className="[&>span]:bg-yellow-200"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹ {budget[0] * 1000}</span>
                  <span>₹ {budget[1] * 1000}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Vehicle Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {vehicleTypes.map((type) => (
                    <Button
                      key={type.name}
                      variant={
                        selectedType === type.name ? "secondary" : "outline"
                      }
                      className={`h-20 ${
                        selectedType === type.name
                          ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                          : "hover:bg-yellow-100"
                      }`}
                      onClick={() => setSelectedType(type.name)}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-2xl">{type.icon}</span>
                        <span className="text-xs mt-1">{type.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle listings */}
        <div className="w-full md:w-3/4 space-y-6">
          {/* Sorting dropdown */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              Vehicles ({categoryFilteredVehicles.length})
            </h1>
            <div className="space-y-2 w-44">
              <Label>Sort by</Label>
              <Select
                value={sortOrder}
                onValueChange={(value) => setSortOrder(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-to-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="high-to-low">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vehicle cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryFilteredVehicles.map((vehicle) => (
              <Card
                key={vehicle._id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="p-0">
                  <div className="relative pb-[56.25%]">
                    {vehicle.vehicleImages &&
                    vehicle.vehicleImages.length > 0 ? (
                      <img
                        src={`data:${vehicle.vehicleImages[0].contentType};base64,${vehicle.vehicleImages[0].data}`}
                        alt={vehicle.VehicleName}
                        className="absolute top-0 left-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-200">
                        <FaTruck className="text-4xl text-gray-400" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl mb-2">
                    {vehicle.VehicleName}
                  </CardTitle>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaClock className="mr-2" /> <span>Rental available</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" />{" "}
                      <span>{vehicle.duration} Day</span>
                    </div>
                    <div className="flex items-center font-semibold text-lg text-yellow-700">
                      <FaTags className="mr-2" /> <span>₹ {vehicle.price}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-transparent border border-yellow-300 text-gray-700 hover:bg-yellow-300"
                    onClick={() => navigate(`/checkout/${vehicle._id}`)}
                  >
                    Rent now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
