import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import CarCard from "../components/CarCard";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Cars = () => {

  /* ================= URL SEARCH PARAMS ================= */
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const isSearchData = Boolean(pickupLocation && pickupDate && returnDate);

  /* ================= CONTEXT ================= */
  const { cars, axios } = useAppContext();

  /* ================= STATE ================= */
  const [searchInput, setSearchInput] = useState("");
  const [availableCars, setAvailableCars] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= API CALL ================= */
  const searchCarAvailability = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/bookings/check-availability",
        {
          location: pickupLocation,
          pickupDate,
          returnDate,
        }
      );

      if (data.success) {
        setAvailableCars(data.availableCars || []);

        if (data.availableCars.length === 0) {
          toast("No cars available for selected dates");
        }
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Failed to check availability");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    }
  }, [pickupLocation, pickupDate, returnDate]);

  /* ================= BASE DATA SOURCE ================= */
  const baseCars =
    isSearchData && availableCars.length > 0
      ? availableCars
      : cars;

  /* ================= TEXT FILTER ================= */
  const filteredCars = baseCars.filter((car) => {
    const query = searchInput.toLowerCase();

    return (
      car.brand?.toLowerCase().includes(query) ||
      car.model?.toLowerCase().includes(query) ||
      car.category?.toLowerCase().includes(query)
    );
  });

  /* ================= UI ================= */
  return (
    <div className="relative w-full min-h-screen py-24 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/90 to-blue-900/90"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-6 text-center"
        >
          <span className="inline-block text-sm font-semibold text-cyan-400 bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-500/30 mb-4">
            OUR FLEET
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Premium Vehicles
          </h1>

          <p className="text-xl text-gray-300">
            Discover our curated collection of luxury vehicles
          </p>

          {/* SEARCH BAR */}
          <div className="flex items-center max-w-2xl mx-auto mt-8 bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-700 p-3 gap-3">
            <img
              src={assets.search_icon}
              alt="search"
              className="w-5 h-5 opacity-80"
            />
            <input
              type="text"
              placeholder="Search by brand, model or category"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            />
          </div>
        </motion.div>

        {/* CARS GRID */}
        <div className="max-w-7xl mx-auto px-6 mt-16">

          <div className="text-cyan-300 font-semibold mb-6">
            Showing {filteredCars.length} Vehicles
          </div>

          {loading ? (
            <p className="text-center text-gray-400 py-20">
              Loading cars...
            </p>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-white mb-2">
                No Vehicles Found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search
              </p>

              <button
                onClick={() => setSearchInput("")}
                className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
