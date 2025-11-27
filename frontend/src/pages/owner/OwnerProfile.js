import React, { useState } from "react";
import Sidebar from "../../components/layouts/OwnerSidebar";
import profilePicture from "../../assets/profile/prof_pic.jpg";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Genlord",
    lastName: "Loubot",
    email: "genlord@hirent.com",
    phone: "+63 912 345 6789",
    address: "123 Main Street, Manila",
    city: "Manila",
    zipCode: "1000",
    country: "Philippines",
    businessName: "Genlord's Rentals",
    businessType: "Individual",
    taxId: "123-456-789-000",
    
    // Bank Account
    bankName: "BDO Unibank",
    accountNumber: "1234567890",
    accountName: "Genlord Loubot",
    
    // E-wallet
    ewalletProvider: "Maya",
    ewalletNumber: "+63 912 345 6789",
    ewalletName: "Genlord Loubot"
  });

  const [profileImage, setProfileImage] = useState(profilePicture);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSave = () => {
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="cart-scale flex-1 mt-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your personal information and account settings
            </p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#7A1CA9] text-white px-6 py-2.5 rounded-lg hover:bg-[#7A1CA9]/90 transition font-medium text-sm"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-[#7A1CA9] text-white px-6 py-2.5 rounded-lg hover:bg-[#7A1CA9]/90 transition font-medium text-sm"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-[#7A1CA9]/10 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-[#7A1CA9] text-white p-2 rounded-full cursor-pointer hover:bg-[#7A1CA9]/90 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-sm text-gray-600">{profileData.businessName}</p>
                <p className="text-xs text-gray-500 mt-1">{profileData.email}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#7A1CA9]">15</p>
                    <p className="text-xs text-gray-600">Total Listings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#7A1CA9]">₱5,500</p>
                    <p className="text-xs text-gray-600">Monthly Earnings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone Verified</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ID Verified</span>
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded">Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={profileData.businessName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <select
                    name="businessType"
                    value={profileData.businessType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <option value="Individual">Individual</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID / TIN</label>
                  <input
                    type="text"
                    name="taxId"
                    value={profileData.taxId}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Payment Information - Bank Account */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Bank Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <select
                    name="bankName"
                    value={profileData.bankName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <option value="">Select Bank</option>
                    <option value="BDO Unibank">BDO Unibank</option>
                    <option value="BPI">BPI (Bank of the Philippine Islands)</option>
                    <option value="Metrobank">Metrobank</option>
                    <option value="PNB">PNB (Philippine National Bank)</option>
                    <option value="Security Bank">Security Bank</option>
                    <option value="UnionBank">UnionBank</option>
                    <option value="Landbank">Landbank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={profileData.accountNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="1234567890"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <input
                    type="text"
                    name="accountName"
                    value={profileData.accountName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Genlord Loubot"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* E-Wallet Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">E-Wallet Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-Wallet Provider</label>
                  <select
                    name="ewalletProvider"
                    value={profileData.ewalletProvider}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <option value="">Select E-Wallet</option>
                    <option value="Maya">Maya (PayMaya)</option>
                    <option value="GCash">GCash</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="ewalletNumber"
                    value={profileData.ewalletNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="+63 912 345 6789"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <input
                    type="text"
                    name="ewalletName"
                    value={profileData.ewalletName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Genlord Loubot"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing ? 'border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <span className="text-sm font-medium text-gray-700">Change Password</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">Disabled</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
