import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

import { 
  Search, 
  Filter, 
  Car, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff, 
  Trash2,
  Edit,
  MoreVertical,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  Users,
  Fuel,
  Settings,
  Shield,
  Menu,
  X
} from 'lucide-react'

const ManageCars = () => {
  const { isOwner, axios } = useAppContext()

  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedCarId, setExpandedCarId] = useState(null)

  // Fetch cars owned by the logged-in owner
  const fetchOwnerCars = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/owner/cars')
      if (data.success) {
        setCars(data.cars || [])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message || 'Failed to load cars')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOwner) fetchOwnerCars()
  }, [])

  // Toggle car availability
  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message || 'Failed to update availability')
    }
  }

  // Delete a car
  const deleteCar = async (carId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to remove this car from your fleet?')
      if (!confirmDelete) return

      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message || 'Failed to delete car')
    }
  }

  // Filter cars by search term and status
  const filteredCars = cars.filter((car) => {
    const matchSearch = `${car.brand} ${car.model}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'available'
        ? car.isAvaliable
        : !car.isAvaliable

    return matchSearch && matchStatus
  })

  const availableCars = cars.filter(car => car.isAvaliable).length
  const rentedCars = cars.filter(car => !car.isAvaliable).length
  const totalRevenue = cars.reduce((acc, car) => acc + (car.pricePerDay || 0) * 30, 0) // Estimated monthly

  const toggleCarExpansion = (carId) => {
    setExpandedCarId(expandedCarId === carId ? null : carId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
            <div className="pt-2 lg:pt-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg">
                  <Car className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 bg-clip-text text-transparent">
                    Fleet Management
                  </h1>
                  <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-lg max-w-2xl">
                    Manage and monitor your rental vehicle fleet
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 transition-all duration-300 ${
              isMobileMenuOpen ? 'flex' : 'hidden lg:flex'
            }`}>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 shadow-lg">
                <div className="relative">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping absolute"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Last updated</p>
                  <p className="text-slate-900 font-semibold text-sm">Just now</p>
                </div>
              </div>
              
              <button 
                onClick={fetchOwnerCars}
                className="flex items-center justify-center gap-2 px-4 md:px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {[
            {
              title: "Total Vehicles",
              value: cars.length,
              icon: Car,
              color: "blue",
              gradient: "from-blue-500/5 via-cyan-500/5 to-blue-500/5",
              iconBg: "from-blue-100/80 to-cyan-100/80",
              iconColor: "text-blue-600",
              progressColor: "from-blue-400 via-cyan-400 to-blue-400",
              progressWidth: Math.min((cars.length / 20) * 100, 100)
            },
            {
              title: "Available",
              value: availableCars,
              icon: CheckCircle,
              color: "emerald",
              gradient: "from-emerald-500/5 via-teal-500/5 to-emerald-500/5",
              iconBg: "from-emerald-100/80 to-teal-100/80",
              iconColor: "text-emerald-600",
              progressColor: "from-emerald-400 via-teal-400 to-emerald-400",
              progressWidth: cars.length > 0 ? (availableCars / cars.length) * 100 : 0
            },
            {
              title: "Currently Rented",
              value: rentedCars,
              icon: Users,
              color: "amber",
              gradient: "from-amber-500/5 via-orange-500/5 to-amber-500/5",
              iconBg: "from-amber-100/80 to-orange-100/80",
              iconColor: "text-amber-600",
              progressColor: "from-amber-400 via-orange-400 to-amber-400",
              progressWidth: cars.length > 0 ? (rentedCars / cars.length) * 100 : 0
            },
            {
              title: "Monthly Revenue",
              value: `$${totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: "purple",
              gradient: "from-purple-500/5 via-violet-500/5 to-purple-500/5",
              iconBg: "from-purple-100/80 to-violet-100/80",
              iconColor: "text-purple-600",
              progressColor: "from-purple-400 via-violet-400 to-purple-400",
              progressWidth: Math.min((totalRevenue / 50000) * 100, 100)
            }
          ].map((stat, index) => (
            <div key={index} className="group relative bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className={`p-2.5 md:p-3.5 bg-gradient-to-br ${stat.iconBg} rounded-lg md:rounded-xl shadow-inner backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.iconColor}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                </div>
                
                <div>
                  <p className="text-xs md:text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <p className={`text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 ${
                    stat.color === 'emerald' ? 'text-emerald-600' : 
                    stat.color === 'amber' ? 'text-amber-600' : 
                    stat.color === 'purple' ? 'text-purple-600' : 'text-slate-900'
                  }`}>
                    {stat.value}
                  </p>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 md:h-2 overflow-hidden backdrop-blur-sm">
                    <div 
                      className="h-1.5 md:h-2 rounded-full animate-gradient-x bg-gradient-to-r bg-[length:200%_auto] transition-all duration-1000"
                      style={{ 
                        width: `${stat.progressWidth}%`,
                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        '--tw-gradient-from': `var(--${stat.color}-400)`,
                        '--tw-gradient-to': `var(--${stat.color}-400)`,
                        '--tw-gradient-stops': `var(--tw-gradient-from), var(--${stat.color}-400), var(--tw-gradient-to)`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg md:shadow-xl mb-6 md:mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search cars by brand, model..."
                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3.5 bg-white/50 border border-white/30 rounded-lg md:rounded-xl focus:ring-2 md:focus:ring-3 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all backdrop-blur-sm text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 md:gap-3 bg-white/50 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border border-white/30 flex-1 min-w-[150px]">
                <Filter className="w-3 h-3 md:w-4 md:h-4 text-slate-600" />
                <select
                  className="bg-transparent border-none focus:ring-0 text-slate-700 font-medium text-sm md:text-base w-full"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Vehicles</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Currently Rented</option>
                </select>
              </div>

              <button className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg md:rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl flex-1 min-w-[150px] text-sm md:text-base">
                <Settings className="w-3 h-3 md:w-4 md:h-4" />
                <span>Advanced Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cars Grid/Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/20 shadow-lg md:shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-8 md:p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-cyan-500"></div>
              <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-600 font-medium">Loading your fleet...</p>
            </div>
          ) : (
            <>
              <div className="p-4 md:p-6 border-b border-white/20 bg-gradient-to-r from-white/50 to-transparent">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 md:p-2.5 bg-gradient-to-br from-cyan-100/80 to-blue-100/80 rounded-lg">
                      <Car className="w-4 h-4 md:w-5 md:h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-slate-900">Vehicle Fleet</h2>
                      <p className="text-slate-600 text-xs md:text-sm mt-1">
                        Showing {filteredCars.length} of {cars.length} vehicles
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50/50 rounded-lg border border-cyan-200/30 transition-all w-full sm:w-auto">
                    <span>Add New Vehicle</span>
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              {/* Mobile View - Cards */}
              <div className="lg:hidden">
                {filteredCars.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex flex-col items-center max-w-sm">
                      <div className="p-3 bg-gradient-to-br from-cyan-100/50 to-blue-100/50 rounded-xl mb-3">
                        <AlertCircle className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 mb-2">No vehicles found</h3>
                      <p className="text-sm text-slate-600 mb-4">Try adjusting your search or filters</p>
                      <button
                        onClick={() => {
                          setSearchTerm('')
                          setStatusFilter('all')
                        }}
                        className="px-4 py-2 text-sm font-medium text-cyan-600 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 p-4">
                    {filteredCars.map((car) => (
                      <div 
                        key={car._id} 
                        className="bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden group"
                      >
                        <div 
                          className="p-4 cursor-pointer"
                          onClick={() => toggleCarExpansion(car._id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative flex-shrink-0">
                              <div className="w-16 h-12 md:w-20 md:h-14 bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg overflow-hidden border border-white/30">
                                <img 
                                  src={car.image} 
                                  alt={`${car.brand} ${car.model}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null
                                    e.target.style.display = 'none'
                                    e.target.parentElement.innerHTML = `
                                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                                        <Car class="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
                                      </div>
                                    `
                                  }}
                                />
                              </div>
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                                {car.category?.[0] || 'C'}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-bold text-slate-900 text-base truncate">
                                    {car.brand} {car.model}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-0.5">{car.year || 'N/A'}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-3 h-3 text-emerald-500" />
                                  <span className="text-base font-bold text-slate-900">${car.pricePerDay}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                <span className="px-1.5 py-0.5 text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded border border-slate-200/50">
                                  {car.fuelType || 'Petrol'}
                                </span>
                                <span className="px-1.5 py-0.5 text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded border border-slate-200/50">
                                  {car.transmission || 'Automatic'}
                                </span>
                                <span className="px-1.5 py-0.5 text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded border border-slate-200/50">
                                  {car.seating_capacity || 5} seats
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedCarId === car._id && (
                          <div className="px-4 pb-4 border-t border-white/20 pt-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-1.5">
                                  <Users className="w-3 h-3 text-slate-500" />
                                  <span className="text-xs text-slate-700">{car.seating_capacity || 5} seats</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Fuel className="w-3 h-3 text-slate-500" />
                                  <span className="text-xs text-slate-700">{car.fuelType || 'Petrol'}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="text-xs text-slate-500">
                                  Category
                                </div>
                                <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-700 rounded-full border border-cyan-200/50 text-xs">
                                  {car.category || 'Standard'}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border backdrop-blur-sm ${
                                car.isAvaliable 
                                  ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-200/50 text-emerald-700' 
                                  : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-200/50 text-amber-700'
                              }`}>
                                {car.isAvaliable ? (
                                  <>
                                    <CheckCircle className="w-3 h-3" />
                                    <span className="text-xs font-semibold">Available</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3 h-3" />
                                    <span className="text-xs font-semibold">Rented</span>
                                  </>
                                )}
                              </div>
                              <p className="text-xs text-slate-500">
                                Est. monthly: <span className="font-semibold">${(car.pricePerDay * 30).toLocaleString()}</span>
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleAvailability(car._id)}
                                  className={`p-2 rounded-lg border transition-all duration-300 ${
                                    car.isAvaliable
                                      ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-200/50 text-amber-600'
                                      : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-200/50 text-emerald-600'
                                  }`}
                                >
                                  {car.isAvaliable ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>

                                <button
                                  className="p-2 rounded-lg border border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => deleteCar(car._id)}
                                className="p-2 rounded-lg border border-rose-200/50 bg-gradient-to-r from-rose-500/10 to-pink-500/10 text-rose-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-white/20">
                    <tr>
                      <th className="px-6 xl:px-8 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Vehicle Details</th>
                      <th className="px-6 xl:px-8 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Specifications</th>
                      <th className="px-6 xl:px-8 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Price & Category</th>
                      <th className="px-6 xl:px-8 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 xl:px-8 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCars.map((car) => (
                      <tr key={car._id} className="border-b border-white/20 hover:bg-gradient-to-r from-white/50 to-cyan-50/30 transition-all duration-200 group">
                        {/* ... (keep existing desktop table body structure, just adjust padding) */}
                        <td className="px-6 xl:px-8 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-16 h-12 xl:w-20 xl:h-14 bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg xl:rounded-xl overflow-hidden border border-white/30 group-hover:scale-105 transition-transform duration-300">
                                <img 
                                  src={car.image} 
                                  alt={`${car.brand} ${car.model}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null
                                    e.target.style.display = 'none'
                                    e.target.parentElement.innerHTML = `
                                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                                        <Car class="w-6 h-6 text-slate-400" />
                                      </div>
                                    `
                                  }}
                                />
                              </div>
                              <div className="absolute -top-1 -right-1 xl:-top-2 xl:-right-2 w-5 h-5 xl:w-6 xl:h-6 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                                {car.category?.[0] || 'C'}
                              </div>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-base xl:text-lg group-hover:text-cyan-900 transition-colors">
                                {car.brand} {car.model}
                              </p>
                              <p className="text-xs xl:text-sm text-slate-500 mt-0.5">{car.year || 'N/A'}</p>
                              <div className="flex items-center gap-1.5 xl:gap-2 mt-2">
                                <span className="px-1.5 xl:px-2 py-0.5 xl:py-1 text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded border border-slate-200/50">
                                  {car.fuelType || 'Petrol'}
                                </span>
                                <span className="px-1.5 xl:px-2 py-0.5 xl:py-1 text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded border border-slate-200/50">
                                  {car.transmission || 'Automatic'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 xl:px-8 py-4">
                          <div className="space-y-2 xl:space-y-3">
                            <div className="flex items-center gap-1.5 xl:gap-2">
                              <Users className="w-3 h-3 xl:w-4 xl:h-4 text-slate-500" />
                              <span className="text-xs xl:text-sm text-slate-700">{car.seating_capacity || 5} seats</span>
                            </div>
                            <div className="flex items-center gap-1.5 xl:gap-2">
                              <Fuel className="w-3 h-3 xl:w-4 xl:h-4 text-slate-500" />
                              <span className="text-xs xl:text-sm text-slate-700">{car.fuelType || 'Petrol'}</span>
                            </div>
                            <div className="flex items-center gap-1.5 xl:gap-2">
                              <Shield className="w-3 h-3 xl:w-4 xl:h-4 text-slate-500" />
                              <span className="text-xs xl:text-sm text-slate-700">{car.transmission || 'Automatic'}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 xl:px-8 py-4">
                          <div className="space-y-1.5 xl:space-y-2">
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="w-3 h-3 xl:w-4 xl:h-4 text-emerald-500" />
                              <span className="text-lg xl:text-xl font-bold text-slate-900">${car.pricePerDay}</span>
                              <span className="text-xs xl:text-sm text-slate-500">/day</span>
                            </div>
                            <div className="inline-flex items-center px-2 xl:px-3 py-0.5 xl:py-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-700 rounded-full border border-cyan-200/50">
                              <span className="text-xs xl:text-sm font-medium">{car.category || 'Standard'}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 xl:mt-2">
                              Est. monthly: <span className="font-semibold">${(car.pricePerDay * 30).toLocaleString()}</span>
                            </p>
                          </div>
                        </td>

                        <td className="px-6 xl:px-8 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-3 xl:px-4 py-1.5 xl:py-2.5 rounded-lg xl:rounded-xl border backdrop-blur-sm ${
                            car.isAvaliable 
                              ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-200/50 text-emerald-700' 
                              : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-200/50 text-amber-700'
                          }`}>
                            {car.isAvaliable ? (
                              <>
                                <CheckCircle className="w-3 h-3 xl:w-4 xl:h-4" />
                                <span className="text-xs xl:text-sm font-semibold">Available</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 xl:w-4 xl:h-4" />
                                <span className="text-xs xl:text-sm font-semibold">Currently Rented</span>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1.5 xl:mt-2">
                            Last updated: Today
                          </p>
                        </td>

                        <td className="px-6 xl:px-8 py-4">
                          <div className="flex items-center gap-2 xl:gap-3">
                            <button
                              onClick={() => toggleAvailability(car._id)}
                              className={`p-2 xl:p-3 rounded-lg xl:rounded-xl border transition-all duration-300 ${
                                car.isAvaliable
                                  ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-200/50 text-amber-600 hover:bg-amber-500/20 hover:border-amber-300/50'
                                  : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-200/50 text-emerald-600 hover:bg-emerald-500/20 hover:border-emerald-300/50'
                              }`}
                              title={car.isAvaliable ? "Mark as Rented" : "Mark as Available"}
                            >
                              {car.isAvaliable ? <EyeOff className="w-4 h-4 xl:w-5 xl:h-5" /> : <Eye className="w-4 h-4 xl:w-5 xl:h-5" />}
                            </button>

                            <button
                              className="p-2 xl:p-3 rounded-lg xl:rounded-xl border border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 hover:bg-blue-500/20 hover:border-blue-300/50 transition-all duration-300"
                              title="Edit Vehicle"
                            >
                              <Edit className="w-4 h-4 xl:w-5 xl:h-5" />
                            </button>

                            <button
                              onClick={() => deleteCar(car._id)}
                              className="p-2 xl:p-3 rounded-lg xl:rounded-xl border border-rose-200/50 bg-gradient-to-r from-rose-500/10 to-pink-500/10 text-rose-600 hover:bg-rose-500/20 hover:border-rose-300/50 transition-all duration-300"
                              title="Delete Vehicle"
                            >
                              <Trash2 className="w-4 h-4 xl:w-5 xl:h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredCars.length === 0 && (
                  <div className="p-8 xl:p-12 text-center">
                    <div className="inline-flex flex-col items-center max-w-sm">
                      <div className="p-3 xl:p-4 bg-gradient-to-br from-cyan-100/50 to-blue-100/50 rounded-lg xl:rounded-2xl mb-3 xl:mb-4">
                        <AlertCircle className="w-8 h-8 xl:w-12 xl:h-12 text-cyan-400" />
                      </div>
                      <h3 className="text-base xl:text-lg font-semibold text-slate-900 mb-1.5 xl:mb-2">No vehicles found</h3>
                      <p className="text-sm text-slate-600 mb-3 xl:mb-4">Try adjusting your search or filters</p>
                      <button
                        onClick={() => {
                          setSearchTerm('')
                          setStatusFilter('all')
                        }}
                        className="px-4 xl:px-6 py-2 xl:py-3 text-sm font-medium text-cyan-600 bg-cyan-50 hover:bg-cyan-100 rounded-lg xl:rounded-xl transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
            <div className="text-xs md:text-sm text-slate-500">
              <p>© {new Date().getFullYear()} Fleet Management System. All rights reserved.</p>
              <p className="mt-0.5 md:mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></span>
                Real-time fleet monitoring • Last sync: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-xs md:text-sm text-slate-500">
                Need help? <button className="text-cyan-600 hover:text-cyan-700 font-medium">Contact Support</button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default ManageCars