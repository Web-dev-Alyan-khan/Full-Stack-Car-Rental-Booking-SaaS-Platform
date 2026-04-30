import React from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { useAppContext } from "../context/AppContext";

const FeaturesSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  const stats = [
    { v: "24/7", l: "Support", c: "from-cyan-400 to-blue-500" },
    { v: "100+", l: "Vehicles", c: "from-purple-400 to-pink-500" },
    { v: "50+", l: "Locations", c: "from-emerald-400 to-teal-500" },
    { v: "5★", l: "Rating", c: "from-amber-400 to-orange-500" },
  ];

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] font-black text-cyan-400 uppercase border border-cyan-500/30 px-4 py-1.5 rounded-full bg-cyan-500/5">
            Elite Collection
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl font-black text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Luxury Fleet</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto font-medium">
            Curated excellence for those who demand the finest driving experience.
          </p>
        </div>

        {/* Cars Grid - Removed extra nested wrappers for better performance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.slice(0, 4).map((car) => (
            <div key={car._id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
              <div className="relative bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all">
                {/* Premium Label */}
                <div className="absolute top-3 right-3 z-20 bg-amber-500 text-[10px] font-black px-2 py-1 rounded text-black uppercase tracking-tighter">
                  Premium
                </div>
                <CarCard car={car} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA & Stats */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <div className={`text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${s.c} mb-1 group-hover:scale-110 transition-transform`}>
                  {s.v}
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-8">
            <button
              onClick={() => { navigate('/cars'); window.scrollTo(0, 0); }}
              className="px-12 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Explore Full Fleet
            </button>

            {/* Clean Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              {['Verified', 'Instant Booking', 'Elite Support'].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full animate-ping" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;