import React, { useState } from 'react';

export default function AddNewItemForm() {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    pricePerDay: '',
    condition: '',
    location: '',
    availableFrom: '',
    availableTo: '',
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs for selected images
    const previews = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Item</h1>
        <p className="text-sm text-gray-500">List a new item for rent on HIRENT</p>
      </div>

      {/* Form Box */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Add New Item</h2>

        <div className="space-y-5">
          {/* Item Name and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                placeholder='e.g "Sony EOS 5S Camera"'
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category
              </label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-purple-600"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="camera">Camera</option>
                <option value="sports">Sports Equipment</option>
                <option value="tools">Tools</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your item in detail..."
              rows="4"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-sm placeholder:text-gray-400"
            ></textarea>
          </div>

          {/* Price, Condition, Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Price per Day
              </label>
              <input
                type="text"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleInputChange}
                placeholder="Enter price..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm placeholder:text-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-purple-600"
              >
                <option value="">Select condition</option>
                <option value="brand-new">Brand New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Type where you are based"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center bg-white hover:border-purple-400 transition">
              <input
                type="file"
                id="fileUpload"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  {/* Upload Icon - Using your upload.png */}
                  <img 
                    src="/assets/icons/upload.png" 
                    alt="Upload" 
                    className="w-14 h-14 mb-3"
                  />
                  <p className="text-purple-600 text-sm font-medium mb-3">
                    Drag and drop images here, or click to select
                  </p>
                  <span className="px-6 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition text-sm font-medium inline-block">
                    Select Image
                  </span>
                </div>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 text-lg leading-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Availability
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Available From
                </label>
                <input
                  type="date"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Available To
                </label>
                <input
                  type="date"
                  name="availableTo"
                  value={formData.availableTo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              className="flex-1 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition font-medium text-sm shadow-sm"
            >
              List Item
            </button>
            <button 
              type="button"
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition font-medium text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
