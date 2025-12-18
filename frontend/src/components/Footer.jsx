import React, { useState, useEffect } from "react";
import { 
  FaCar, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaStar,
  FaClock,
  FaGlobeAmericas,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaGooglePlay,
  FaApple,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
  FaGoogleWallet,
  FaRegCalendarAlt
} from "react-icons/fa";
import { IoIosCar, IoIosRocket } from "react-icons/io";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: <FaUsers className="text-2xl" />, value: "10K+", label: "Happy Customers", color: "text-green-400" },
    { icon: <IoIosCar className="text-2xl" />, value: "500+", label: "Premium Cars", color: "text-blue-400" },
    { icon: <FaGlobeAmericas className="text-2xl" />, value: "50+", label: "Cities", color: "text-cyan-400" },
    { icon: <FaHeadset className="text-2xl" />, value: "24/7", label: "Support", color: "text-purple-400" }
  ];

  const quickLinks = [
    { name: "Home", icon: <IoIosRocket className="text-lg" /> },
    { name: "Browse Cars", icon: <FaCar className="text-lg" /> },
    { name: "Hot Deals", icon: <FaStar className="text-lg" /> },
    { name: "Locations", icon: <FaMapMarkerAlt className="text-lg" /> },
    { name: "Reviews", icon: <FaStar className="text-lg" /> },
    { name: "Contact", icon: <FaPhone className="text-lg" /> }
  ];

  const services = [
    "Airport Pickup",
    "Luxury Car Rental",
    "Long Term Lease",
    "Corporate Fleet",
    "One-Way Rental",
    "Roadside Assistance"
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", color: "hover:bg-blue-600" },
    { icon: <FaTwitter />, label: "Twitter", color: "hover:bg-sky-500" },
    { icon: <FaInstagram />, label: "Instagram", color: "hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500" },
    { icon: <FaYoutube />, label: "YouTube", color: "hover:bg-red-600" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", color: "hover:bg-blue-700" }
  ];

  const paymentMethods = [
    { icon: <FaCcVisa className="text-xl" />, name: "Visa" },
    { icon: <FaCcMastercard className="text-xl" />, name: "Mastercard" },
    { icon: <FaCcAmex className="text-xl" />, name: "Amex" },
    { icon: <FaPaypal className="text-xl" />, name: "PayPal" },
    { icon: <FaGoogleWallet className="text-xl" />, name: "Google Pay" }
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-spin-reverse-slow"></div>
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Top Stats Section */}
      <div className="relative bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`p-3 rounded-lg ${stat.color.replace('text-', 'bg-')}/20 group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(stat.icon, { className: `text-xl ${stat.color}` })}
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color} ${hoveredIndex === index ? 'animate-bounce' : ''}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl group hover:rotate-180 transition-transform duration-700">
                  <FaCar className="text-2xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Drive<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Ease</span>
                </h2>
                <p className="text-sm text-cyan-300 flex items-center gap-1">
                  <FaShieldAlt /> Premium Car Rentals
                </p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Experience luxury on wheels with our premium fleet. Your journey, our priority. 
              Reliable, safe, and comfortable rides since 2010.
            </p>
            
            {/* Trust Features */}
            <div className="space-y-3">
              {[
                { icon: <FaCheckCircle className="text-green-400" />, text: "Free Cancellation" },
                { icon: <FaCheckCircle className="text-green-400" />, text: "24/7 Roadside Assist" },
                { icon: <FaCheckCircle className="text-green-400" />, text: "Price Match Guarantee" },
                { icon: <FaCheckCircle className="text-green-400" />, text: "Insured Vehicles" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  {feature.icon}
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <FaRegCalendarAlt /> Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="text-cyan-400 group-hover:scale-125 transition-transform">
                      {link.icon}
                    </span>
                    <span className="text-gray-400 group-hover:text-white transition-colors flex-1">
                      {link.name}
                    </span>
                    <FaArrowRight className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all text-cyan-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <IoIosCar /> Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {service}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
                <FaHeadset /> Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/40 transition-colors">
                    <FaPhone className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call us 24/7</p>
                    <p className="text-white font-semibold group-hover:text-cyan-300 transition-colors">
                      +1 (800) DRIVE-NOW
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center group-hover:bg-green-600/40 transition-colors">
                    <FaEnvelope className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email us at</p>
                    <p className="text-white font-semibold group-hover:text-green-300 transition-colors">
                      support@driveease.com
                    </p>
                  </div>
                </div>

                {/* Live Clock */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-800">
                  <div className="flex items-center justify-center gap-3">
                    <FaClock className="text-cyan-400 animate-pulse" />
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Current Time</p>
                      <div className="text-xl font-mono font-bold text-white">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pl-10 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition-all"
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <button className="group relative w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/25">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Subscribe
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Payment Section */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
            
            {/* Social Media */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400">Connect with us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-12 h-12 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 ${social.color} transition-all duration-300 hover:scale-110 group`}
                    title={social.label}
                  >
                    {React.cloneElement(social.icon, { className: "text-xl group-hover:text-white" })}
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-3">
                <FaCreditCard className="text-gray-400" />
                <span className="text-gray-400">Secure Payments:</span>
              </div>
              <div className="flex gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    {method.icon}
                    <span className="text-sm text-gray-300">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Apps */}
            <div className="flex gap-4">
              <button className="flex items-center gap-3 px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-800 transition-all duration-300 hover:scale-105 group">
                <FaGooglePlay className="text-2xl text-green-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-800 transition-all duration-300 hover:scale-105 group">
                <FaApple className="text-2xl text-gray-300 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} DriveEase Car Rentals. All rights reserved.
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Premium car rental service across 50+ cities worldwide
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "FAQ", "Careers", "Contact"].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center gap-1"
                  >
                    {item}
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 15s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;