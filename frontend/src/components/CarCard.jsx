import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  // Feature mapping to keep the JSX small and clean
  const features = [
    { label: "Seats", val: car.seating_capacity, icon: assets.users_icon, color: "from-blue-500/20 to-cyan-500/20" },
    { label: "Fuel", val: car.fuel_type, icon: assets.fuel_icon, color: "from-emerald-500/20 to-green-500/20" },
    { label: "Type", val: car.transmission, icon: assets.car_icon, color: "from-purple-500/20 to-pink-500/20" },
    { label: "Loc", val: car.location, icon: assets.location_icon, color: "from-amber-500/20 to-orange-500/20" },
  ];

  return (
    <motion.div
      onClick={() => { navigate(`/car-details/${car._id}`); window.scrollTo(0, 0); }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="relative group bg-slate-900/50 border border-white/10 rounded-2xl p-4 overflow-hidden cursor-pointer hover:bg-slate-800/80 transition-all duration-500"
    >
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500" />

      {/* Image Container */}
      <div className="relative h-48 mb-4 overflow-hidden rounded-xl border border-white/5">
        <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        
        <div className="absolute top-2 right-2 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
          ${car.pricePerDay}<span className="font-normal opacity-70">/d</span>
        </div>

        {car.isAvaliable && (
          <div className="absolute top-2 left-2 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Available
          </div>
        )}
      </div>

      {/* Header */}
      <div className="px-1">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
          {car.brand} <span className="font-light text-gray-400">{car.model}</span>
        </h3>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{car.category} • {car.year}</p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center border border-white/5`}>
              <img src={f.icon} className="w-4 h-4 opacity-80" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 leading-none mb-1">{f.label}</p>
              <p className="text-xs text-gray-200 font-medium truncate">{f.val}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-5 py-2.5 bg-white/5 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl border border-white/10 transition-all duration-300">
        View Details
      </button>
    </motion.div>
  );
};

export default CarCard;