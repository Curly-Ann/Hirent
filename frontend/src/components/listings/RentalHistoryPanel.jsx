import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, User } from "lucide-react";

export default function RentalHistoryPanel({ open, onClose, item }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
            className="w-[500px] h-full bg-white  text-purple-900   shadow-xl border-l px-6 py-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Rental History</h2>
                <p className="text-gray-500 text-sm">{item.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {item.history && item.history.length > 0 ? (
              <div className="space-y-4">
                {item.history.map((record, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 shadow-sm bg-white  text-purple-900  "
                  >
                    {/* User */}
                    <div className="flex items-center gap-2 mb-1">
                      <User size={16} className="text-gray-500" />
                      <p className="font-medium">{record.renter}</p>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays size={16} />
                      <span>{record.dates}</span>
                    </div>

                    {/* Status */}
                    <p
                      className={`mt-2 text-xs font-medium inline-block px-2 py-1 rounded-full ${
                        record.status === "Returned"
                          ? "bg-green-100 text-green-700"
                          : record.status === "Overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {record.status}
                    </p>

                    {/* Notes */}
                    {record.notes && (
                      <p className="text-sm text-gray-600 mt-2">{record.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No rental history for this item.</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
