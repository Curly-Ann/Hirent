import {
  HiX,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
} from "react-icons/hi";

/**
 * Star rating component (yellow filled up to "rating", rest are gray)
 */
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-5 h-5"
          fill={star <= rating ? "#facc15" : "none"}
          stroke="#facc15"
          viewBox="0 0 24 24">
          <polygon
            points="12 4 15 10 22 10.5 17 14.5 18.5 21.5 12 17.5 5.5 21.5 7 14.5 2 10.5 9 10"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.3"
          />
        </svg>
      ))}
      <span className="text-yellow-600 text-sm font-bold ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

/**
 * Renter Details Modal (minimalist, HiRent palette)
 */
export default function RenterDetailsModal({ booking, onClose }) {
  if (!booking) return null;
  const { renter } = booking;
  // Fallback for avatar: colored circle w/ initial
  const initial =
    renter?.name && renter.name.trim().length > 0
      ? renter.name.trim().charAt(0).toUpperCase()
      : "?";
  const avatarIsUrl =
    renter.avatar &&
    renter.avatar.startsWith("http") &&
    renter.avatar !== ""; // crude check

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur">
      <div className="bg-white  text-purple-900   rounded-2xl shadow-2xl w-full max-w-md mx-3 p-0">
        {/* Header */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3 border-b border-gray-100">
          <div className="text-xl font-bold  text-gray-900  tracking-wide">Renter Details</div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-purple-700 transition"
            aria-label="Close profile modal"
          >
            <HiX className="w-7 h-7" />
          </button>
        </div>
        {/* Content */}
        <div className="px-7 py-7 space-y-7">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-purple-200 mb-2"
              style={{
                background:
                  "linear-gradient(135deg,#9333ea 40%,#a78bfa 120%)",
              }}
            >
              {avatarIsUrl ? (
                <img
                  src={renter.avatar}
                  alt={renter.name}
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <span className="text-white font-extrabold text-3xl">{initial}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold  text-gray-900 ">{renter.name}</span>
              {renter.verified && (
                <HiOutlineCheckCircle className="w-5 h-5 text-green-500" title="Verified account" />
              )}
            </div>
            {/* Rating */}
            <div className="mt-2">
              <StarRating rating={renter.rating ?? 4.9} />
            </div>
          </div>
          {/* Contact Info + other details */}
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex items-center gap-3">
              <HiOutlineMail className="w-5 h-5 text-purple-400" />
              <span>{renter.email}</span>
            </div>
            {renter.phone && (
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="w-5 h-5 text-purple-400" />
                <span>{renter.phone}</span>
              </div>
            )}
            {renter.address && (
              <div className="flex items-center gap-3">
                <HiOutlineLocationMarker className="w-5 h-5 text-purple-400" />
                <span>{renter.address}</span>
              </div>
            )}
            {renter.joined && (
              <div className="text-xs text-gray-400">Joined: {renter.joined}</div>
            )}
          </div>

          <div className="mt-5 flex justify-end">
            <a
              href={`mailto:${renter.email}`}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
