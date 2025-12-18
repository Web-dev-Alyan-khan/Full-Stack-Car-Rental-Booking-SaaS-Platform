import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";
import { motion } from "framer-motion";

const Star = ({ filled }) => (
  <span className={filled ? "text-yellow-400" : "text-gray-400"}>
    ★
  </span>
);

const Testimonial = () => {
  const testimonials = [
    {
      name: "ALYAN KHAN",
      role: "Car Owner",
      rating: 5,
      image: assets.alyan,
      review: "Excellent platform! I listed my car and started earning within a week. The verification process is smooth and professional.",
    },
    {
      name: "SHAYAN KHAN",
      role: "Renter",
      rating: 4,
      image: "/shayan.jpg",
      review: "Booking a car was super easy. The entire rental process felt safe and transparent. Highly recommended!",
    },
    {
      name: "SAFWAN KHAN",
      role: "Car Owner",
      rating: 5,
      image: "/safwan.jpg",
      review: "The platform manages insurance & payments, so I earn stress-free income. Great service and support team!",
    },
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Stunning Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-cyan-600 bg-gradient-to-r from-cyan-100 to-blue-100 px-6 py-2 rounded-full border border-cyan-300">
              TESTIMONIALS
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why discerning travelers choose StayVenture for their luxury accommodation around the world
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-5xl text-blue-100 font-serif">"</div>
                
                {/* Rating */}
                <div className="flex mb-6 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} filled={star <= item.rating} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed text-lg mb-8 italic">
                  "{item.review}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-50"></div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "4.9/5", label: "Average Rating", color: "from-cyan-500 to-blue-500" },
            { value: "2K+", label: "Happy Customers", color: "from-purple-500 to-pink-500" },
            { value: "98%", label: "Satisfaction Rate", color: "from-green-500 to-emerald-500" },
            { value: "24/7", label: "Support Available", color: "from-amber-500 to-orange-500" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;