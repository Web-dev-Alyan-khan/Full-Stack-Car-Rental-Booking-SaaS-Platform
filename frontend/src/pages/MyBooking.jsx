import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBooking = () => {

  const {axios,user} = useAppContext()

  const [booking, setBooking] = useState([]);

  const fetchBookings = async () => {
   try {
    const {data} = await axios.get('/api/bookings/user')
    if(data.success){
      setBooking(data.bookings)
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
    console.log(error.message)
   }
  };

  useEffect(() => {
   user &&  fetchBookings();
  }, [user]);

  return (
    <div className="relative w-full flex justify-center min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 animate-gradient-slow"></div>
      
      {/* Animated Road-like lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 w-full h-1 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent animate-road-line"></div>
        <div className="absolute top-2/3 w-full h-1 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent animate-road-line delay-1000"></div>
        
        {/* Floating car silhouettes */}
        <div className="absolute top-1/4 left-10 w-20 h-10 opacity-5 animate-float-car">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg"></div>
        </div>
        <div className="absolute bottom-1/4 right-10 w-24 h-12 opacity-5 animate-float-car delay-2000">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg"></div>
        </div>
      </div>

      {/* Add these styles to your global CSS (tailwind.config.js or index.css) */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes roadLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes floatCar {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(10px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .animate-road-line {
          animation: roadLine 8s linear infinite;
        }
        .animate-float-car {
          animation: floatCar 20s ease-in-out infinite;
        }
      `}</style>

      {/* Content Container */}
      <div className="relative w-[70%] py-24 z-10">
        <Title
          title="My Bookings"
          subTitle="View and manage all your car reservations"
          align="left"
        />

        <div className="mt-10 flex flex-col gap-6">
          {booking.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-start gap-6 bg-white/90 backdrop-blur-sm border border-gray-200/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.005]"
            >
              {/* Car Image with hover effect */}
              <div className="relative overflow-hidden w-full md:w-64 h-44 rounded-xl group">
                <img
                  src={item.car.image}
                  alt={`${item.car.brand} ${item.car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Right Content */}
              <div className="flex-1">
                {/* Title */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {item.car.brand} {item.car.model}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.car.year} • {item.car.category} • {item.car.location}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      item.status === "confirmed"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                        : "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Divider with gradient */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-5"></div>

                {/* Booking Details */}
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  
                  {/* Rental Period */}
                  <div className="flex items-start gap-3 group">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg group-hover:scale-110 transition-transform">
                      <img src={assets.calendar_icon_colored} className="w-6" />
                    </div>
                    <div>
                      <p className="text-gray-500">Rental Period</p>
                      <p className="font-semibold text-gray-800">
                        {item.pickupDate.split("T")[0]} →{" "}
                        {item.returnDate.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 group">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg group-hover:scale-110 transition-transform">
                      <img src={assets.location_icon_colored} className="w-6" />
                    </div>
                    <div>
                      <p className="text-gray-500">Pick-up Location</p>
                      <p className="font-semibold text-gray-800">{item.car.location}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-3 group">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg group-hover:scale-110 transition-transform">
                      <img src={assets.money_icon_colored} className="w-6" />
                    </div>
                    <div>
                      <p className="text-gray-500">Total Price</p>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        ${item.price}
                      </h1>
                      <p className="text-xs text-gray-500">
                        Booked on {item.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      
    </div>
    
  );
};

export default MyBooking;