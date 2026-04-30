import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { 
  ChevronLeft, 
  Zap, 
  Shield, 
  Activity, 
  Clock, 
  Navigation, 
  Calendar, 
  CreditCard 
} from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  const carImages = car ? [
    car.image,
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800",
  ] : [];

  useEffect(() => {
    const foundCar = cars.find((c) => c._id === id);
    setCar(foundCar);
  }, [cars, id]);

  useEffect(() => {
    if (pickupDate && returnDate && car) {
      const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
      setTotalPrice(days > 0 ? days * car.pricePerDay : car.pricePerDay);
    } else {
      setTotalPrice(0);
    }
  }, [pickupDate, returnDate, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      toast.error("Telemetry Error: Dates required");
      return;
    }
    setIsBooking(true);
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id, pickupDate, returnDate,
      });
      if (data.success) {
        toast.success("Reservation Synchronized");
        navigate("/my-bookings");
      }
    } catch (error) {
      toast.error("Transmission Failed");
    } finally {
      setIsBooking(false);
    }
  };

  const specs = [
    { label: "Engine", value: car?.engine || "V8 Biturbo", icon: <Activity size={14}/> },
    { label: "Horsepower", value: car?.horsepower || "540 HP", icon: <Zap size={14}/> },
    { label: "Top Speed", value: "205 MPH", icon: <Navigation size={14}/> },
  ];

  return car ? (
    <div className="min-h-screen bg-[#050505] text-white pt-20">
      {/* STEALTH HEADER */}
      <div className="border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors uppercase text-[10px] font-black tracking-[0.2em]">
            <ChevronLeft size={16} /> Back to Fleet
          </button>
          <div className="text-right">
            <h1 className="text-xl font-black italic tracking-tighter uppercase">{car.brand} <span className="text-cyan-500">{car.model}</span></h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{car.category} // {car.location}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: VISUAL INTEL */}
          <div className="lg:col-span-8 space-y-12">
            <div className="relative group overflow-hidden rounded-[40px] bg-zinc-900 border border-white/5 shadow-2xl">
              <img src={carImages[selectedImageIndex]} className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 flex gap-3">
                {carImages.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImageIndex(i)} className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${selectedImageIndex === i ? 'border-cyan-500 scale-110 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'border-transparent opacity-50'}`}>
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* SPECS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specs.map((spec, i) => (
                <div key={i} className="bg-[#0D0D0D] border border-white/5 p-6 rounded-[32px] hover:border-cyan-500/30 transition-all">
                  <div className="text-cyan-500 mb-4">{spec.icon}</div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-xl font-bold italic">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0D0D0D] border border-white/5 p-10 rounded-[40px]">
              <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-6">Mission Briefing</h3>
              <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">{car.description}</p>
            </div>
          </div>

          {/* RIGHT: DEPLOYMENT CONTROL */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-[#0D0D0D] border border-white/10 p-8 rounded-[40px] shadow-2xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Rate / 24H</p>
                  <h2 className="text-4xl font-black italic">${car.pricePerDay}</h2>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border border-emerald-500/20">
                  ● Status: Available
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input 
                      type="date" 
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-cyan-500 focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input 
                      type="date" 
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-cyan-500 focus:ring-0 transition-all"
                    />
                  </div>
                </div>

                {totalPrice > 0 && (
                  <div className="p-6 bg-cyan-500/5 rounded-3xl border border-cyan-500/10 space-y-3">
                    <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      <span>Service Duration</span>
                      <span className="text-white">x{totalPrice/car.pricePerDay} Days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.2em]">Total Payload</span>
                      <span className="text-2xl font-black italic">${totalPrice}</span>
                    </div>
                  </div>
                )}

                <button 
                  disabled={isBooking}
                  className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)] disabled:opacity-50"
                >
                  {isBooking ? "Syncing..." : "Confirm Deployment"}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <Shield size={14} className="text-cyan-500" /> Full Tactical Insurance
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <CreditCard size={14} className="text-cyan-500" /> Secure Encryption Active
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-black flex items-center justify-center"><Loading /></div>
  );
};

export default CarDetails;