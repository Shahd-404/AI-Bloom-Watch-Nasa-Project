"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Flower, Search } from "lucide-react";

// Dynamic import of the map component to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

// Define an interface for your mock data for better type safety
interface BloomData {
  id: number;
  lat: number;
  lng: number;
  name: string;
  date: string;
  type: string;
}

// Mock data to simulate an API call
const mockApiData: BloomData[] = [
  { id: 1, lat: 51.505, lng: -0.09, name: "Trafalgar Square Bloom", date: "2024-10-25", type: "Blooms" },
  { id: 2, lat: 48.8566, lng: 2.3522, name: "Champs-Élysées Bloom", date: "2024-10-24", type: "Blooms" },
  { id: 3, lat: 35.6895, lng: 139.6917, name: "Shibuya Crossing Bloom", date: "2024-10-23", type: "Blooms" },
  { id: 4, lat: 40.7128, lng: -74.0060, name: "New York City Air", date: "2024-10-26", type: "Air Quality" },
  { id: 5, lat: 34.0522, lng: -118.2437, name: "Los Angeles Air", date: "2024-10-27", type: "Air Quality" },
  { id: 6, lat: 28.6139, lng: 77.2090, name: "Delhi Smog", date: "2024-10-27", type: "Air Quality" },
];

export default function MapPage() {
  const [blooms, setBlooms] = useState<BloomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBloom, setSelectedBloom] = useState<BloomData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>("Blooms");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Simulate API data fetching
    const timer = setTimeout(() => {
      setBlooms(mockApiData);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter data based on activeFilter state
  const filteredBlooms = useMemo(() => {
    if (!activeFilter) {
      return blooms;
    }
    return blooms.filter(bloom => bloom.type === activeFilter);
  }, [blooms, activeFilter]);

  const handleMarkerClick = (bloom: BloomData) => {
    setSelectedBloom(bloom);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedBloom(null);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mockGeocoding: { [key: string]: [number, number] } = {
      "paris": [48.8566, 2.3522],
      "tokyo": [35.6895, 139.6917],
      "london": [51.505, -0.09],
      "new york": [40.7128, -74.0060],
    };

    const normalizedQuery = searchQuery.toLowerCase();
    if (mockGeocoding[normalizedQuery]) {
      setMapCenter(mockGeocoding[normalizedQuery]);
    } else {
      alert("Location not found in mock data!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <div className="w-full relative h-[60vh] md:h-[70vh]">
        <img
          src="/blooming-mountain-flowers-stockcake.jpg"
          alt="Global monitoring map background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-8">
          <div className="max-w-2xl mx-auto">
            <Flower size={64} className="text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white animate-fadeInUp">
              Global Monitoring Map
            </h1>
            <p className="text-lg md:text-xl text-gray-200 animate-fadeInUp delay-200">
              Visualize and explore real-time environmental data. Track blooms, air quality, and more around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-10 px-4">
        <div className="relative w-[95%] mx-auto h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl shadow-2xl">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-green-500 border-opacity-50"></div>
            </div>
          ) : (
            <MapComponent
              blooms={filteredBlooms}
              isDarkMode={false}
              onMarkerClick={handleMarkerClick}
              mapCenter={mapCenter}
            />
          )}

          {/* Controls Overlay (Filters and Search) */}
          <div className="absolute top-4 right-4 flex flex-col items-end space-y-3 z-[1000]">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex rounded-full shadow-lg overflow-hidden bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location (e.g., London)"
                className="p-2 pl-4 w-48 focus:outline-none bg-gray-100 text-gray-800 placeholder-gray-500"
              />
              <button type="submit" className="p-2 px-4 bg-green-500 hover:bg-green-600 text-white transition-colors">
                <Search size={20} />
              </button>
            </form>

            {/* Filter Buttons */}
            <div className="p-2 rounded-full shadow-lg bg-white text-gray-800">
              <div className="flex space-x-2 text-sm">
                <button
                  onClick={() => setActiveFilter("Blooms")}
                  className={`px-3 py-1 rounded-full transition-colors ${activeFilter === "Blooms" ? "bg-green-500 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-800"}`}>
                  Blooms
                </button>
                <button
                  onClick={() => setActiveFilter("Air Quality")}
                  className={`px-3 py-1 rounded-full transition-colors ${activeFilter === "Air Quality" ? "bg-green-500 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-800"}`}>
                  Air Quality
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar at the bottom, centered */}
        {isSidebarOpen && selectedBloom && (
          <div className="mt-8 md:mt-12 mx-auto max-w-xl p-6 rounded-2xl shadow-xl bg-white text-gray-800 transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedBloom.name}</h2>
                <p className="text-md text-green-400">{selectedBloom.type}</p>
              </div>
              <button onClick={handleCloseSidebar} className="text-2xl font-bold text-gray-500 hover:text-gray-900">
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2 mb-4 text-sm text-gray-500">
              <div className="flex flex-col">
                <span className="font-bold">Detected On:</span>
                <span>{selectedBloom.date}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Coordinates:</span>
                <span>{selectedBloom.lat.toFixed(2)}, {selectedBloom.lng.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Graph Placeholder
              </div>
            </div>
            <button className="mt-4 w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-colors">
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#f0fdf4] text-gray-800 py-12 mt-20 rounded-t-3xl border-t-4 border-[#d4f9d8] animate-fadeIn delay-1000">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <Flower size={32} className="text-[#FDD835] mr-2 transition-colors duration-300 hover:text-yellow-500" />
              <h3 className="text-2xl font-bold main-logo-text">
                <span className="text-[#32CD32]">Bloom</span><span className="text-gray-800">Watch</span>
              </h3>
            </div>
            <p className="mt-4 text-sm max-w-sm">
              Tracking the pulse of our planet, one bloom at a time. Join us in monitoring Earth's natural cycles and contributing to a greener future.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-0 text-sm">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
              <a href="/map" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Map</a>
              <a href="/dashboard" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Dashboard</a>
              <a href="/data" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Data & APIs</a>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 mb-2">About Us</h4>
              <a href="/about" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Our Mission</a>
              <a href="/team" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Team</a>
              <a href="/contact" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Contact</a>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 mb-2">Resources</h4>
              <a href="/blog" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Blog</a>
              <a href="/research" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Research</a>
              <a href="/faq" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">FAQ</a>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
              <a href="#" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Twitter</a>
              <a href="#" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">LinkedIn</a>
              <a href="#" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">GitHub</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#d4f9d8] text-center text-xs text-gray-600">
          &copy; 2025 BloomWatch. All rights reserved.
        </div>
      </footer>
    </div>
  );
}