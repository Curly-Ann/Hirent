// src/components/ownerdashboard/BookingTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function BookingTable({
  bookings,
  ActionsDropdown,
}) {
  const navigate = useNavigate();

  // Get status badge styling based on booking status
  const getStatusStyle = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "completed") return "bg-green-50 text-green-500";
    if (statusLower === "cancelled") return "bg-red-50 text-red-500";
    if (statusLower === "pending") return "bg-yellow-50 text-yellow-500";
    if (statusLower === "approved") return "bg-blue-50 text-blue-500";
    return "bg-gray-50 text-gray-600";
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white text-purple-900 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
          <p className="text-sm text-gray-500">Manage all your booking activity</p>
        </div>

        <div>
          <button
            onClick={() => navigate("/owner/bookings")}
            className="px-3 py-1.5 border text-sm rounded-lg hover:bg-gray-50"
          >
            See All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="border-b">
            <tr className="text-gray-400 font-normal">
              <th className="px-6 py-3 font-normal">Booking ID</th>
              <th className="px-6 py-3 font-normal">Item & Price</th>
              <th className="px-6 py-3 font-normal">Renter</th>
              <th className="px-6 py-3 font-normal">Booked Date</th>
              <th className="px-6 py-3 font-normal">Total</th>
              <th className="px-6 py-3 font-normal">Status</th>
              <th className="px-6 py-3 font-normal">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {bookings && bookings.length > 0 ? (
              bookings.slice(0, 5).map((booking) => (
                <tr key={booking._id} className="hover:bg-purple-50 transition">
                  {/* Booking ID */}
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{booking._id?.substring(0, 8) || "N/A"}</span>
                  </td>

                  {/* Item & Price */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        <img
                          src={booking.itemId?.images?.[0] || "https://via.placeholder.com/48"}
                          alt={booking.itemId?.title || "Item"}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/48";
                          }}
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {booking.itemId?.title || "Unknown"}
                        </span>
                        {booking.itemId?.pricePerDay && (
                          <span className="text-[13px] text-gray-500">
                            ₱ {booking.itemId.pricePerDay} per day
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Renter */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-600">
                          {(booking.userId?.name || "U").charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {booking.userId?.name || "Unknown"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {booking.userId?.email || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Booked Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {formatDate(booking.startDate)}
                      </span>
                    </div>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      ₱{(booking.totalAmount || 0).toLocaleString()}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyle(booking.status)}`}>
                      {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "N/A"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <ActionsDropdown booking={booking} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No bookings yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
