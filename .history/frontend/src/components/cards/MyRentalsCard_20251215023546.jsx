import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  Calendar,
  MapPin,
  Eye,
  User,
  MessageCircle,
  XCircle,
  BadgeCheck,
  CircleCheckBig,
  Clock,
} from "lucide-react";

const RentalCard = ({
  item: booking,
  onViewDetails,
  onCancel,
  onRemove,
  currentFilter,
}) => {
  const navigate = useNavigate();
  const { itemId: item, ownerId: owner } = booking;

  if (!item) {
    return (
      <div className="relative bg-white rounded-2xl border p-4 shadow-sm text-red-500">
        Error: Item data is missing for this booking.
      </div>
    );
  }

  const countDays = () => {
    const days = booking.duration || 1;
    return `${days} day${days > 1 ? "s" : ""}`;
  };

  const canCancel = () => {
    const today = new Date();
    const startDate = new Date(booking.startDate);
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    const diffTime = startDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (
      diffDays >= 1 &&
      (booking.status === "pending" || booking.status === "approved")
    );
  };

  const statusStyles = {
    approved: "bg-purple-100 text-purple-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-green-100 text-green-700",
  };

  const statusIcons = {
    approved: <BadgeCheck className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />,
    completed: <CircleCheckBig className="w-4 h-4" />,
  };

  return (
    <div className="relative bg-white rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
      <span
        className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
          statusStyles[booking.status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {statusIcons[booking.status]}
        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
      </span>

      <div className="flex gap-5">
        <img
          src={
            item.images && item.images[0]
              ? item.images[0]
              : "https://via.placeholder.com/150"
          }
          className="w-32 h-32 object-cover rounded-lg"
          alt={item.title}
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-[16px] flex items-center gap-2">
              {item.title}
              <span className="text-xs px-1 bg-purple-100 text-purple-700 rounded-md border">
                {item.category}
              </span>
            </h2>

            <div className="flex items-center gap-3 text-[13px] text-gray-600 mt-1">
              <User className="w-4 h-4" />
              Listed by {owner?.name || "Unknown Owner"}
            </div>

            <div className="flex items-center gap-3 text-[13px] text-gray-600">
              <MapPin className="w-4 h-4" />
              {owner?.ownerAddress || "Location not available"}
            </div>
          </div>

          <div className="text-[13px] text-gray-900 mt-3">
            <Calendar className="w-4 h-4 inline mr-1" />
            {dayjs(booking.startDate).format("M/D/YYYY")} →{" "}
            {dayjs(booking.endDate).format("M/D/YYYY")}
            <p className="text-yellow-600 flex gap-1 items-center mt-1">
              <Clock className="w-4 h-4" />
              {dayjs(booking.endDate).diff(
                dayjs(booking.startDate),
                "day"
              )}{" "}
              {dayjs(booking.endDate).diff(dayjs(booking.startDate), "day") > 1
                ? "days"
                : "day"}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-14">
            <div>
              <p className="text-xs text-gray-500">Rent per day</p>
              <p className="text-[16px] font-bold text-purple-900">
                ₱{item.pricePerDay}
              </p>
            </div>

            {booking.status !== "cancelled" && (
              <div>
                <p className="text-xs text-gray-500">Total amount</p>
                <p className="font-bold text-[16px] text-purple-900">
                  ₱{booking.totalAmount.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            {booking.status === "cancelled" && currentFilter === "all" ? (
              <button
                onClick={() => onRemove(booking._id)}
                className="px-3 py-1.5 border rounded-full text-xs text-red-600 border-red-300 bg-red-50 hover:bg-red-100 flex items-center"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Remove
              </button>
            ) : (
              <button
                onClick={() => navigate(`/item/${item._id}`)}
                className="px-3 py-1.5 border rounded-full text-xs hover:bg-gray-50 flex items-center"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Item
              </button>
            )}

            <button
              onClick={() => navigate(`/messages?recipient=${owner._id}`)}
              className="px-3 py-1.5 border rounded-full text-xs hover:bg-gray-50 flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Message Owner
            </button>

            {canCancel() && (
              <button
                onClick={() => onCancel(booking._id)}
                className="px-3 py-1.5 border rounded-full text-xs text-red-600 border-red-300 bg-red-50 hover:bg-red-100 flex items-center"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
