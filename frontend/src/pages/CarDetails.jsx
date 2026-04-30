import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  const carImages = car
    ? [
        car.image,
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
      ]
    : [];

  useEffect(() => {
    const foundCar = cars.find((c) => c._id === id);
    setCar(foundCar);
  }, [cars, id]);

  useEffect(() => {
    if (pickupDate && returnDate && car) {
      const days = Math.ceil(
        (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(days > 0 ? days * car.pricePerDay : car.pricePerDay);
    } else {
      setTotalPrice(0);
    }
  }, [pickupDate, returnDate, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      toast.error("Please select both pickup and return dates");
      return;
    }

    setIsBooking(true);
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsBooking(false);
    }
  };

  const features = [
    { icon: "🎥", label: "360° Camera" },
    { icon: "🔗", label: "Bluetooth" },
    { icon: "📍", label: "GPS Navigation" },
    { icon: "🔥", label: "Heated Seats" },
    { icon: "📱", label: "Apple CarPlay" },
    { icon: "🔑", label: "Keyless Entry" },
    { icon: "🌡️", label: "Climate Control" },
    { icon: "🛡️", label: "Safety Package" }
  ];

  const specs = [
    { label: "Engine", value: car?.engine || "2.0L Turbo" },
    { label: "Horsepower", value: car?.horsepower || "250 HP" },
    { label: "0-60 mph", value: car?.acceleration || "6.2s" },
    { label: "Fuel Economy", value: car?.fuelEconomy || "28 MPG" },
    { label: "Luggage", value: car?.luggage || "2 Large Bags" },
    { label: "Color", value: car?.color || "Metallic Gray" }
  ];

  return car ? (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-10">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Cars
            </button>
            <div className="text-right">
              <h1 className="text-2xl font-bold">{car.brand} {car.model}</h1>
              <p className="text-blue-100">{car.category} • {car.year} • {car.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN — Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Image with Gallery */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-96 md:h-[500px] overflow-hidden group">
                <img
                  src={carImages[selectedImageIndex]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm">Starting at</span>
                  <div className="text-xl font-bold">${car.pricePerDay}<span className="text-sm font-normal">/day</span></div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4 grid grid-cols-4 gap-3">
                {carImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg h-24 transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-blue-500 ring-offset-2 transform scale-105' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">Technical Specifications</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specs.map((spec, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-sm text-gray-500">{spec.label}</div>
                    <div className="text-lg font-semibold text-gray-900">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">Premium Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="font-medium text-gray-800">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vehicle</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{car.description}</p>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "👥", label: "Seats", value: car.seating_capacity },
                  { icon: "⛽", label: "Fuel", value: car.fuel_type },
                  { icon: "⚙️", label: "Transmission", value: car.transmission },
                  { icon: "📍", label: "Location", value: car.location }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="font-semibold text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Booking Form */}
          <div className="space-y-6">
            {/* Booking Card */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Now</h2>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Daily Rate</div>
                  <div className="text-3xl font-bold text-blue-600">${car.pricePerDay}</div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pick-up Date & Time
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                  <div className="mt-2 text-sm text-gray-500">Select your preferred pick-up date</div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Return Date & Time
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split("T")[0]}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                  <div className="mt-2 text-sm text-gray-500">Select your return date</div>
                </div>
              </div>

              {/* Price Summary */}
              {totalPrice > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Daily Rate</span>
                    <span className="font-semibold">${car.pricePerDay} × {Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-2xl text-blue-600">${totalPrice}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">Inclusive of all taxes and insurance</div>
                </div>
              )}

              {/* Book Now Button */}
              <button
                type="submit"
                disabled={isBooking}
                className={`w-full mt-6 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isBooking 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl transform hover:-translate-y-0.5'
                } text-white shadow-lg`}
              >
                {isBooking ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Booking...
                  </div>
                ) : (
                  "Confirm Booking Now"
                )}
              </button>

              {/* Additional Info */}
              <div className="mt-6 space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free cancellation up to 24 hours
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Insurance included
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 Roadside Assistance
                </div>
              </div>
            </form>

            {/* Contact & Support Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Support: 1-800-RENT-CAR
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Live Chat Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default CarDetails;