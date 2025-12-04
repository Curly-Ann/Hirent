import React from "react";
import {
  HiOutlineCalendar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";



const statusMap = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-gray-100 text-gray-500",
  Rejected: "bg-red-100 text-red-700",
};

// ⭐ Star Rating Component
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= Math.floor(rating);
        return (
          <svg
            key={star}
            className="w-4 h-4"
            fill={isFilled ? "#facc15" : "none"}
            stroke="#facc15"
            viewBox="0 0 24 24"
          >
            <polygon
              points="12 4 15 10 22 10.5 17 14.5 18.5 21.5 12 17.5 5.5 21.5 7 14.5 2 10.5 9 10"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.3"
            />
          </svg>
        );
      })}
    </div>
  );
}

export default function BookingTable({
  bookings,
  expandedRow,
  setExpandedRow,
  onApprove,
  onReject,
}) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="bg-white  text-purple-900   rounded-xl border border-gray-100 shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-white  text-purple-900   text-[14px] font-semibold">
            {["Item", "Renter", "Price", "Booked Dates", "Actions"].map(
              (header) => (
                <th key={header} className="px-7 py-4 text-left font-semibold">
                  {header}
                </th>
              )
            )}
            <th className="px-7 py-4"></th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => {
            const isOpen = expandedRow === b.id;

            return (
              <React.Fragment key={b.id}>
                {/* MAIN ROW */}
                <tr className="border-t hover:bg-purple-50 transition">
                  {/* ITEM */}
                  <td className="px-7 py-4 flex gap-3 items-center">
                    <img
                      src={b.itemImage}
                      alt={b.item}
                      className="w-10 h-10 object-cover rounded shadow bg-gray-100"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/40?text=Item")
                      }
                    />
                    <div>
                      <p className="font-semibold text-sm">{b.item}</p>
                      <p className="text-sm text-gray-500">{b.category}</p>
                    </div>
                  </td>

                  {/* RENTER */}
                  <td className="px-7 py-4">
                    <div className="flex gap-2 items-center">
                      <div className="w-10 h-10 rounded-full bg-[#7A1CA9] flex items-center justify-center text-white font-semibold">
                        {b.renter?.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{b.renter.name}</p>
                        <p className="text-sm text-gray-500">{b.renter.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-7 py-4 min-w-[110px]">
                    <p className="font-semibold">{b.price}</p>
                    {b.discount && (
                      <p className="text-sm text-green-600">{b.discount}</p>
                    )}
                  </td>

                  {/* BOOKED DATES */}
                  <td className="px-7 py-4 text-sm text-gray-400">
                    <div className="flex gap-2 items-center">
                      <HiOutlineCalendar className="w-4 h-4 text-gray-400" />
                      {formatDate(b.bookedDates)} – {formatDate(b.bookedDateEnd)}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-7 py-4">
                    <div className="flex gap-2">
                      {b.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => onApprove(b)}
                            className="px-3 py-1 bg-green-100 border border-green-600 text-green-600 text-[13px] font-medium rounded-lg hover:bg-green-700 shadow-sm transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onReject(b)}
                            className="px-3 py-1 bg-red-100 border border-red-600 text-red-600  text-[13px] font-medium rounded-lg hover:bg-red-700 shadow-sm transition"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          className={`px-4 py-1.5 rounded-lg font-medium text-sm ${statusMap[b.status]}`}
                        >
                          {b.status}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* EXPAND BUTTON */}
                  <td className="px-7 py-4 text-right">
                    <button
                      onClick={() => setExpandedRow(isOpen ? null : b.id)}
                      className="text-gray-500 hover:text-purple-700 transition"
                    >
                      {isOpen ? (
                        <HiOutlineChevronUp className="w-5 h-5" />
                      ) : (
                        <HiOutlineChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>

                {/* 🔥 EXPANDED DETAILS WITH SMOOTH ANIMATION */}
                <tr className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-t">
                  <td colSpan="6" className="px-7 py-0">

                    {/* 🔥 Smooth Expand Wrapper */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen ? "max-h-[1000px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"}
                      `}
                    >
                      <div className="grid grid-cols-3 gap-8">
                        {/* RENTER DETAILS */}
                        <div>
                          <h4 className="font-bold text-sm mb-3">
                            Renter Information
                          </h4>
                          <div className="space-y-3 text-sm">
                            {[
                              ["Full Name", b.renter.name],
                              ["Email Address", b.renter.email],
                              ["Contact Number", b.renter.phone],
                              ["Complete Address", b.renter.address],
                            ].map(([label, value]) => (
                              <div key={label}>
                                <span className="text-gray-500 text-xs block">
                                  {label}
                                </span>
                                <p className="font-semibold">{value}</p>
                              </div>
                            ))}

                            <div>
                              <span className="text-gray-500 text-xs block">
                                Rating
                              </span>
                              <div className="flex items-center gap-2">
                                <StarRating rating={b.renter.rating} />
                                <span className="text-xs font-semibold">
                                  {b.renter.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* BOOKING DETAILS */}
                        <div>
                          <h4 className="font-bold text-sm mb-3">
                            Booking Details
                          </h4>
                          <div className="space-y-3 text-sm">
                            <Detail label="From Date" value={formatDate(b.bookedDates)} />
                            <Detail label="To Date" value={formatDate(b.bookedDateEnd)} />
                            <Detail label="Duration" value={b.duration} />
                            <div>
                              <span className="text-gray-500 text-xs block">
                                Payment Method
                              </span>
                              <span className="inline-block bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded mt-1">
                                {b.paymentMethod}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* PRICE SUMMARY */}
                        <div>
                          <h4 className="font-bold text-sm mb-3">
                            Price Summary
                          </h4>
                          <div className="space-y-3 text-sm">
                            <SummaryRow label="Subtotal" value={b.subtotal} />
                            <SummaryRow label="Shipping" value={b.shipping} />

                            {b.discountPercent && (
                              <SummaryRow
                                label="Discount"
                                value={b.discountPercent}
                                className="text-green-600"
                              />
                            )}

                            <div className="flex justify-between border-t pt-3 mt-3">
                              <span className="font-bold">Total</span>
                              <span className="font-bold text-lg">{b.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Small Reusable Components
function Detail({ label, value }) {
  return (
    <div>
      <span className="text-gray-500 text-xs block">{label}</span>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, className = "" }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
