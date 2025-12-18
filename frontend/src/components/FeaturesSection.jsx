import React from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
// import { dummyCarData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const FeaturesSection = () => {
  const navigate = useNavigate();

  const {cars} = useAppContext()
  
  const goToCarsPage = () => {
    navigate(`/cars`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-screen opacity-30 animate-orb-one"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-screen opacity-30 animate-orb-two"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mix-blend-screen opacity-20 animate-orb-three"></div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-pulse"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Title Section */}
        <div className="mb-20 px-6 text-center">
          <span className="text-sm font-semibold text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 rounded-full border border-cyan-500/30 inline-block mb-4">
            PREMIUM FLEET
          </span>

          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-6 animate-text-glow">
            Featured Luxury Vehicles
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience unmatched comfort and style with our premium curated
            vehicle collection.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.slice(0,4).map((car, index) => (
              <div key={car._id} className="group relative">
                
                {/* Card Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>

                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:border-cyan-500/30 shadow-2xl">

                  {/* Premium Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold px-4 py-1 rounded-full text-sm transform rotate-12 animate-bounce-subtle">
                    PREMIUM
                  </div>

                  <div className="opacity-0 animate-slide-up-fade" style={{ animationDelay: `${index * 100}ms` }}>
                    <CarCard car={car}/>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 px-6">
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            {[
              { value: "24/7", label: "Support", color: "from-cyan-400 to-blue-500" },
              { value: "100+", label: "Vehicles", color: "from-purple-400 to-pink-500" },
              { value: "50+", label: "Locations", color: "from-green-400 to-emerald-500" },
              { value: "5★", label: "Rating", color: "from-amber-400 to-orange-500" },
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 animate-pulse`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            onClick={goToCarsPage}
            className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 text-lg font-semibold rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient-xy"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 blur-xl opacity-70 transition-opacity duration-500"></div>

            <span className="relative z-10 text-white">Explore Luxury Fleet</span>

            <svg
              className="relative z-10 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-80">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Verified Vehicles
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              Instant Booking
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              Premium Support
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesSection;
