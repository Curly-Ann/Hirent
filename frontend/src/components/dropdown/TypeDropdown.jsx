import React, { useState } from "react";

const paymentTypes = [
  { label: "Card", value: "Card" },
  { label: "Bank Transfer", value: "Bank" },
  { label: "Online Payment", value: "Online" },
];

export default function TypeDropdown({ value, onChange, usedTypes = [] }) {
  const [open, setOpen] = useState(false);

  const selected = paymentTypes.find((t) => t.value === value);

  return (
    <div className="relative w-full bg-gradient-to-b from-white to-gray-50 rounded-lg">

      {/* Selected Box */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm w-full flex items-center justify-between"
      >
        {selected ? (
          <span className="text-gray-700">{selected.label}</span>
        ) : (
          <span className="text-gray-400">Select Type</span>
        )}
        <span className="text-gray-500">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-white  text-purple-900   border rounded-lg shadow-lg z-50">
          {paymentTypes.map((t) => {
            const isSelected = t.value === value;
            const isDisabled = usedTypes.includes(t.value);

            return (
              <button
                key={t.value}
                type="button"
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) {
                    onChange(t.value);
                    setOpen(false);
                  }
                }}
                className={`
                  w-full px-3 py-2 text-left flex items-center justify-between
                  ${isSelected ? "bg-purple-50 text-purple-600" : ""}
                  ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
                `}
              >
                <span>{t.label}</span>

                {/* Disabled Tag */}
                {isDisabled && (
                  <span className="text-xs text-red-500 font-medium">Added</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
