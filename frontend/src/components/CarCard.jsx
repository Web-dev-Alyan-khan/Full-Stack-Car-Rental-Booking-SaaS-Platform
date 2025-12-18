import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        window.scrollTo(0, 0);
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03, 
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative group overflow-hidden rounded-2xl cursor-pointer"
    >
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-emerald-900/30 group-hover:from-slate-800 group-hover:via-blue-900/30 group-hover:to-emerald-900/40 transition-all duration-500"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Card Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        
        {/* Image Section */}
        <div className="relative rounded-xl overflow-hidden mb-6 border border-white/10">
          <div className="aspect-video overflow-hidden rounded-xl">
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm px-4 py-2 rounded-full shadow-xl shadow-blue-500/30 backdrop-blur-sm">
              ${car.pricePerDay} <span className="text-xs font-normal opacity-90">/day</span>
            </div>
          </div>

          {/* Availability Badge */}
          {car.isAvaliable && (
            <div className="absolute top-4 left-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 backdrop-blur-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Available
              </div>
            </div>
          )}
        </div>

        {/* Title & Category */}
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
            {car.brand} {car.model}
          </h3>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-300 border border-white/10">
              {car.category}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 text-sm">{car.year}</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-auto pt-5 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                <img src={assets.users_icon} className="w-5 h-5 opacity-90" alt="seats" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Seats</p>
                <p className="text-white font-medium">{car.seating_capacity}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                <img src={assets.fuel_icon} className="w-5 h-5 opacity-90" alt="fuel" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Fuel</p>
                <p className="text-white font-medium">{car.fuel_type}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                <img src={assets.car_icon} className="w-5 h-5 opacity-90" alt="transmission" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Transmission</p>
                <p className="text-white font-medium">{car.transmission}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                <img src={assets.location_icon} className="w-5 h-5 opacity-90" alt="location" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-white font-medium truncate">{car.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;