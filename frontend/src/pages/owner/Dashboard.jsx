import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { 
  TrendingUp, 
  TrendingDown, 
  Car, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  ChevronRight,
  MoreVertical,
  Eye,
  Download,
  Filter,
  Sparkles,
  Zap,
  Target
} from 'lucide-react'

const Dashboard = () => {
  const {axios, isOwner} = useAppContext()
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    { 
      title: "Total Cars", 
      value: data.totalCars, 
      icon: <Car className="w-5 h-5" />,
      gradient: "from-cyan-500 via-sky-500 to-blue-500",
      hoverGradient: "from-cyan-400 via-sky-400 to-blue-400",
      // Animated background for Total Cars
      bgColor: "bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-sky-500/20 backdrop-blur-sm bg-[length:200%_auto] animate-gradient-x",
      trend: { value: "+12%", up: true },
      description: "Available in fleet",
      animation: "animate-gradient-x bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-[length:200%_auto]",
      iconBg: "bg-gradient-to-br from-cyan-100/80 to-blue-100/80"
    },
    { 
      title: "Total Bookings", 
      value: data.totalBookings, 
      icon: <Calendar className="w-5 h-5" />,
      gradient: "from-emerald-500 via-teal-500 to-green-500",
      hoverGradient: "from-emerald-400 via-teal-400 to-green-400",
      bgColor: "bg-gradient-to-br from-emerald-100/80 to-green-100/80 backdrop-blur-sm",
      trend: { value: "+8%", up: true },
      description: "All time bookings",
      animation: "animate-gradient-x bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 bg-[length:200%_auto]",
      iconBg: "bg-gradient-to-br from-emerald-100/80 to-green-100/80"
    },
    { 
      title: "Pending Bookings", 
      value: data.pendingBookings, 
      icon: <Clock className="w-5 h-5" />,
      gradient: "from-amber-500 via-orange-500 to-yellow-500",
      hoverGradient: "from-amber-400 via-orange-400 to-yellow-400",
      // Animated background for Pending Bookings
      bgColor: "bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-sm bg-[length:200%_auto] animate-gradient-x",
      trend: { value: "+5%", up: true },
      description: "Awaiting confirmation",
      animation: "animate-gradient-x bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-[length:200%_auto]",
      iconBg: "bg-gradient-to-br from-amber-100/80 to-yellow-100/80"
    },
    { 
      title: "Completed Bookings", 
      value: data.completedBookings, 
      icon: <CheckCircle className="w-5 h-5" />,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      hoverGradient: "from-violet-400 via-purple-400 to-fuchsia-400",
      bgColor: "bg-gradient-to-br from-violet-100/80 to-fuchsia-100/80 backdrop-blur-sm",
      trend: { value: "+15%", up: true },
      description: "Successfully delivered",
      animation: "animate-gradient-x bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-[length:200%_auto]",
      iconBg: "bg-gradient-to-br from-violet-100/80 to-fuchsia-100/80"
    },
  ]

  const fetchDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/owner/dashboard')
      if(data.success){
        setData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    if(isOwner){
      fetchDashboardData()
    }
    setData(dummyDashboardData)
  }, [])

  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': 
        return { 
          bg: 'bg-gradient-to-r from-amber-500/10 to-orange-500/10', 
          text: 'text-amber-700', 
          border: 'border-amber-200/50',
          icon: <Clock className="w-3 h-3" />,
          glow: 'shadow-amber-200/30'
        };
      case 'confirmed': 
        return { 
          bg: 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10', 
          text: 'text-emerald-700', 
          border: 'border-emerald-200/50',
          icon: <CheckCircle className="w-3 h-3" />,
          glow: 'shadow-emerald-200/30'
        };
      case 'completed': 
        return { 
          bg: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10', 
          text: 'text-blue-700', 
          border: 'border-blue-200/50',
          icon: <CheckCircle className="w-3 h-3" />,
          glow: 'shadow-blue-200/30'
        };
      case 'cancelled': 
        return { 
          bg: 'bg-gradient-to-r from-rose-500/10 to-pink-500/10', 
          text: 'text-rose-700', 
          border: 'border-rose-200/50',
          icon: <AlertCircle className="w-3 h-3" />,
          glow: 'shadow-rose-200/30'
        };
      default: 
        return { 
          bg: 'bg-gradient-to-r from-gray-500/10 to-gray-500/10', 
          text: 'text-gray-700', 
          border: 'border-gray-200/50',
          icon: <Clock className="w-3 h-3" />,
          glow: 'shadow-gray-200/30'
        };
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="p-2.5 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-xl shadow-xl animate-gradient-x bg-[length:200%_auto]">
                    <BarChart3 className="w-6 h-6 text-white relative z-10" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-xl blur-lg opacity-50"></div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 bg-clip-text text-transparent">
                    Dashboard Overview
                  </h1>
                  <p className="text-slate-600 mt-2 text-lg max-w-2xl">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Monitor your rental business with real-time insights
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 shadow-lg">
                <div className="relative">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping absolute"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Last updated</p>
                  <p className="text-slate-900 font-semibold">Live</p>
                </div>
              </div>
              
              <button className="group flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Download className="w-4 h-4 relative z-10" />
                <span className="relative z-10 font-medium">Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid - UPDATED WITH ANIMATED BACKGROUNDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <div 
              key={index} 
              className="group relative rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Main animated background for the entire card */}
              <div className={`absolute inset-0 ${card.bgColor}`}></div>
              
              {/* Animated gradient border on hover */}
              <div className={`absolute inset-0 rounded-2xl p-[1px] ${card.animation} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Background glow effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r ${card.gradient} blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-xl ${card.iconBg} shadow-inner backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {card.trend.up ? 
                      <TrendingUp className="w-4 h-4 text-emerald-500" /> : 
                      <TrendingDown className="w-4 h-4 text-rose-500" />
                    }
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm ${
                      card.trend.up 
                        ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 border border-emerald-200/50' 
                        : 'bg-gradient-to-r from-rose-500/10 to-pink-500/10 text-rose-600 border border-rose-200/50'
                    }`}>
                      {card.trend.value}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-800 mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-slate-900 mb-2">{card.value}</p>
                    <p className="text-xs text-slate-700">{card.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-700">
                      <span>Progress</span>
                      <span className="font-medium">{Math.min((card.value / 50) * 100, 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                      <div 
                        className={`h-2 rounded-full ${card.animation} transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min((card.value / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Bookings Section */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-white/20 bg-gradient-to-r from-white/50 to-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="p-2.5 bg-gradient-to-br from-cyan-100/80 to-blue-100/80 rounded-lg backdrop-blur-sm">
                      <Calendar className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg blur-sm"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Recent Bookings</h2>
                    <p className="text-slate-600 text-sm mt-1">Latest customer reservations and activities</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white/50 hover:bg-white backdrop-blur-sm rounded-lg border border-white/30 hover:border-cyan-200/50 transition-all duration-300">
                    <Filter className="w-4 h-4 group-hover:text-cyan-600 transition-colors" />
                    Filter
                  </button>
                  <button className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50/50 backdrop-blur-sm rounded-lg border border-cyan-200/30 hover:border-cyan-300/50 transition-all duration-300">
                    View all
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-white/20">
              {data.recentBookings.map((booking, index) => {
                const statusConfig = getStatusConfig(booking.status)
                return (
                  <div 
                    key={index} 
                    className="p-6 hover:bg-gradient-to-r from-white/50 to-cyan-50/30 transition-all duration-200 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start lg:items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-100/80 to-blue-100/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Car className="w-6 h-6 text-cyan-600" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-slate-700">{index + 1}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-semibold text-slate-900 text-lg group-hover:text-cyan-900 transition-colors">
                              {booking.car.brand} {booking.car.model}
                            </p>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text} ${statusConfig.glow} shadow-sm`}>
                              {statusConfig.icon}
                              {booking.status}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{booking.customerName || 'Customer'}</span>
                            </div>
                            <div className="w-1 h-1 bg-gradient-to-r from-cyan-400/50 to-blue-400/50 rounded-full"></div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(booking.createdAt)}</span>
                            </div>
                            <div className="w-1 h-1 bg-gradient-to-r from-cyan-400/50 to-blue-400/50 rounded-full"></div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              <span className="font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                {formatCurrency(booking.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50/50 backdrop-blur-sm rounded-lg border border-cyan-200/30 hover:border-cyan-300/50 transition-all duration-300">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50/30 backdrop-blur-sm rounded-lg border border-slate-200/30 hover:border-cyan-200/50 transition-all duration-300">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {data.recentBookings.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex flex-col items-center max-w-sm">
                  <div className="p-4 bg-gradient-to-br from-cyan-100/50 to-blue-100/50 rounded-2xl mb-4 backdrop-blur-sm">
                    <Calendar className="w-12 h-12 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No recent bookings</h3>
                  <p className="text-slate-600">New bookings will appear here as they come in</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Revenue & Stats */}
          <div className="space-y-8">
            {/* Monthly Revenue Card */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 animate-gradient-x bg-[length:200%_auto]"></div>
              
              {/* Floating particles */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-white">Monthly Revenue</h2>
                    <p className="text-cyan-100/70 text-sm">Current month earnings & growth</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm border border-cyan-500/30">
                    <DollarSign className="w-6 h-6 text-cyan-300" />
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-end justify-between mb-4">
                    <p className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                      {formatCurrency(data.monthlyRevenue)}
                    </p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-300" />
                      <span className="text-sm font-semibold text-emerald-300">+12.5%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-100/70">vs last month</span>
                    <span className="font-medium text-emerald-300">
                      {data.monthlyRevenue > 0 && data.totalBookings > 0 
                        ? formatCurrency(data.monthlyRevenue * 0.125)
                        : formatCurrency(0)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-white/5 to-cyan-500/5 rounded-xl backdrop-blur-sm border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg">
                        <DollarSign className="w-4 h-4 text-emerald-300" />
                      </div>
                      <div>
                        <p className="text-sm text-cyan-100/70">Average per booking</p>
                        <p className="font-semibold text-white">
                          {data.monthlyRevenue > 0 && data.totalBookings > 0 
                            ? formatCurrency(data.monthlyRevenue / data.totalBookings)
                            : formatCurrency(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-white/5 to-blue-500/5 rounded-xl backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm text-cyan-100/70">Bookings completed</p>
                        <p className="font-semibold text-white">{data.completedBookings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="p-2.5 bg-gradient-to-br from-indigo-100/80 to-purple-100/80 rounded-lg backdrop-blur-sm">
                      <Target className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg">Performance Metrics</h3>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-2 py-1 rounded-full border border-emerald-200/50 backdrop-blur-sm">
                  <Zap className="w-3 h-3 inline mr-1" />
                  Real-time
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="group p-4 bg-gradient-to-r from-white/50 to-emerald-50/30 hover:to-emerald-50/50 rounded-xl border border-white/30 hover:border-emerald-200/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Conversion Rate</span>
                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">68.2%</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-slate-200/50 to-slate-100/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                    <div 
                      className="h-2 rounded-full animate-gradient-x bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-[length:200%_auto] transition-all duration-700"
                      style={{ width: '68.2%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="group p-4 bg-gradient-to-r from-white/50 to-blue-50/30 hover:to-blue-50/50 rounded-xl border border-white/30 hover:border-blue-200/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Avg. Response Time</span>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">2.4h</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-slate-200/50 to-slate-100/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                    <div 
                      className="h-2 rounded-full animate-gradient-x bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-[length:200%_auto] transition-all duration-700"
                      style={{ width: '40%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="group p-4 bg-gradient-to-r from-white/50 to-purple-50/30 hover:to-purple-50/50 rounded-xl border border-white/30 hover:border-purple-200/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Customer Satisfaction</span>
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">94%</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-slate-200/50 to-slate-100/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                    <div 
                      className="h-2 rounded-full animate-gradient-x bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-[length:200%_auto] transition-all duration-700"
                      style={{ width: '94%' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">Overall Performance</p>
                  <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                    Excellent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-slate-500">
              <p>© {new Date().getFullYear()} Car Rental Dashboard. All rights reserved.</p>
              <p className="mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></span>
                Data updates in real-time. Last sync: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium hover:underline">
                Privacy Policy
              </button>
              <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium hover:underline">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default Dashboard