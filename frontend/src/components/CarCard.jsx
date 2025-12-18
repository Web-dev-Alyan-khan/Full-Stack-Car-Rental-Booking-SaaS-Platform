import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {

    const navigate = useNavigate()
  return (
    <motion.div
      onClick={() =>{navigate(`/car-details/${car._id}`);scrollTo(0,0)}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-gray-900 via-blue-950 to-black rounded-2xl border border-gray-900 shadow-md hover:shadow-xl transition p-5 flex flex-col cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative rounded-xl overflow-hidden border-b border-red-500 pb-4">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-48 md:h-56 object-cover rounded-xl"
        />

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white font-bold text-sm px-4 py-1 rounded-full shadow-lg">
          ${car.pricePerDay} / day
        </div>

        {/* Availability Badge */}
        {car.isAvaliable && (
          <div className="absolute top-3 left-3 bg-red-500 text-white font-semibold text-xs px-3 py-1 rounded-full shadow">
            Available
          </div>
        )}
      </div>

      {/* Title & Category */}
      <div className="mt-4 border-b border-gray-200 pb-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-200">
          {car.brand} {car.model}
        </h3>
        <p className="text-gray-200 text-sm mt-1">
          {car.category} • {car.year}
        </p>
      </div>

      {/* Features / Icons */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-3">
        <div className="flex items-center gap-2 text-gray-300 text-sm border-r pr-2 md:border-r-0 md:border-b md:pb-2">
          <img src={assets.users_icon} className="w-5 opacity-80" />
          <span>{car.seating_capacity} Seats</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300 text-sm border-r pr-2 md:border-r-0 md:border-b md:pb-2">
          <img src={assets.fuel_icon} className="w-5 opacity-80" />
          <span>{car.fuel_type}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300 text-sm border-r pr-2 md:border-r-0 md:border-b md:pb-2">
          <img src={assets.car_icon} className="w-5 opacity-80" />
          <span>{car.transmission}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <img src={assets.location_icon} className="w-5 opacity-80" />
          <span>{car.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
