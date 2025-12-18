import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
//mport { assets } from '../../assets/assets'

const AddCar = () => {

  const {axios} = useAppContext()
  const [image, setImage] = useState(null)
const [car, setCar] = useState({

  brand: '',
  model: '',
  year: '',
  pricePerDay: '',
  category: '',
  transmission: '', 
  fuel_type: '',
  seating_capacity: '',
  location: '',
  description: ''


});


  const [isLoading,setIsLoading] = useState(false)

  const onsubmitHandle = async (e) => {
       e.preventDefault()
       if(isLoading) return null

       setIsLoading(false)
       try {
        const formData = new FormData()
        formData.append('image',image)
        formData.append('carData',JSON.stringify(car))

        const {data} = await axios.post('/api/owner/add-car',formData)

        if(data.success){
          toast.success(data.message)
          setImage(null)

          setCar({
             brand : '',
             model : '',
              year : '',
               pricePerDay : '',
              category : '',
            transmission: '',
             fuel_type : '',
              seating_capacity: '',
             location : '',
            description: ''
          })
        }else{
          toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message)
        console.log(error.message);
       }finally{
        setIsLoading(false)
       }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            ADD NEW CAR
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Complete the form below to list your vehicle in our premium fleet. All fields are required for optimal listing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Form - 3/4 width */}
          <div className="lg:col-span-3">
            <form onSubmit={onsubmitHandle} className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              
              {/* Form Header */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-b border-white/10 px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Vehicle Details</h2>
                    <p className="text-cyan-200">Fill all sections carefully</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                
                {/* IMAGE UPLOAD - FULL WIDTH */}
                <div className="flex flex-col items-center">
                  <label htmlFor="car-image" className="cursor-pointer group">
                    <div className="w-64 h-64 border-4 border-dashed border-cyan-400/50 rounded-3xl flex items-center justify-center bg-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-400 transition-all duration-500 overflow-hidden">
                      {image ? (
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt="Car preview"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center p-8">
                          <div className="w-20 h-20 mx-auto mb-4 bg-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                            <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="font-bold text-white text-lg">Upload Car Image</p>
                          <p className="text-cyan-200 text-sm mt-2">Drag & drop or click to upload</p>
                        </div>
                      )}
                    </div>
                  </label>
                  <input 
                    type="file" 
                    id="car-image" 
                    accept='image/*' 
                    hidden 
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* GRID FORM - 2 COLUMNS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Brand with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      <span>Brand</span>
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 font-medium text-white"
                      placeholder='BMW • Mercedes • Audi'
                      required
                      value={car.brand}
                      onChange={e => setCar({...car, brand: e.target.value})}
                    />
                  </div>

                  {/* Model with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Model</span>
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 font-medium text-white"
                      placeholder='X5 • E-Class • A4'
                      required
                      value={car.model}
                      onChange={e => setCar({...car, model: e.target.value})}
                    />
                  </div>

                  {/* Year with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Year</span>
                    </label>
                    <input 
                      type="number"
                      className="w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 font-medium text-white"
                      placeholder='2024'
                      required
                      value={car.year}
                      onChange={e => setCar({...car, year: e.target.value})}
                    />
                  </div>

                  {/* Daily Price with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>Daily Price ($)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 font-bold">$</span>
                      <input 
                        type="number"
                        className="w-full pl-10 pr-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 font-medium text-white"
                        placeholder='150'
                        required
                        value={car.pricePerDay}
                        onChange={e => setCar({...car, pricePerDay: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Category with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span>Category</span>
                    </label>
                    <select 
                      className="w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 appearance-none font-medium text-white"
                      value={car.category}
                      onChange={e=>setCar({...car, category: e.target.value})}
                    >
                      <option value="" className="bg-gray-800">Select Category</option>
                      <option value="Sedan" className="bg-gray-800">Sedan</option>
                      <option value="SUV" className="bg-gray-800">SUV</option>
                      <option value="Van" className="bg-gray-800">Van</option>
                      <option value="Coupe" className="bg-gray-800">Coupe</option>
                    </select>
                  </div>

                  {/* Transmission with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                      <span>Transmission</span>
                    </label>
                 <select 
                 className='w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 appearance-none font-medium '
  value={car.transmission}  // correct
  onChange={e => setCar({...car, transmission: e.target.value})}  // correct
>
  <option value="">Select Transmission</option>
  <option value="Automatic">Automatic</option>
  <option value="Manual">Manual</option>
  <option value="Semi-Automatic">Semi-Automatic</option>
</select>


                  </div>

                  {/* Fuel Type with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                      <span>Fuel Type</span>
                    </label>
                    <select 
                      className="w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 appearance-none font-medium text-white"
                      value={car.fuel_type}
                      onChange={e=>setCar({...car, fuel_type: e.target.value})}
                    >
                      <option value="" className="bg-gray-800">Select Fuel Type</option>
                      <option value="Gas" className="bg-gray-800">Gasoline</option>
                      <option value="Diesel" className="bg-gray-800">Diesel</option>
                      <option value="Electric" className="bg-gray-800">Electric</option>
                      <option value="Hybrid" className="bg-gray-800">Hybrid</option>
                    </select>
                  </div>

                  {/* Seating Capacity with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      <span>Seating Capacity</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="number"
                        className="w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder-gray-400 font-medium text-white"
                        placeholder='5'
                        required
                        value={car.seating_capacity}
                        onChange={e=>setCar({...car, seating_capacity: e.target.value})}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 font-medium">seats</span>
                    </div>
                  </div>

                  {/* Location with Icon */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Location</span>
                    </label>
                    <select 
                      className="w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 appearance-none font-medium text-white"
                      value={car.location}
                      onChange={e=>setCar({...car, location: e.target.value})}
                    >
                      <option value="" className="bg-gray-800">Select Location</option>
                      <option value="New York" className="bg-gray-800">New York</option>
                      <option value="Los Angeles" className="bg-gray-800">Los Angeles</option>
                      <option value="Houston" className="bg-gray-800">Houston</option>
                      <option value="Chicago" className="bg-gray-800">Chicago</option>
                    </select>
                  </div>

                </div>

                {/* Description with Icon */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-cyan-300 uppercase tracking-wide flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span>Description</span>
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 resize-vertical placeholder-gray-400 font-medium text-white"
                    placeholder="Describe your car's features, condition, special amenities, and any important details for potential renters..."
                    value={car.description}
                    onChange={e=>setCar({...car, description: e.target.value})}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black text-lg py-4 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center space-x-3 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-1"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">{isLoading ? 'Listing...' :'LIST YOUR CAR NOW'}</span>
                  </button>
                </div>

              </div>
            </form>
          </div>

          {/* Company Stats Cards - 1/4 width */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Stats Card 1 */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl rounded-3xl border border-cyan-400/30 p-6 shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Premium Listing</h3>
                  <p className="text-cyan-200 text-sm">Featured Placement</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Your car will be featured in our premium section with maximum visibility</p>
            </div>

            {/* Stats Card 2 */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-3xl border border-purple-400/30 p-6 shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Earn More</h3>
                  <p className="text-purple-200 text-sm">$1,500+/month</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Top earners make over $1,500 monthly with our premium fleet</p>
            </div>

            {/* Stats Card 3 */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-xl rounded-3xl border border-green-400/30 p-6 shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-500/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">24/7 Support</h3>
                  <p className="text-green-200 text-sm">Always Available</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Round-the-clock customer support for all your listing needs</p>
            </div>

            {/* Stats Card 4 */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-xl rounded-3xl border border-orange-400/30 p-6 shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-orange-500/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Fast Approval</h3>
                  <p className="text-orange-200 text-sm">24-48 Hours</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Quick verification and approval process to get you started fast</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCar