import React, { useState } from "react";

/* -------------------------
   SMALL UI COMPONENTS
------------------------- */

function SectionHeader({ title }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-4 bg-[#7A1CA9] rounded-md"></div>
        <h2 className="text-lg font-medium  text-gray-900 ">{title}</h2>
      </div>
      <div className="border-b border-gray-200"></div>
    </div>
  );
}

function Input({ label, required, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-purple-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        {...props}
        className="w-full px-3 py-2 border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-gray-300 rounded-md text-sm 
          focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
      />
    </div>
  );
}

function Textarea({ label, required, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium  text-purple-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        {...props}
        className="w-full px-3 py-2 border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-gray-300 rounded-md text-sm resize-none 
        focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
      ></textarea>
    </div>
  );
}

function Select({ label, options, required, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-purple-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        {...props}
        className="w-full px-3 py-2 border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-gray-300 rounded-md text-sm 
          focus:ring-2 focus:ring-purple-500 transition"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm transition
        ${
          selected
            ? "bg-purple-600 text-white border-purple-600 shadow-sm"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );
}

/* -------------------------
   MAIN FORM
------------------------- */

export default function AddNewItemForm() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    pricePerDay: "",
    securityDeposit: "",
    condition: "",
    category: "",
    location: "",
    deliveryOption: "",
    availableFrom: "",
    availableTo: "",
    color: "",
    customColor: "",
    itemOptions: [],
    customItem: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  /* OPTIONAL ITEMS */
  const OPTIONAL_ITEMS = [
    "Waterproof",
    "Extra Battery",
    "High Resolution",
    "Charger Included",
    "Tripod Included",
    "Bag/Case",
    "SD Card",
    "USB Cable",
    "Garment Bag",
  ];

  /* COLOR SWATCHES */
  const COLOR_SWATCHES = [
    { name: "Black", hex: "#111" },
    { name: "White", hex: "#fff", border: true },
    { name: "Red", hex: "#dc2626" },
    { name: "Blue", hex: "#2563eb" },
    { name: "Green", hex: "#059669" },
    { name: "Yellow", hex: "#eab308" },
  ];

  /* STATE FUNCTIONS */
  const toggleOption = (opt) => {
    setFormData((prev) => ({
      ...prev,
      itemOptions: prev.itemOptions.includes(opt)
        ? prev.itemOptions.filter((x) => x !== opt)
        : [...prev.itemOptions, opt],
    }));
  };

  const handleImageChange = (e) => {
    const previews = Array.from(e.target.files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImagePreviews(previews);
  };

  const addCustomItem = () => {
    if (!formData.customItem.trim()) return;

    setFormData((prev) => ({
      ...prev,
      itemOptions: [...prev.itemOptions, prev.customItem.trim()],
      customItem: "",
    }));
  };

  /* CLEAR ALL LOGIC */
  const isFormDirty =
    Object.values(formData).some((v) => v !== "" && v.length !== 0) ||
    imagePreviews.length > 0;

  const clearAllFields = () => {
    setFormData({
      itemName: "",
      description: "",
      pricePerDay: "",
      securityDeposit: "",
      condition: "",
      category: "",
      location: "",
      deliveryOption: "",
      availableFrom: "",
      availableTo: "",
      color: "",
      customColor: "",
      itemOptions: [],
      customItem: "",
    });

    setImagePreviews([]);
    setErrors({});
  };

  /* VALIDATION */
  const validateFields = () => {
    let temp = {};

    if (!formData.itemName) temp.itemName = "Item name required";
    if (!formData.description) temp.description = "Description required";
    if (!formData.pricePerDay) temp.price = "Price required";
    if (!formData.securityDeposit) temp.deposit = "Security deposit required";
    if (!formData.condition) temp.condition = "Condition required";
    if (!formData.category) temp.category = "Category required";
    if (!formData.availableFrom || !formData.availableTo)
      temp.availability = "Availability required";
    if (!formData.location) temp.location = "Location required";
    if (!formData.deliveryOption) temp.delivery = "Delivery option required";
    if (imagePreviews.length === 0) temp.photo = "At least 1 photo required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const submitForm = () => {
    if (!validateFields()) return;
    console.log("SUBMITTED", formData);
  };

  /* -------------------------
        UI COMPONENT
  ------------------------- */
  return (
  <main className="collection-scale flex-1 mt-12">

      {/* HEADER + CLEAR ALL */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1 mt-6">Add New Item</h2>
          <p className="text-gray-500 mb-8 text-base">Please fill in the required details.</p>
        </div>

        <button
          onClick={clearAllFields}
          disabled={!isFormDirty}
          className="px-3 py-1.5 border border-gray-400 rounded-md text-sm text-purple-900 bg-white  text-purple-900   hover:bg-gray-100
            transition disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-95"
        >
          Clear All
        </button>
      </div>

      {/* GENERAL INFORMATION */}
      <div className="bg-white  text-purple-900   p-6 rounded-xl shadow-sm border border-gray-200 mb-5">
        <SectionHeader title="General Information" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Item Name"
            required
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
          />

          <Select
            label="Category"
            required
            options={["Camera", "Dress", "Electronics", "Tools", "Outdoor"]}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>

        {errors.itemName && (
          <p className="text-red-500 text-sm">{errors.itemName}</p>
        )}
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}

        <Textarea
          label="Description"
          required
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      {/* PRICING */}
      <div className="bg-white  text-purple-900   p-6 rounded-xl shadow-sm border border-gray-200 mb-5">
        <SectionHeader title="Pricing & Deposit" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Price per Day"
            type="number"
            required
            onChange={(e) =>
              setFormData({ ...formData, pricePerDay: e.target.value })
            }
          />

          <Input
            label="Security Deposit"
            type="number"
            required
            onChange={(e) =>
              setFormData({ ...formData, securityDeposit: e.target.value })
            }
          />

          <Select
            label="Condition"
            required
            options={["Brand New", "Like New", "Good", "Fair"]}
            onChange={(e) =>
              setFormData({ ...formData, condition: e.target.value })
            }
          />
        </div>

        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price}</p>
        )}
        {errors.deposit && (
          <p className="text-red-500 text-sm">{errors.deposit}</p>
        )}
        {errors.condition && (
          <p className="text-red-500 text-sm">{errors.condition}</p>
        )}
      </div>

      {/* LOCATION & DELIVERY */}
      <div className="bg-white  text-purple-900   p-6 rounded-xl shadow-sm border border-gray-200 mb-5">
        <SectionHeader title="Location & Delivery" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Location"
            required
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <Select
            label="Delivery Option"
            required
            options={["Pickup Only", "Delivery Available", "Pickup or Delivery"]}
            onChange={(e) =>
              setFormData({ ...formData, deliveryOption: e.target.value })
            }
          />
        </div>

        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
        {errors.delivery && (
          <p className="text-red-500 text-sm">{errors.delivery}</p>
        )}
      </div>

      {/* AVAILABILITY */}
      <div className="bg-white  text-purple-900   p-6 rounded-xl shadow-sm border border-gray-200 mb-5">
        <SectionHeader title="Availability" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Available From"
            type="date"
            required
            onChange={(e) =>
              setFormData({ ...formData, availableFrom: e.target.value })
            }
          />

          <Input
            label="Available To"
            type="date"
            required
            onChange={(e) =>
              setFormData({ ...formData, availableTo: e.target.value })
            }
          />
        </div>

        {errors.availability && (
          <p className="text-red-500 text-sm">{errors.availability}</p>
        )}
      </div>

      {/* OPTIONAL DETAILS */}
      <div className="bg-white  text-purple-900   p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 mb-5">
        <SectionHeader title="Optional Details" />

        {/* COLOR SWATCHES */}
        <p className="text-sm text-gray-600 mb-2">Color (Optional)</p>

        <div className="flex items-center gap-4 flex-wrap mb-4">
          {COLOR_SWATCHES.map((c) => (
            <div key={c.name} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    color: c.name,
                    customColor: "",
                  })
                }
                className={`h-10 w-10 rounded-full border 
                ${c.border ? "border-gray-300" : "border-transparent"} 
                flex items-center justify-center 
                ${formData.color === c.name ? "ring-2 ring-purple-600" : ""}`}
                style={{ backgroundColor: c.hex }}
              >
                {formData.color === c.name && (
                  <span className="text-white font-bold text-sm">✓</span>
                )}
              </button>
              <p className="text-xs text-gray-700 mt-1">{c.name}</p>
            </div>
          ))}

          {/* Custom Color Swatch */}
          {formData.customColor && (
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, color: formData.customColor })
                }
                className={`h-10 w-10 rounded-full border flex items-center justify-center
                ${formData.color === formData.customColor ? "ring-2 ring-purple-600" : ""}`}
                style={{
                  backgroundColor: formData.customColor || "#ccc",
                }}
              >
                {formData.color === formData.customColor && (
                  <span className="text-white font-bold text-sm">✓</span>
                )}
              </button>
              <p className="text-xs capitalize text-gray-700 mt-1">
                {formData.customColor}
              </p>
            </div>
          )}
        </div>

        {/* Custom Color Input */}
        <input
          type="text"
          placeholder="Type custom color (e.g., Olive, Teal)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
            focus:ring-2 focus:ring-purple-500"
          value={formData.customColor}
          onChange={(e) =>
            setFormData({
              ...formData,
              customColor: e.target.value.trim(),
              color: e.target.value.trim() || formData.color,
            })
          }
        />

        {/* ITEM OPTIONS */}
        <p className="text-sm text-gray-600 mb-1">
          Additional Item Options (Optional)
        </p>

        <div className="flex flex-wrap gap-2">
          {OPTIONAL_ITEMS.map((opt) => (
            <Chip
              key={opt}
              label={opt}
              selected={formData.itemOptions.includes(opt)}
              onClick={() => toggleOption(opt)}
            />
          ))}

          {/* Custom user-added chip options */}
          {formData.itemOptions
            .filter((opt) => !OPTIONAL_ITEMS.includes(opt))
            .map((customOpt) => (
              <Chip
                key={customOpt}
                label={customOpt}
                selected={true}
                onClick={() => toggleOption(customOpt)}
              />
            ))}
        </div>

        {/* Custom Option Input */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Add custom item option..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm 
              focus:ring-2 focus:ring-purple-500"
            value={formData.customItem}
            onChange={(e) =>
              setFormData({ ...formData, customItem: e.target.value })
            }
          />

          <button
            type="button"
            onClick={addCustomItem}
            disabled={!formData.customItem.trim()}
            className="px-3 py-1.5 bg-[#7A1CA9] text-white rounded-lg text-sm 
              hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>

      {/* UPLOAD IMAGES */}
      <div className="bg-white  text-purple-900   p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <SectionHeader title="Upload Images" />

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center 
          hover:border-[#7a1ca9a1] transition cursor-pointer"
        >
          <input
            type="file"
            id="uploadImg"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          <label
            htmlFor="uploadImg"
            className="cursor-pointer flex flex-col items-center"
          >
            <img
              src="/assets/icons/upload.png"
              alt="Upload Icon"
              className="w-14 h-14 opacity-80 mb-3"
            />
            <p className="text-[#7a1ca9a8] font-medium">
              Click to upload images
            </p>
          </label>
        </div>

        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
        )}

        {/* IMAGE PREVIEWS WITH DELETE BUTTON */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {imagePreviews.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img.url}
                  alt=""
                  className="rounded-lg border h-32 w-full object-cover shadow-sm"
                />

                <button
                  type="button"
                  onClick={() =>
                    setImagePreviews((prev) =>
                      prev.filter((_, index) => index !== i)
                    )
                  }
                  className="absolute top-2 right-2 bg-[#7A1CA9] text-white 
                    w-7 h-7 rounded-full flex items-center justify-center 
                    text-sm opacity-90 hover:bg-[#7A1CA9] transition shadow"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={submitForm}
          className="flex-1 bg-[#7A1CA9] text-white py-2 rounded-lg font-medium 
            hover:bg-purple-700 transition"
        >
          List Item
        </button>

        <button
          className="flex-1 bg-white  text-purple-900   border border-gray-300 py-2 rounded-lg text-gray-700 font-medium 
            hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition"
        >
          Cancel
        </button>
      </div>

    </main>
  );
}
