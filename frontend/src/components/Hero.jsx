import React, { useState } from "react";
import { motion } from "framer-motion";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
 
  const {pickupDate,setPickupDate,returnDate,setReturnDate,navigate} = useAppContext()

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/cars?pickupLocation='+ pickupLocation + '&pickupDate=' + pickupDate + '&returnDate' + returnDate)
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-black py-24 md:py-32">
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </motion.div>

      {/* Glowing Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Enhanced Heading with Gradient Text */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            className="space-y-4 mb-12"
          >
            <div className="inline-block">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mb-6 rounded-full"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-200">
                Premium Luxury
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Car Rentals
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Experience unparalleled luxury with our curated collection of premium vehicles
              <span className="block text-cyan-400 font-medium mt-2">Drive Excellence. Arrive in Style.</span>
            </p>
          </motion.div>

          {/* Enhanced Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            
            <form 
              onSubmit={handleSubmit}
              className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full shadow-lg"
              >
                <span className="text-white font-semibold text-sm">Book Your Luxury Ride</span>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
                {/* Pickup Location */}
                <div className="text-left relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    Pickup Location
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-gray-500 appearance-none"
                    >
                      <option value="" className="bg-gray-800">Choose City</option>
                      {cityList.map((city, index) => (
                        <option
                          key={city}
                          value={city}
                          className="bg-gray-800 py-2"
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Pickup Date */}
                <div className="text-left relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Pick-up Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Return Date */}
                <div className="text-left relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Return Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split("T")[0]}
                      required
                      className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <img src={assets.search_icon} alt="Search" className="w-5 h-5 filter brightness-0 invert" />
                    </motion.div>
                    <span className="text-lg">Find Luxury Cars</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Enhanced Car Image with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.6,
              type: "spring",
              stiffness: 100
            }}
            className="relative mt-20"
          >
            {/* Glow Effect Behind Car */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl"
            />
            
            {/* Floating Car */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              <motion.img
                src={assets.main_car}
                className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto drop-shadow-2xl"
                alt="Luxury Car"
                whileHover={{ scale: 1.02 }}
              />
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="absolute top-10 left-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg hidden md:block"
              >
                <span className="text-sm font-medium">🚀 Premium Fleet</span>
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 1
                }}
                className="absolute bottom-20 right-10 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg hidden md:block"
              >
                <span className="text-sm font-medium">⭐ 5-Star Service</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "200+", label: "Luxury Cars" },
              { value: "50+", label: "Cities" },
              { value: "15K+", label: "Happy Clients" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-gray-400 text-sm animate-pulse">Scroll to explore</div>
        <div className="mx-auto w-px h-8 bg-gradient-to-b from-cyan-500 to-transparent mt-2"></div>
      </motion.div>
      
    </div>
  );
};

export default Hero;