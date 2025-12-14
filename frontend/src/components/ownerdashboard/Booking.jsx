import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import GoogleStyleCalendar from "../../components/calendar/GoogleStyleCalendar";

export default function Booking({ 
  bookings: sampleBookings, 
  listings = [],
  selectedItemId = "all",
  onItemChange = () => {}
}) {
  // SAFETY: Ensure bookings is always a valid array
  const bookings = Array.isArray(sampleBookings) ? sampleBookings : [];

  // Use real listings from owner's items
  const uniqueItems = useMemo(() => {
    if (listings && listings.length > 0) {
      return listings.map(item => ({
        item: item.title || "Unknown Item",
        itemKey: item._id,
      }));
    }
    
    // Fallback: extract from bookings if no listings provided
    const map = {};
    bookings.forEach((b) => {
      const key = b?.itemKey;
      if (!key) return;

      if (!map[key]) {
        map[key] = {
          item: b?.item || "Unknown Item",
          itemKey: key,
        };
      }
    });

    return Object.values(map);
  }, [listings, bookings]);

  // Use selectedItemId from props, fallback to local state
  const [localSelectedItemKey, setLocalSelectedItemKey] = useState("all");
  const selectedItemKey = selectedItemId || localSelectedItemKey;

  // Handle item change
  const handleItemChange = (value) => {
    setLocalSelectedItemKey(value);
    if (onItemChange) {
      onItemChange(value);
    }
  };

  // Filter current bookings safely
  const currentBookings =
    selectedItemKey === "all"
      ? bookings
      : bookings.filter((b) => b?.itemKey === selectedItemKey);

  return (
    <div className="bg-white text-gray-900 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Booking Schedule
        </h2>
      </div>

      {/* Item Selector */}
      <div className="mb-1">
        <label className="text-sm text-gray-600 mr-2">Select Item:</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedItemKey}
          onChange={(e) => handleItemChange(e.target.value)}
        >
          <option value="all">All Items</option>

          {uniqueItems.map((item) => (
            <option key={item.itemKey} value={item.itemKey}>
              {item.item}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar or Empty State */}
      {currentBookings.length > 0 ? (
        <GoogleStyleCalendar bookings={currentBookings} />
      ) : (
        <div className="text-center py-6 text-sm text-gray-500 bg-gray-50 rounded-lg">
          No bookings yet for this item.
        </div>
      )}
    </div>
  );
}
