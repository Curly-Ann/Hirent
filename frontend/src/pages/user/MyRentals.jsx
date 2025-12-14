import React, { useState, useEffect, useMemo } from 'react';
import { makeAPICall, ENDPOINTS } from '../../config/api';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import dayjs from 'dayjs';

const MyRentals = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        // Use the /me endpoint which is more secure and doesn't require passing a user ID.
        const response = await makeAPICall(ENDPOINTS.BOOKINGS.GET_MY, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.success) {
          setBookings(response.data || []);
          setError(null); // Clear previous errors on success
        } else {
          setError(response.message || 'Failed to fetch bookings.');
        }
      } catch (err) {
        setError('An error occurred while fetching bookings.');
      }
      setLoading(false);
    };

    fetchBookings();

    const interval = setInterval(fetchBookings, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [user]);

  const filteredBookings = useMemo(() => {
    if (activeTab === 'All') return bookings;
    return bookings.filter(b => b.status.toLowerCase() === activeTab.toLowerCase());
  }, [bookings, activeTab]);

  const summary = useMemo(() => {
    const completed = bookings.filter(b => b.status === 'completed');
    const approved = bookings.filter(b => b.status === 'approved');
    const pending = bookings.filter(b => b.status === 'pending');
    const cancelled = bookings.filter(b => b.status === 'cancelled');
    
    return {
      totalItems: bookings.length,
      approved: approved.length,
      pending: pending.length,
      cancelled: cancelled.length,
      completed: completed.length,
      subtotalCompleted: completed.reduce((sum, b) => sum + b.subtotal, 0),
      totalDiscounts: bookings.reduce((sum, b) => sum + (b.discount || 0), 0),
      totalSecurityDeposit: bookings.reduce((sum, b) => sum + (b.securityDeposit || 0), 0),
      totalExpense: completed.reduce((sum, b) => sum + b.totalAmount, 0),
    };
  }, [bookings]);

  if (loading) return <div className="text-center p-8">Loading your rentals...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  const tabs = ['All', 'Approved', 'Pending', 'Cancelled', 'Completed'];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Rentals</h1>
      
      {/* Summary Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold text-purple-600">{summary.approved}</p>
          <p className="text-gray-500 text-sm">Approved</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold text-yellow-600">{summary.pending}</p>
          <p className="text-gray-500 text-sm">Pending</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold text-red-600">{summary.cancelled}</p>
          <p className="text-gray-500 text-sm">Cancelled</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold text-blue-600">{summary.completed}</p>
          <p className="text-gray-500 text-sm">Completed</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold">₱{summary.totalExpense.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">Total Spent</p>
        </div>
      </div>

      {/* Contextual Message */}
      {summary.cancelled > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <span className="text-red-600 text-xl">⚠️</span>
          <div>
            <p className="text-red-800 font-semibold">Booking Cancelled</p>
            <p className="text-red-700 text-sm mt-1">
              {summary.cancelled} {summary.cancelled === 1 ? 'booking has' : 'bookings have'} been cancelled. Any refunds or deposit returns will follow the owner's cancellation policy. Check the Cancelled tab for details.
            </p>
          </div>
        </div>
      )}

      {summary.cancelled === 0 && summary.approved > 0 && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <span className="text-green-600 text-xl">✅</span>
          <div>
            <p className="text-green-800 font-semibold">All Set</p>
            <p className="text-green-700 text-sm mt-1">
              All your bookings are approved and ready. Check your email for rental details and owner contact information.
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex border-b">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}>
            {tab} ({tab === 'All' ? bookings.length : bookings.filter(b => b.status.toLowerCase() === tab.toLowerCase()).length})
          </button>
        ))}
      </div>

      {/* Cancelled Rentals Section (Only if there are cancelled bookings and not filtering by a specific tab) */}
      {summary.cancelled > 0 && activeTab === 'All' && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-red-700">Cancelled Rentals</h2>
          <div className="space-y-3">
            {bookings
              .filter(b => b.status === 'cancelled')
              .map(booking => (
                <div key={booking._id} className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center">
                  <img 
                    src={booking.itemId?.images?.[0] || 'https://via.placeholder.com/80'} 
                    alt={booking.itemId?.title} 
                    className="w-20 h-20 object-cover rounded-md mr-4"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{booking.itemId?.title}</h3>
                    <p className="text-sm text-gray-600">Owner: {booking.ownerId?.name}</p>
                    <p className="text-sm text-gray-500">Was scheduled: {dayjs(booking.startDate).format('MMM D')} - {dayjs(booking.endDate).format('MMM D, YYYY')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-red-700">₱{booking.totalAmount?.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">Cancelled on {dayjs(booking.updatedAt).format('MMM D, YYYY')}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <img 
                src={booking.itemId?.images?.[0] || 'https://via.placeholder.com/96'} 
                alt={booking.itemId?.title} 
                className="w-24 h-24 object-cover rounded-md mr-4"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/96'; }}
              />
              <div className="flex-grow">
                <h2 className="font-bold text-lg">{booking.itemId?.title}</h2>
                <p className="text-sm text-gray-500">{dayjs(booking.startDate).format('MMMM D, YYYY')} - {dayjs(booking.endDate).format('MMMM D, YYYY')} ({booking.rentalDuration} days)</p>
                <p className="text-sm">Owner: {booking.ownerId?.name}</p>
                <p className="text-sm">Booked on: {dayjs(booking.createdAt).format('MMMM D, YYYY')}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₱{booking.totalAmount?.toFixed(2)}</p>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${{
                  pending: 'bg-yellow-200 text-yellow-800',
                  approved: 'bg-green-200 text-green-800',
                  cancelled: 'bg-red-200 text-red-800',
                  completed: 'bg-blue-200 text-blue-800',
                }[booking.status?.toLowerCase()]}`}>
                  {booking.status}
                </span>
                <p className="text-sm capitalize mt-1">{booking.deliveryMethod}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-8">No bookings found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default MyRentals;
