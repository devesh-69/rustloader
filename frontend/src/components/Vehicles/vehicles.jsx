import React, { useState } from "react";
import { FaClock, FaTags } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust paths for these imports
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

export default function ConstructionRental() {
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState([0, 10]); // Budget in thousands
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortOrder, setSortOrder] = useState(""); // State for sorting

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

  // List of vehicles (this can be fetched from an API in real use case)
  const vehicleListings = [
    {
      id: 1,
      name: "JCB Dump Truck",
      type: "Dump Truck",
      price: 2500,
      image:
        "https://media.istockphoto.com/id/636021590/photo/earth-mover-in-a-new-highway-construction-s3-poland.jpg?s=2048x2048&w=is&k=20&c=oCs8T2pN1IMqLVNlEMjwxV-GqgDoKEpY1x3MpbAHdeo=",
    },
    {
      id: 2,
      name: "Excavator X200",
      type: "Excavator",
      price: 3000,
      image:
        "https://media.istockphoto.com/id/636021590/photo/earth-mover-in-a-new-highway-construction-s3-poland.jpg?s=2048x2048&w=is&k=20&c=oCs8T2pN1IMqLVNlEMjwxV-GqgDoKEpY1x3MpbAHdeo=",
    },
    {
      id: 3,
      name: "Bulldozer Z100",
      type: "Bulldozer",
      price: 3500,
      image:
        "https://media.istockphoto.com/id/636021590/photo/earth-mover-in-a-new-highway-construction-s3-poland.jpg?s=2048x2048&w=is&k=20&c=oCs8T2pN1IMqLVNlEMjwxV-GqgDoKEpY1x3MpbAHdeo=",
    },
    {
      id: 4,
      name: "Bulldozer Y200",
      type: "Excavator",
      price: 4500,
      image:
        "https://media.istockphoto.com/id/636021590/photo/earth-mover-in-a-new-highway-construction-s3-poland.jpg?s=2048x2048&w=is&k=20&c=oCs8T2pN1IMqLVNlEMjwxV-GqgDoKEpY1x3MpbAHdeo=",
    },
    {
      id: 5,
      name: "JCB Dump Truck",
      type: "Dump Truck",
      price: 2500,
      image:
        "https://media.istockphoto.com/id/636021590/photo/earth-mover-in-a-new-highway-construction-s3-poland.jpg?s=2048x2048&w=is&k=20&c=oCs8T2pN1IMqLVNlEMjwxV-GqgDoKEpY1x3MpbAHdeo=",
    },
  ];

  // Filter vehicles based on search term, type, and price range
  const filteredVehicles = vehicleListings
    .filter((vehicle) => {
      const matchesSearchTerm = vehicle.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "All" || vehicle.type === selectedType;
      const matchesPrice =
        vehicle.price >= budget[0] * 1000 && vehicle.price <= budget[1] * 1000;
      return matchesSearchTerm && matchesType && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "low-to-high") {
        return a.price - b.price;
      } else if (sortOrder === "high-to-low") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-4 w-full scale-100 sm:scale-90">
      <div className="flex flex-col md:flex-row gap-8 my-16 sm:my-10">
        {/* Mobile-first layout */}
        <div className="w-full md:hidden space-y-6">
          {/* Choosing vehicle is imp */}

          <Card>
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
          </Card>

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
              min={0}
              max={100}
              step={1}
              value={[budget[1]]}
              onValueChange={(value) => setBudget([budget[0], value[0]])}
              className="[&>span]:bg-yellow-300 [&>span]:border-yellow-400"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹ {budget[0]}k</span>
              <span>₹ {budget[1]}k</span>
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
        <Card className="hidden md:block w-1/4 h-fit">
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
                min={0}
                max={80}
                step={1}
                value={[budget[1]]}
                onValueChange={(value) => setBudget([budget[0], value[0]])}
                className="[&>span]:bg-gray-200"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹ {budget[0]}k</span>
                <span>₹ {budget[1]}k</span>
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

        {/* Vehicle listings */}
        <div className="w-full md:w-3/4 space-y-6">
          {/* Sorting dropdown */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Vehicles</h1>
            <div className="space-y-2 w-44">
              <Label>Sort by</Label>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
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
          <div className="grid aspect-auto grid-cols-2 gap-6 sm:grid-cols-3">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{vehicle.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full object-cover"
                  />
                  <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                    <FaClock /> <span>24 hours rental</span>
                  </div>
                  <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                    <FaTags /> <span>₹ {vehicle.price}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="link"
                    className="p-0 text-yellow-500 hover:text-yellow-600"
                  >
                    Rent now →
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
