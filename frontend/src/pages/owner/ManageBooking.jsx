import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Car, 
  User, 
  Trash2,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Phone,
  Mail,
  MapPin,
  Download
} from 'lucide-react';

const ManageBooking = () => {
  const { axios } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch bookings from backend
  const fetchOwnerBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/bookings/owner');
      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      toast.error(error.message || 'Error loading bookings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  // Update booking status or payment status
  const updateBooking = async (bookingId, newStatus, newPaymentStatus) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', {
        bookingId,
        status: newStatus,
        paymentStatus: newPaymentStatus,
      });

      if (data.success) {
        toast.success('Booking updated successfully');
        fetchOwnerBookings();
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating booking');
      console.error(error);
    }
  };

  // Delete booking
  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const { data } = await axios.delete(`/api/bookings/${bookingId}`);
      if (data.success) {
        toast.success('Booking deleted successfully');
        fetchOwnerBookings();
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch (error) {
      toast.error(error.message || 'Error deleting booking');
      console.error(error);
    }
  };

  // Filtered bookings based on search and filters
  const filteredBookings = bookings.filter((booking) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      booking.car?.brand?.toLowerCase().includes(searchTermLower) ||
      booking.car?.model?.toLowerCase().includes(searchTermLower) ||
      booking._id?.toLowerCase().includes(searchTermLower) ||
      booking.user?.name?.toLowerCase().includes(searchTermLower);

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Helper functions
  const getStatusConfig = (status) => {
    const statusValue = status || 'pending';
    switch (statusValue) {
      case 'confirmed':
        return { 
          bg: 'bg-emerald-50', 
          text: 'text-emerald-700', 
          border: 'border-emerald-200',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 'pending':
        return { 
          bg: 'bg-amber-50', 
          text: 'text-amber-700', 
          border: 'border-amber-200',
          icon: <Clock className="w-4 h-4" />
        };
      case 'cancelled':
        return { 
          bg: 'bg-red-50', 
          text: 'text-red-700', 
          border: 'border-red-200',
          icon: <XCircle className="w-4 h-4" />
        };
      case 'completed':
        return { 
          bg: 'bg-blue-50', 
          text: 'text-blue-700', 
          border: 'border-blue-200',
          icon: <CheckCircle className="w-4 h-4" />
        };
      default:
        return { 
          bg: 'bg-gray-50', 
          text: 'text-gray-700', 
          border: 'border-gray-200',
          icon: <Clock className="w-4 h-4" />
        };
    }
  };

  const getPaymentConfig = (status) => {
    const paymentValue = status || 'pending';
    switch (paymentValue) {
      case 'paid':
        return { 
          bg: 'bg-emerald-50', 
          text: 'text-emerald-700', 
          border: 'border-emerald-200',
          icon: '💰'
        };
      case 'pending':
        return { 
          bg: 'bg-amber-50', 
          text: 'text-amber-700', 
          border: 'border-amber-200',
          icon: '⏳'
        };
      case 'failed':
        return { 
          bg: 'bg-red-50', 
          text: 'text-red-700', 
          border: 'border-red-200',
          icon: '❌'
        };
      case 'refunded':
        return { 
          bg: 'bg-blue-50', 
          text: 'text-blue-700', 
          border: 'border-blue-200',
          icon: '↩️'
        };
      case 'partially_paid':
        return { 
          bg: 'bg-orange-50', 
          text: 'text-orange-700', 
          border: 'border-orange-200',
          icon: '💳'
        };
      default:
        return { 
          bg: 'bg-gray-50', 
          text: 'text-gray-700', 
          border: 'border-gray-200',
          icon: '📝'
        };
    }
  };

  const calculateDuration = (pickup, returnDate) => {
    if (!pickup || !returnDate) return 0;
    try {
      const diffTime = Math.abs(new Date(returnDate) - new Date(pickup));
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
      return 0;
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const totalRevenue = bookings.reduce((acc, b) => acc + (b.price || 0), 0);
  const confirmedBookings = bookings.filter((b) => (b.status || '') === 'confirmed').length;
  const pendingBookings = bookings.filter((b) => (b.status || '') === 'pending').length;
  const paidBookings = bookings.filter((b) => (b.paymentStatus || '') === 'paid').length;
  const avgRevenue = bookings.length > 0 ? (totalRevenue / bookings.length).toFixed(2) : 0;

  const toggleBookingExpand = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-2">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Booking Management</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and track all vehicle rental bookings</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchOwnerBookings}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex-1 sm:flex-none"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm lg:hidden"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Mobile Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm opacity-90">Total</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold mt-0.5 sm:mt-1">{bookings.length}</p>
            </div>
            <div className="p-1.5 sm:p-2 md:p-3 bg-white/20 rounded-full">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm opacity-90">Confirmed</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold mt-0.5 sm:mt-1">{confirmedBookings}</p>
            </div>
            <div className="p-1.5 sm:p-2 md:p-3 bg-white/20 rounded-full">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm opacity-90">Pending</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold mt-0.5 sm:mt-1">{pendingBookings}</p>
            </div>
            <div className="p-1.5 sm:p-2 md:p-3 bg-white/20 rounded-full">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm opacity-90">Paid</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold mt-0.5 sm:mt-1">{paidBookings}</p>
            </div>
            <div className="p-1.5 sm:p-2 md:p-3 bg-white/20 rounded-full">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm opacity-90">Revenue</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold mt-0.5 sm:mt-1">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-1.5 sm:p-2 md:p-3 bg-white/20 rounded-full">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 mb-4 md:mb-6">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search by car, booking ID, or customer..."
            className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters Section - Mobile Collapsible */}
      <div className={`bg-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 mb-4 md:mb-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-3 sm:px-4 py-2 rounded-lg flex-1">
            <Filter className="w-4 h-4 text-gray-600" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className="bg-transparent border-none focus:ring-0 text-gray-700 text-sm sm:text-base w-full"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 sm:px-4 py-2 rounded-lg flex-1">
            <DollarSign className="w-4 h-4 text-gray-600" />
            <select 
              value={paymentFilter} 
              onChange={(e) => setPaymentFilter(e.target.value)} 
              className="bg-transparent border-none focus:ring-0 text-gray-700 text-sm sm:text-base w-full"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
              <option value="partially_paid">Partial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Cards - Mobile View */}
      <div className="lg:hidden">
        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-3 text-gray-600">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
            <div className="inline-flex flex-col items-center">
              <div className="p-3 bg-gray-100 rounded-full mb-3 sm:mb-4">
                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-900">No bookings found</p>
              <p className="text-sm text-gray-600 mt-1">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredBookings.map((b) => {
              const duration = calculateDuration(b.pickupDate, b.returnDate);
              const statusConfig = getStatusConfig(b.status);
              const paymentConfig = getPaymentConfig(b.paymentStatus);
              
              return (
                <div key={b._id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div 
                    className="p-3 sm:p-4 cursor-pointer"
                    onClick={() => toggleBookingExpand(b._id)}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            {statusConfig.icon}
                            <span className="text-xs font-medium capitalize">
                              {b.status || 'pending'}
                            </span>
                          </div>
                          <div className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${paymentConfig.bg} ${paymentConfig.text} ${paymentConfig.border}`}>
                            <span className="text-xs">{paymentConfig.icon}</span>
                            <span className="text-xs font-medium capitalize">
                              {(b.paymentStatus || 'pending')?.replace('_', ' ') || 'pending'}
                            </span>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          #{b._id?.slice(-8)?.toUpperCase() || 'N/A'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">${b.price || 0}</p>
                          <p className="text-xs text-gray-500">{duration} day{duration !== 1 ? 's' : ''}</p>
                        </div>
                        {expandedBooking === b._id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Customer & Car Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {b.user?.name || 'Guest User'}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(b.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {b.car?.image ? (
                          <img 
                            src={b.car.image} 
                            alt={`${b.car?.brand || ''} ${b.car?.model || ''}`} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <Car className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {b.car?.brand || 'Unknown'} {b.car?.model || ''}
                        </p>
                        <p className="text-xs text-gray-600">
                          {b.car?.year || 'N/A'} • {b.car?.color || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedBooking === b._id && (
                    <div className="border-t border-gray-100 p-3 sm:p-4 space-y-3 sm:space-y-4">
                      {/* Rental Dates */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs font-medium">Pickup</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{formatDate(b.pickupDate)}</p>
                        </div>
                        <div className="bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs font-medium">Return</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{formatDate(b.returnDate)}</p>
                        </div>
                      </div>

                      {/* Status Controls */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={b.status || 'pending'}
                            onChange={(e) => updateBooking(b._id, e.target.value, null)}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Payment</label>
                          <select
                            value={b.paymentStatus || 'pending'}
                            onChange={(e) => updateBooking(b._id, null, e.target.value)}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="partially_paid">Partial</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => {
                            toast.success('View booking details');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex-1 min-w-[120px]"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => deleteBooking(b._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-1 min-w-[120px]"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Booking Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rental Period</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((b) => {
                  const duration = calculateDuration(b.pickupDate, b.returnDate);
                  const statusConfig = getStatusConfig(b.status);
                  const paymentConfig = getPaymentConfig(b.paymentStatus);
                  
                  return (
                    <tr key={b._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              #{b._id?.slice(-8)?.toUpperCase() || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              <User className="inline w-3 h-3 mr-1" />
                              {b.user?.name || 'Guest User'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(b.createdAt)}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            {b.car?.image ? (
                              <img 
                                src={b.car.image} 
                                alt={`${b.car?.brand || ''} ${b.car?.model || ''}`} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <Car className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {b.car?.brand || 'Unknown'} {b.car?.model || ''}
                            </p>
                            <p className="text-sm text-gray-600">
                              {b.car?.year || 'N/A'} • {b.car?.color || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2 text-gray-900">
                            <Calendar className="w-4 h-4" />
                            {formatDate(b.pickupDate)}
                          </div>
                          <div className="flex items-center gap-2 text-gray-900 mt-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(b.returnDate)}
                          </div>
                          <div className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                            {duration} day{duration !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <span className="font-bold text-lg text-gray-900">${b.price || 0}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          ${duration > 0 ? ((b.price || 0) / duration).toFixed(2) : 0}/day
                        </p>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                          {statusConfig.icon}
                          <span className="text-sm font-medium capitalize">
                            {b.status || 'pending'}
                          </span>
                        </div>
                        <select
                          value={b.status || 'pending'}
                          onChange={(e) => updateBooking(b._id, e.target.value, null)}
                          className="mt-2 w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${paymentConfig.bg} ${paymentConfig.text} ${paymentConfig.border}`}>
                          <span className="text-sm">{paymentConfig.icon}</span>
                          <span className="text-sm font-medium capitalize">
                            {(b.paymentStatus || 'pending')?.replace('_', ' ') || 'pending'}
                          </span>
                        </div>
                        <select
                          value={b.paymentStatus || 'pending'}
                          onChange={(e) => updateBooking(b._id, null, e.target.value)}
                          className="mt-2 w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="partially_paid">Partial</option>
                          <option value="failed">Failed</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => deleteBooking(b._id)}
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              toast.success('View booking details');
                            }}
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="inline-flex flex-col items-center">
                        <div className="p-3 bg-gray-100 rounded-full mb-4">
                          <AlertCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium text-gray-900">No bookings found</p>
                        <p className="text-gray-600 mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Summary */}
      <div className="mt-4 md:mt-6 text-center text-gray-600 text-xs sm:text-sm">
        Showing {filteredBookings.length} of {bookings.length} bookings
        {avgRevenue > 0 && (
          <span className="ml-2 sm:ml-4">
            • Average booking value: <span className="font-semibold">${avgRevenue}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ManageBooking;