import React, { useState } from "react";
import { motion } from "framer-motion";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { MapPin, Calendar, Search, Zap } from "lucide-react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-cyan-500 selection:text-black overflow-hidden">
      
      {/* --- ELITE AMBIENCE --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        {/* Digital Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center">
        
        {/* --- BRANDED HEADING SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 mb-6">
            <Zap size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">
              Premium Rental Experience
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
            CAR RENTAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
             BOOKING SYSTEM
            </span>
          </h1>
          
          <p className="mt-8 text-gray-500 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed">
            Escape the ordinary with our curated fleet of world-class supercars. 
            Instant booking. Precision service. Absolute power.
          </p>
        </motion.div>

        {/* --- THE COMMAND BAR (Search) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-6xl relative"
        >
          {/* Subtle Glow behind form */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl opacity-50" />
          
          <form 
            onSubmit={handleSubmit}
            className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-3 grid grid-cols-1 md:grid-cols-4 gap-3 shadow-2xl"
          >
            {/* Location */}
            <div className="group bg-white/[0.03] hover:bg-white/[0.06] transition-all rounded-2xl p-4 border border-white/5 flex items-center gap-4">
              <MapPin className="text-cyan-500" size={24} />
              <div className="flex-1">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Fleet Location</p>
                <select 
                  required value={pickupLocation} 
                  onChange={e => setPickupLocation(e.target.value)} 
                  className="bg-transparent w-full text-white font-bold focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0A0A0A]">Choose City</option>
                  {cityList.map(c => <option key={c} value={c} className="bg-[#0A0A0A]">{c}</option>)}
                </select>
              </div>
            </div>

            {/* Dates */}
            {[[pickupDate, setPickupDate, "Start Engine"], [returnDate, setReturnDate, "End Journey"]].map(([val, set, label], i) => (
              <div key={i} className="group bg-white/[0.03] hover:bg-white/[0.06] transition-all rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                <Calendar className="text-blue-500" size={24} />
                <div className="flex-1">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{label}</p>
                  <input 
                    type="date" value={val} onChange={e => set(e.target.value)} required
                    style={{ colorScheme: 'dark' }} 
                    className="bg-transparent w-full text-white font-bold focus:outline-none cursor-pointer" 
                  />
                </div>
              </div>
            ))}

            {/* Submit */}
            <button 
              type="submit" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl h-full py-5 md:py-0 transition-all active:scale-95 shadow-[0_10px_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Find My Ride
            </button>
          </form>
        </motion.div>

        {/* --- DYNAMIC CAR REVEAL --- */}
        <div className="relative w-full mt-8">
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[250px] bg-cyan-500/10 blur-[140px] rounded-full"
          />
          <motion.img 
            initial={{ opacity: 0, x: 150, filter: 'brightness(0)' }}
            animate={{ opacity: 1, x: 0, filter: 'brightness(1)' }}
            transition={{ duration: 1.2, ease: "circOut" }}
            src={assets.main_car} 
            className="relative z-10 w-full max-w-5xl mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
            alt="Elite Fleet" 
          />
        </div>

        {/* --- PERFORMANCE STATS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
          {[
            ["500+", "Active Fleet"], 
            ["24/7", "Concierge"], 
            ["0% ", "Hidden Fees"], 
            ["Instant", "Verification"]
          ].map(([v, l], i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl text-center group hover:border-cyan-500/30 transition-colors"
            >
              <h4 className="text-3xl font-black text-white italic group-hover:text-cyan-400 transition-colors">{v}</h4>
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em] mt-2 leading-none">{l}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;