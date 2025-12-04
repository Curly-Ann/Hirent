import React, { useState } from "react";
import bpi from "../../assets/payment/bpi.png";
import bdo from "../../assets/payment/bdo.png";
import metrobank from "../../assets/payment/metrobank.png";
import landbank from "../../assets/payment/landbank.png";

const bankProviders = [
  { label: "BPI", value: "BPI", logo: bpi },
  { label: "BDO", value: "BDO", logo: bdo },
  { label: "Metrobank", value: "Metrobank", logo: metrobank },
  { label: "Landbank", value: "Landbank", logo: landbank },
];

export default function BankProviderDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected = bankProviders.find((b) => b.value === value);

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
            <img src={selected.logo} className="w-6 h-5 object-contain" />
            <span className="text-gray-700">{selected.label}</span>
          </div>
        ) : (
          <span className="text-gray-400">Select Bank</span>
        )}

        <span className="text-gray-500">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-white  text-purple-900   border rounded-lg shadow-lg z-50">
          {bankProviders.map((b) => {
            const isSelected = b.value === value;

            return (
              <button
                key={b.value}
                type="button"
                onClick={() => {
                  onChange(b.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100
                  ${isSelected ? "bg-purple-50 text-purple-600" : ""}
                `}
              >
                <img src={b.logo} className="w-6 h-5 object-contain" />
                {b.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
