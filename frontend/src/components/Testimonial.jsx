import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Quote, Star as StarIcon } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "ALYAN KHAN",
      role: "Luxury Car Owner",
      rating: 5,
      image: assets.alyan,
      review: "The most seamless listing process I've ever experienced. My fleet is now generating passive income while being handled with total care.",
    },
    {
      name: "SHAYAN KHAN",
      role: "Elite Member",
      rating: 5,
      image: "/shayan.jpg",
      review: "Booking a high-performance vehicle has never been this transparent. The service is fast, secure, and truly world-class.",
    },
    {
      name: "SAFWAN KHAN",
      role: "Car Owner",
      rating: 5,
      image: "/safwan.jpg",
      review: "Insurance and logistics are handled perfectly. I earn stress-free income while my vehicle stays in showroom condition.",
    },
  ];

  return (
    <section className="relative py-28 bg-[#05070A] overflow-hidden">
      
      {/* --- DASHBOARD BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[10px] font-black text-cyan-400 tracking-[0.4em] uppercase bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
              User Insights
            </span>
            <h2 className="mt-6 text-5xl md:text-6xl font-black text-white tracking-tight">
              DRIVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">TESTIMONIALS</span>
            </h2>
          </motion.div>
        </div>

        {/* --- TESTIMONIAL GRID --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* External Neon Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
              
              {/* Inner Card Container */}
              <div className="relative h-full bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
                
                {/* Floating Quote Icon */}
                <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-cyan-500/10 transition-colors" />

                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      size={16} 
                      className={i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} 
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed italic mb-8 relative z-10">
                  "{item.review}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="relative h-14 w-14">
                    <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-sm"></div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative h-full w-full rounded-full object-cover border-2 border-white/20"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide">{item.name}</h3>
                    <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>

                {/* Interactive Bottom Shine */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- STATS SECTION --- */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: "4.9/5", l: "Rating", c: "from-blue-400 to-cyan-400" },
            { v: "15K+", l: "Happy Clients", c: "from-purple-400 to-pink-400" },
            { v: "98%", l: "Success Rate", c: "from-emerald-400 to-teal-400" },
            { v: "24/7", l: "Elite Support", c: "from-amber-400 to-orange-400" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl text-center backdrop-blur-sm">
              <div className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.c}`}>
                {stat.v}
              </div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonial;