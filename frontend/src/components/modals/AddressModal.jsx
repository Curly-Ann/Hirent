import React, { useState } from "react";
import { X } from "lucide-react";

const addressTypes = [
  { label: "Home", value: "Home" },
  { label: "Work", value: "Work" },
  { label: "Other", value: "Other" },
];

export default function AddressModal({
  isOpen,
  closeModal,
  saveAddress,
  editingAddress,
  form,
  setForm,
}) {
  const [typeOpen, setTypeOpen] = useState(false);

  if (!isOpen) return null;

  const selectedType = addressTypes.find((t) => t.value === form.label);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="collection-scale mt-20 rounded-2xl w-full max-w-4xl relative shadow-lg bg-white  text-purple-900   overflow-hidden">

        {/* Header */}
        <div className="p-6 relative">
          <h2 className="text-xl font-bold">
            {editingAddress ? "Edit Address" : "Add Address"}
          </h2>
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Form Container */}
        <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 p-6">
          <form onSubmit={saveAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Type and Specify Type (only show if NOT editing) */}
            {!editingAddress && (
              <>
                <div className={form.label === "Other" ? "md:col-span-1 relative w-full" : "md:col-span-2 relative w-full"}>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <button
                    type="button"
                    onClick={() => setTypeOpen(!typeOpen)}
                    className="border border-gray-300 bg-gradient-to-b from-white to-gray-50  px-3 py-2 rounded-lg shadow-sm w-full flex items-center justify-between"
                  >
                    {selectedType ? (
                      <span className="text-gray-700">{selectedType.label}</span>
                    ) : (
                      <span className="text-gray-400">Select Type</span>
                    )}
                    <span className="text-gray-500">▾</span>
                  </button>

                  {typeOpen && (
                    <div className="absolute mt-1 w-full bg-white  text-purple-900   border rounded-lg shadow-lg z-50">
                      {addressTypes.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => {
                            setForm({ ...form, label: t.value, specify: "" });
                            setTypeOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${
                            t.value === form.label ? "bg-purple-50 text-purple-600" : ""
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {form.label === "Other" && (
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">Specify Type</label>
                    <input
                      type="text"
                      placeholder="Specify type"
                      value={form.specify || ""}
                      onChange={(e) => setForm({ ...form, specify: e.target.value })}
                      className="border px-3 py-2 rounded w-full"
                      required
                    />
                  </div>
                )}
              </>
            )}

            {/* Phone full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <div className="flex">
                <div className="flex items-center px-2 border border-r-0 rounded-l-md bg-white  text-purple-900   gap-1">
                  <img
                    src="https://flagcdn.com/w20/ph.png"
                    alt="PH"
                    className="w-5 h-3 object-cover"
                  />
                  <span className="text-gray-700">+63</span>
                </div>
                <input
                  type="tel"
                  placeholder="9XXXXXXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="border border-l-0 rounded-r-md px-3 py-2 w-full"
                  required
                />
              </div>
            </div>

            {/* Address fields two columns */}
            <div>
              <label className="block text-sm font-medium mb-1">Street / Unit / Block</label>
              <input
                type="text"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                className="border px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Barangay</label>
              <input
                type="text"
                value={form.barangay}
                onChange={(e) => setForm({ ...form, barangay: e.target.value })}
                className="border px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City / Municipality</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="border px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Province</label>
              <input
                type="text"
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                className="border px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <input
                type="text"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={form.country || "Philippines"}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="border px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            {/* Save button */}
            <div className="md:col-span-2 text-right mt-2">
              <button
                type="submit"
                className="px-6 py-2 border bg-purple-50 border-purple-300 rounded-lg shadow-sm text-[15px] text-purple-600 hover:bg-purple-50"
              >
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
