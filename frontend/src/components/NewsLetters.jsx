import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiSend, FiCheck } from "react-icons/fi";

const NewsLetters = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setEmail("");
      
      // Reset after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/80 to-blue-900/90"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Gradient Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          
          {/* Main Container */}
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 md:p-12">
            
            {/* Decorative Icons */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <FiMail className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="text-center">
              {/* Badge */}
              <span className="inline-block text-sm font-semibold text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-1.5 rounded-full border border-cyan-500/30 mb-6">
                STAY UPDATED
              </span>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-4">
                Join Our Exclusive Newsletter
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Get first access to premium vehicle launches, exclusive rental deals, 
                and luxury travel insights delivered directly to your inbox.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isLoading || submitted}
                    className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      submitted
                        ? "bg-gradient-to-r from-green-500 to-emerald-600"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <FiCheck className="w-5 h-5" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        <span>Subscribe Now</span>
                      </>
                    )}
                  </motion.button>
                </div>
                
                {/* Success Message */}
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-green-400 text-sm flex items-center justify-center gap-2"
                  >
                    <FiCheck className="w-4 h-4" />
                    Welcome to our exclusive community! Check your email for confirmation.
                  </motion.p>
                )}
              </form>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Exclusive deals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "10K+", label: "Subscribers", color: "from-cyan-400 to-blue-500" },
              { value: "40%", label: "Exclusive Offers", color: "from-purple-400 to-pink-500" },
              { value: "24h", label: "Early Access", color: "from-green-400 to-emerald-500" },
              { value: "100%", label: "Satisfaction", color: "from-amber-400 to-orange-500" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 p-4 text-center hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsLetters;