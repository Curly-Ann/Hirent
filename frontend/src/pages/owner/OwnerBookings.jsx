// src/pages/owner/OwnerBookings.jsx
import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import OwnerSidebar from "../../components/layouts/OwnerSidebar";
import { makeAPICall, ENDPOINTS } from "../../config/api";
import dayjs from 'dayjs';
import { AuthContext } from "../../context/AuthContext";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ClockFading,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  X,
  Check,
  Package,
  TrendingUp,
  CalendarClock,
  Download,
  RefreshCw,
  Hash,
  Shield,
} from "lucide-react";

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showApprovalModal, setShowApprovalModal] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [rejectReasonCode, setRejectReasonCode] = useState("");
  const [rejectReasonText, setRejectReasonText] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Lock body scroll when reject modal opens
  useEffect(() => {
    if (showRejectModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [showRejectModal]);


  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await makeAPICall(ENDPOINTS.BOOKINGS.OWNER_BOOKINGS);
      if (response.success && Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    
    // Poll for booking updates every 5 seconds to catch cancellations
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredBookings = (() => {
    let filtered = [...bookings];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          (b.itemId?.title || "").toLowerCase().includes(q) ||
          (b.userId?.name || "").toLowerCase().includes(q) ||
          (b.itemId?.category || "").toLowerCase().includes(q) ||
          (b._id || "").toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (b) => b.status === statusFilter.toLowerCase()
      );
    }

    return filtered;
  })();

  const handleApprove = async (booking) => {
    try {
      await makeAPICall(ENDPOINTS.BOOKINGS.UPDATE_STATUS(booking._id), {
        method: "PUT",
        body: JSON.stringify({ status: "approved" }),
      });
      setShowApprovalModal(null);
      // Refetch immediately to ensure consistency
      await fetchBookings();
    } catch (err) {
      console.error("Error approving booking:", err);
      setError("Failed to approve booking");
    }
  };

  const handleReject = async (booking) => {
    try {
      const payload = {
        status: "rejected",
        reasonCode: rejectReasonCode,
      };
      if (rejectReasonCode === "other" && rejectReasonText.trim()) {
        payload.reasonText = rejectReasonText;
      }
      await makeAPICall(ENDPOINTS.BOOKINGS.UPDATE_STATUS(booking._id), {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setShowRejectModal(null);
      setRejectReasonCode("");
      setRejectReasonText("");
      // Refetch immediately to ensure consistency
      await fetchBookings();
    } catch (err) {
      console.error("Error rejecting booking:", err);
      setError("Failed to reject booking");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await makeAPICall(ENDPOINTS.BOOKINGS.OWNER_BOOKINGS(user._id));
      const data = response.success ? response.data : [];
      setBookings(Array.isArray(data) ? data : []);
      setSearchQuery("");
      setStatusFilter("All");
    } catch (err) {
      console.error("Error refreshing bookings:", err);
      setError("Failed to refresh bookings");
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: {
        label: "Pending",
        style: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      },
      approved: {
        label: "Approved",
        style: "bg-green-100 text-green-700",
        icon: CheckCircle2,
      },
      rejected: {
        label: "Rejected",
        style: "bg-red-100 text-red-700",
        icon: XCircle,
      },
      cancelled: {
        label: "Cancelled",
        style: "bg-gray-100 text-gray-700",
        icon: XCircle,
      },
      completed: {
        label: "Completed",
        style: "bg-blue-100 text-blue-700",
        icon: Check,
      },
    };
    const config = statusMap[status?.toLowerCase()] || statusMap.pending;
    const IconComponent = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.style}`}
      >
        <IconComponent className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar />

      <main className="flex-1 p-8 ml-60">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Bookings</h1>
            <p className="text-gray-500">
              View and manage all booking requests from renters
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#7A1CA9] text-white rounded-xl text-sm font-medium hover:bg-[#6a1894] transition">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-8 h-8 text-[#7A1CA9]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </p>
                <p className="text-xs text-gray-500">Total Bookings</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockFading className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.pending}
                </p>
                <p className="text-xs text-gray-500">Pending Approval</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BadgeCheck className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.approved}
                </p>
                <p className="text-xs text-gray-500">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.completed}
                </p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items, renters, product ID, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <div className="flex gap-2">
                {["All", "Pending", "Approved", "Completed", "Rejected", "Cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        statusFilter === status
                          ? "bg-[#7A1CA9] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                      {status !== "All" && (
                        <span className="ml-1">
                          (
                          {status === "Pending"
                            ? stats.pending
                            : status === "Approved"
                            ? stats.approved
                            : status === "Completed"
                            ? stats.completed
                            : status === "Rejected"
                            ? stats.rejected
                            : stats.cancelled}
                          )
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-2 px-5 text-[13px] font-medium text-gray-600">
                  Item
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Renter
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Duration
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Total
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-2 px-6 text-[13px] font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="text-gray-500">Loading bookings...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="text-red-500">{error}</p>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Package className="w-16 h-16 text-gray-300" />
                      <p className="text-gray-500 text-md">No bookings yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <React.Fragment key={booking._id}>
                    <tr
                      className={`hover:bg-gray-50 cursor-pointer transition ${
                        expandedRow === booking._id ? "bg-white" : ""
                      }`}
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === booking._id ? null : booking._id
                        )
                      }
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              booking.itemId?.images?.[0] ||
                              "https://via.placeholder.com/48"
                            }
                            alt={booking.itemId?.title || "Item"}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/48";
                            }}
                          />
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {booking.itemId?.title || "Unknown Item"}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              {booking._id?.substring(0, 8) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-[#7A1CA9]">
                              {(booking.userId?.name || "U").charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {booking.userId?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.userId?.email || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <ClockFading className="w-4 h-4 text-yellow-600" />
                            <p className="text-sm text-yellow-600">
                              {dayjs(booking.endDate).diff(dayjs(booking.startDate), 'day')} {dayjs(booking.endDate).diff(dayjs(booking.startDate), 'day') > 1 ? 'days' : 'day'}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-[13px] text-gray-500">
                              {formatDate(booking.startDate)} –{" "}
                              {formatDate(booking.endDate)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-800">
                          ₱{(booking.totalAmount || 0).toLocaleString()}
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        {getStatusBadge(booking.status)}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {booking.status === "pending" && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowApprovalModal(booking);
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                                title="Approve booking"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowRejectModal(booking);
                                }}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                title="Reject booking"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRow(
                                expandedRow === booking._id ? null : booking._id
                              );
                            }}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                            title="View details"
                          >
                            {expandedRow === booking._id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedRow === booking._id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-5 py-6">
                          <div className="grid grid-cols-3 gap-6">
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Package className="w-4 h-4 text-[#7A1CA9]" />
                                Product Information
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Hash className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Item ID:
                                  </span>
                                  <span className="text-gray-800 font-medium">
                                    {booking.itemId?._id?.substring(0, 8) ||
                                      "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Package className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Category:
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.itemId?.category || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Shield className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Security Deposit:
                                  </span>
                                  <span className="text-gray-800 font-semibold">
                                    ₱
                                    {(
                                      booking.securityDeposit || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">
                                    Daily Rate:
                                  </span>
                                  <span className="text-gray-800">
                                    ₱
                                    {(
                                      booking.itemId?.pricePerDay || 'N/A'
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <User className="w-4 h-4 text-[#7A1CA9]" />
                                Renter Information
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.userId?.email || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.userId?.phone || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.userId?.address || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-gray-600">
                                    {booking.userId?.rating || "N/A"} rating
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <CalendarClock className="w-4 h-4 text-[#7A1CA9]" />
                                Payment Summary
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Daily Rate
                                  </span>
                                  <span className="text-gray-800">
                                    ₱
                                    {(booking.itemId?.pricePerDay || 0).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Days</span>
                                  <span className="text-gray-800">
                                    {dayjs(booking.endDate).diff(dayjs(booking.startDate), 'day')}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Subtotal
                                  </span>
                                  <span className="text-gray-800">
                                    ₱
                                    {(
                                      booking.subtotal || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Shipping
                                  </span>
                                  <span className="text-gray-800">
                                    ₱
                                    {(
                                      booking.shippingFee || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Security Deposit
                                  </span>
                                  <span className="text-orange-600 font-medium">
                                    ₱
                                    {(
                                      booking.securityDeposit || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between font-semibold">
                                  <span className="text-gray-800">Total</span>
                                  <span className="text-[#7A1CA9]">
                                    ₱
                                    {(booking.totalAmount || 0).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">
                                    Payment Method
                                  </span>
                                  <span className="text-gray-800">
                                    {booking.paymentMethod || "N/A"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>


        {showApprovalModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-modalSlideIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Approve Booking
                  </h3>
                  <p className="text-sm text-gray-500">
                    Confirm this booking request
                  </p>
                </div>
              </div>


              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      showApprovalModal.itemId?.images?.[0] ||
                      "https://via.placeholder.com/56"
                    }
                    alt={showApprovalModal.itemId?.title || "Item"}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/56";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {showApprovalModal.itemId?.title || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {showApprovalModal._id?.substring(0, 8) || "N/A"}
                    </p>
                    <p className="text-sm font-semibold text-[#7A1CA9]">
                      ₱{(showApprovalModal.totalAmount || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-gray-200 pt-2">
                  <span className="text-gray-500">Security Deposit:</span>
                  <span className="text-orange-600 font-semibold">
                    ₱{(showApprovalModal.securityDeposit || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-gray-500">Renter:</span>
                  <span className="text-gray-800">
                    {showApprovalModal.userId?.name || "Unknown"}
                  </span>
                </div>
              </div>


              <div className="flex gap-3">
                <button
                  onClick={() => setShowApprovalModal(null)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApprove(showApprovalModal)}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                >
                  Approve Booking
                </button>
              </div>
            </div>
          </div>
        )}


        {showRejectModal && ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => {
            setShowRejectModal(null);
            setRejectReasonCode("");
            setRejectReasonText("");
          }}>
            <div 
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-modalSlideIn"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="reject-modal-title"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 id="reject-modal-title" className="text-lg font-semibold text-gray-800">
                    Reject Booking
                  </h3>
                  <p className="text-sm text-gray-500">
                    Provide a reason for rejection
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      showRejectModal.itemId?.images?.[0] ||
                      "https://via.placeholder.com/56"
                    }
                    alt={showRejectModal.itemId?.title || "Item"}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/56";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {showRejectModal.itemId?.title || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {showRejectModal._id?.substring(0, 8) || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Renter: {showRejectModal.userId?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Reason for Rejection
                </label>
                <div className="space-y-2">
                  {[/* eslint-disable indent */
                    { code: "unavailable", label: "Item unavailable" },
                    { code: "date_conflict", label: "Dates conflict with another booking" },
                    { code: "payment_issue", label: "Payment issue" },
                    { code: "policy_violation", label: "Policy violation" },
                    { code: "other", label: "Other" },
                  ].map((reason) => (
                    <label key={reason.code} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="reject-reason"
                        value={reason.code}
                        checked={rejectReasonCode === reason.code}
                        onChange={(e) => {
                          setRejectReasonCode(e.target.value);
                          if (e.target.value !== "other") {
                            setRejectReasonText("");
                          }
                        }}
                        className="w-4 h-4 accent-red-600"
                      />
                      <span className="text-sm text-gray-700">{reason.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {rejectReasonCode === "other" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please specify
                  </label>
                  <textarea
                    value={rejectReasonText}
                    onChange={(e) => setRejectReasonText(e.target.value)}
                    placeholder="Enter the reason for rejecting this booking..."
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    rows={3}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(null);
                    setRejectReasonCode("");
                    setRejectReasonText("");
                  }}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(showRejectModal)}
                  disabled={!rejectReasonCode || (rejectReasonCode === "other" && !rejectReasonText.trim())}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject Booking
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </main>


      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modalSlideIn {
          animation: modalSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
