import { HiX } from "react-icons/hi";
import { useState } from "react";

export default function RejectModal({ booking, onClose, onConfirm }) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const reasons = [
    "Item already taken",
    "Item damaged / under maintenance",
    "Others",
  ];

  const handleSubmit = () => {
    const finalReason =
      selectedReason === "Others" ? customReason : selectedReason;
    if (!finalReason) {
      alert("Please select or specify a reason");
      return;
    }
    onConfirm(finalReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur">
      <div className="bg-white  text-purple-900   rounded-2xl shadow-2xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="px-8 py-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold  text-gray-900 ">Reject Booking</h2>
            <p className="text-sm text-gray-500 mt-1">
              You are rejecting the booking for {booking.item}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <HiX className="w-7 h-7" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Why are you rejecting this booking?
            </label>
            <div className="space-y-3">
              {reasons.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason === "Others" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Please specify the reason
              </label>
              <input
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Enter your reason"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Submit Rejection
          </button>
        </div>
      </div>
    </div>
  );
}
