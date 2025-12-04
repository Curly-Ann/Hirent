import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ItemPageModal({ open, onClose, item }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[500px] bg-white  text-purple-900   rounded-xl p-6 shadow-xl"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.85 }}
            transition={{ type: "spring", damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <img
              src={item.image}
              alt=""
              className="w-full h-52 object-cover rounded-lg border mb-4"
            />

            <p className="text-gray-700 mb-2">{item.description}</p>

            <p className="text-sm text-gray-600">
              Price: <b>₱{item.price}/day</b>
            </p>
            <p className="text-sm text-gray-600">
              Condition: <b>{item.condition}</b>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
