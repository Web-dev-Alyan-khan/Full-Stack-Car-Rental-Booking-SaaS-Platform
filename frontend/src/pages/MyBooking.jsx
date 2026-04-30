import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Calendar, MapPin, CreditCard, ChevronRight, Clock, ShieldCheck } from "lucide-react";

const MyBooking = () => {
  const { axios, user } = useAppContext();
  const [booking, setBooking] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user');
      if (data.success) {
        setBooking(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Telemetry Error: Failed to load reservations");
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-hidden">
      {/* --- ELITE BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <Title
          title="RESERVATION LOG"
          subTitle="TRACK YOUR ACTIVE AND HISTORICAL FLEET DEPLOYMENTS"
          align="left"
        />

        <div className="mt-16 space-y-8">
          {booking.length > 0 ? (
            booking.map((item) => (
              <div
                key={item._id}
                className="group relative flex flex-col lg:flex-row items-center gap-8 bg-[#0D0D0D] border border-white/5 p-2 rounded-[32px] hover:border-cyan-500/30 transition-all duration-500 shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative w-full lg:w-80 h-56 rounded-[24px] overflow-hidden m-2">
                  <img
                    src={item.car.image}
                    alt={`${item.car.brand}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Status Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border ${
                      item.status === "confirmed" 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}>
                      ● {item.status}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 py-4 pr-8 pl-4 lg:pl-0 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                        {item.car.brand} <span className="text-cyan-500">{item.car.model}</span>
                      </h2>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.car.category}</span>
                        <span className="text-[10px] font-bold text-zinc-700">/</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.car.year}</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Total Payload</p>
                       <p className="text-2xl font-black text-white italic">${item.price}</p>
                    </div>
                  </div>

                  {/* HUD Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 group-hover:bg-white/10 transition-colors">
                      <Calendar className="text-cyan-500" size={18} />
                      <div>
                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Deployment</p>
                        <p className="text-xs font-bold text-zinc-200">{item.pickupDate.split("T")[0]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 group-hover:bg-white/10 transition-colors">
                      <Clock className="text-cyan-500" size={18} />
                      <div>
                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Return</p>
                        <p className="text-xs font-bold text-zinc-200">{item.returnDate.split("T")[0]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 group-hover:bg-white/10 transition-colors">
                      <MapPin className="text-cyan-500" size={18} />
                      <div>
                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Terminal</p>
                        <p className="text-xs font-bold text-zinc-200 uppercase">{item.car.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2">
                       <ShieldCheck size={14} className="text-emerald-500" />
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Verified Digital Contract</span>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 hover:text-white transition-colors">
                       Manage Intel <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-[40px]">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <CreditCard className="text-zinc-700" size={32} />
               </div>
               <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">No active deployments found in your history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;