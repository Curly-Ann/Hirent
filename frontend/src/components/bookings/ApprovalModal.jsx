import { HiX } from "react-icons/hi";
import { useState } from "react";

export default function ApprovalModal({ booking, onClose, onConfirm }) {
  const [note, setNote] = useState("");
  const [delivery, setDelivery] = useState("");
  const [meetup, setMeetup] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur">
      <div className="bg-white  text-purple-900   rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-8 py-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold  text-gray-900 ">Approve Booking</h2>
            <p className="text-sm text-gray-500 mt-1">
              You are approving the booking for {booking.item}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <HiX className="w-7 h-7" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirmation Note / Message
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a message for the renter (optional)..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              placeholder="e.g., Leave at the front desk"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meet-up Details (Optional)
            </label>
            <input
              type="text"
              value={meetup}
              onChange={(e) => setMeetup(e.target.value)}
              placeholder="e.g., Coffee shop at 2pm"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
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
            onClick={() => onConfirm(note, delivery, meetup)}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Confirm Approval
          </button>
        </div>
      </div>
    </div>
  );
}
