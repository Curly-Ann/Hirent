import React, { useState } from "react";
import gcashLogo from "../../assets/payment/GCash.png";
import mayaLogo from "../../assets/payment/maya.png";
import paypalLogo from "../../assets/payment/paypal1.png";

const providers = [
  { label: "GCash", value: "GCash", logo: gcashLogo },
  { label: "Maya", value: "Maya", logo: mayaLogo },
  { label: "PayPal", value: "PayPal", logo: paypalLogo },
];

export default function ProviderDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected = providers.find((p) => p.value === value);

  return (
    <div className="relative w-full bg-gradient-to-b from-white to-gray-50">
      {/* Selected Box */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm w-full flex items-center justify-between"
      >
        {selected ? (
          <div className="flex items-center gap-2">
            <img src={selected.logo} className="w-6 h-5" />
            <span>{selected.label}</span>
          </div>
        ) : (
          <span className="text-gray-400">Select Provider</span>
        )}

        <span className="text-gray-500">▾</span>
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute mt-1 w-full bg-white  text-purple-900   border rounded-lg shadow-lg z-50">
          {providers.map((p) => {
            const isSelected = p.value === value;

            return (
              <button
                key={p.value}
                type="button"
                onClick={() => {
                  onChange(p.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100
                  ${isSelected ? "bg-purple-50 text-purple-600" : ""}
                `}
              >
                <img src={p.logo} className="w-6 h-5" />
                {p.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
