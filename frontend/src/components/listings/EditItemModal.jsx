import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function EditItemModal({ open, onClose, item }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[420px] bg-white  text-purple-900   rounded-xl shadow-xl p-6"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Item</h2>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <input
                className="w-full border rounded-lg px-3 py-2"
                defaultValue={item.name}
              />
              <input
                className="w-full border rounded-lg px-3 py-2"
                defaultValue={item.price}
              />
              <textarea
                className="w-full border rounded-lg px-3 py-2 h-24"
                defaultValue={item.description}
              ></textarea>
            </div>

            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
              Save Changes
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
