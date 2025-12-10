import React from "react";
import { Star, MapPin, Heart, Check, Eye } from "lucide-react";

const RentalItemCard = ({
  item,
  wishlist,
  justAdded,
  toggleWishlist,
  handleAddToCollection,
  navigate,
}) => {
  // -------------------------------
  // 🔥 UNIVERSAL IMAGE FALLBACK LOGIC
  // -------------------------------
  const image =
    item.images?.[0] ||
    item.images?.avatar ||
    item.images?.main ||
    item.images?.other?.[0] ||
    item.image || // old API support
    "/placeholder.png"; // final fallback


  return (
    <div className="rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white text-purple-900 p-3">
      {/* Image Section */}
      <div className="relative bg-gray-100 aspect-square rounded-2xl flex flex-col items-center justify-center overflow-hidden">

        {/* Wishlist & Eye Buttons */}
        <div className="absolute top-3 right-3 flex gap-1 z-50">
          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(item._id)}
            className="bg-white text-purple-900 rounded-full shadow p-1 hover:bg-gray-200 transition"
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              className={`transition ${
                wishlist.includes(item._id)
                  ? "fill-[#fd2c48] stroke-[#fd2c48]"
                  : "stroke-[#565656]"
              }`}
            />
          </button>

          {/* Eye / View Product Button */}
          <button
            onClick={() => navigate(`/product/${item._id}`)}
            className="bg-white text-[#565656] rounded-full shadow p-1 hover:bg-gray-200 transition"
          >
            <Eye size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
         <img
           src={item.images?.[0] || "/placeholder.png"}
          alt={item.title}
          className="absolute w-[95%] h-[95%] object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Bottom Buttons */}
        <div className="flex w-full rounded-b-2xl overflow-hidden">
          {/* Book item */}
          <button
            onClick={() => navigate(`/booking/${item._id}`)}
            className="flex-[0.8] bg-[#7A1CA9] hover:bg-[#681690] text-white text-[12.5px] font-medium py-2.5 flex justify-center items-center transition"
          >
            Book Item
          </button>

          {/* Add to Collection */}
          <button
            onClick={() => handleAddToCollection(item)}
            className={`flex-[1] border border-[#7A1CA9] rounded-br-2xl font-medium py-2.5 flex items-center justify-center gap-2 transition-all duration-300 text-[12.5px] ${
              justAdded.includes(item._id)
                ? "bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600"
                : "text-[#7A1CA9] hover:bg-purple-100"
            }`}
          >
            {justAdded.includes(item._id)? (
              <>
                <Check size={16} className="text-white" /> Added!
              </>
            ) : (
              <>Add To Collection</>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-left mt-3">
        <div className="flex justify-between items-center">
          <p className="text-gray-900 font-semibold">
            {item.name || item.title}

          </p>

          {/* Rating */}
          <div className="flex items-center text-yellow-500 text-xs">
            {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index + 1;
              const isFull = item.rating >= starValue;
              const isHalf = !isFull && item.rating >= starValue - 0.5;
              const uniqueId = `half-${item._id} {index}`;

              if (isFull) {
                return (
                  <Star
                    key={index}
                    size={14}
                    fill="#facc15"
                    stroke="#facc15"
                    className="mr-[2px]"
                  />
                );
              } else if (isHalf) {
                return (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    className="mr-[2px]"
                  >
                    <defs>
                      <linearGradient id={uniqueId}>
                        <stop offset="50%" stopColor="#facc15" />
                        <stop offset="50%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <path
                      fill={`url(#${uniqueId})`}
                      stroke="#facc15"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
                      9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                );
              } else {
                return (
                  <Star
                    key={index}
                    size={14}
                    fill="none"
                    stroke="#facc15"
                    className="mr-[2px]"
                  />
                );
              }
            })}
            <span className="text-gray-600 font-medium ml-1">
              {item.rating}
            </span>
          </div>
        </div>

        {/* Price */}
        <p className="text-[#7A1CA9] font-bold text-sm mb-1">{item.price}</p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-xs gap-1">
          <MapPin size={13} className="text-gray-500" />
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  );
};

export default RentalItemCard;
