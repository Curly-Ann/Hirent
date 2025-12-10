import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/layouts/OwnerSidebar";
import { AuthContext } from "../../context/AuthContext";

// Default profile template
const defaultProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  businessName: "",
  businessType: "",
  taxId: "",
  bankName: "",
  accountNumber: "",
  accountName: "",
  ewalletProvider: "",
  ewalletNumber: "",
  ewalletName: "",
};

export default function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState(defaultProfile);
  const [profileImage, setProfileImage] = useState("");
  const [stats, setStats] = useState({ totalListings: 0, monthlyEarnings: 0 });
  const [verification, setVerification] = useState({ emailVerified: false, phoneVerified: false, idVerified: false });

  // Fetch real user profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        const data = await res.json();
        if (data.success && data.user) {
          // Split name into first and last
          const nameParts = data.user.name ? data.user.name.split(" ") : ["", ""];
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setProfileData({
            ...defaultProfile,
            firstName,
            lastName,
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            city: data.user.city || "",
            zipCode: data.user.postalCode || "",
            businessName: data.user.businessName || "",
            businessType: data.user.businessType || "",
            taxId: data.user.taxId || "",
            bankName: data.user.bankName || "",
            accountNumber: data.user.accountNumber || "",
            accountName: data.user.accountName || "",
            ewalletProvider: data.user.ewalletProvider || "",
            ewalletNumber: data.user.ewalletNumber || "",
            ewalletName: data.user.ewalletName || "",
          });

          setProfileImage(data.user.avatar || "");

          // Set verification status
          setVerification({
            emailVerified: data.user.emailVerified || false,
            phoneVerified: data.user.phoneVerified || false,
            idVerified: data.user.idVerified || false,
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    loadProfile();
  }, []);

  // Fetch owner stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/owners/stats", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        const data = await res.json();
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    loadStats();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read file as base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // This will be base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Please login again.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
          city: profileData.city,
          zipCode: profileData.zipCode,
          businessName: profileData.businessName,
          businessType: profileData.businessType,
          taxId: profileData.taxId,
          bankName: profileData.bankName,
          accountNumber: profileData.accountNumber,
          accountName: profileData.accountName,
          ewalletProvider: profileData.ewalletProvider,
          ewalletNumber: profileData.ewalletNumber,
          ewalletName: profileData.ewalletName,
          avatar: profileImage, // Include avatar in update
        }),
      });

      const data = await response.json();

      // Handle validation errors
      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errorMap = {};
          data.errors.forEach((err) => {
            errorMap[err.param] = err.msg;
          });
          setErrors(errorMap);
          return; // Stay in editing mode
        }
        alert(data.message || "Failed to save profile");
        return;
      }

      // Success
      if (data.success && data.user) {
        updateUser(data.user);
        setErrors({});
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Network error: " + error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="flex bg-gray-50 min-h-screen ">
      <Sidebar />

      <main className="flex-1 p-8 ml-60">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Profile Settings
            </h1>
            <p className="text-gray-500 text-sm mt-1">
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
                className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50     transition font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white  rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-[#7A1CA9]/10 rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl text-[#7A1CA9]">👤</div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-[#7A1CA9] text-white p-2 rounded-full cursor-pointer hover:bg-[#7A1CA9]/90 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold  text-gray-900  mt-4">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {profileData.businessName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {profileData.email}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#7A1CA9]">{stats.totalListings || 0}</p>
                    <p className="text-xs text-gray-600">Total Listings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#7A1CA9]">₱{(stats.monthlyEarnings || 0).toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Monthly Earnings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="text-sm font-semibold  text-gray-900  mb-4">
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    verification.emailVerified 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {verification.emailVerified ? "Verified" : "Pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone Verified</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    verification.phoneVerified 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {verification.phoneVerified ? "Verified" : "Pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ID Verified</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    verification.idVerified 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {verification.idVerified ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold  text-gray-900  mb-6">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.firstName ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.lastName ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.email ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.phone ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.address ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.city ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.zipCode ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold  text-gray-900  mb-6">
                Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={profileData.businessName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.businessName ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={profileData.businessType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  >
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Sole Proprietorship">
                      Sole Proprietorship
                    </option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID / TIN
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={profileData.taxId}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.taxId ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.taxId && <p className="text-red-500 text-xs mt-1">{errors.taxId}</p>}
                </div>
              </div>
            </div>

            {/* Payment Information - Bank Account */}
            <div className="bg-white  rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold  text-gray-900  mb-6">
                Bank Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <select
                    name="bankName"
                    value={profileData.bankName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  >
                    <option value="">Select Bank</option>
                    <option value="BDO Unibank">BDO Unibank</option>
                    <option value="BPI">
                      BPI (Bank of the Philippine Islands)
                    </option>
                    <option value="Metrobank">Metrobank</option>
                    <option value="PNB">PNB (Philippine National Bank)</option>
                    <option value="Security Bank">Security Bank</option>
                    <option value="UnionBank">UnionBank</option>
                    <option value="Landbank">Landbank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={profileData.accountNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="1234567890"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.accountNumber ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Name
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={profileData.accountName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="John Doe"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.accountName ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.accountName && <p className="text-red-500 text-xs mt-1">{errors.accountName}</p>}
                </div>
              </div>
            </div>

            {/* E-Wallet Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold  text-gray-900  mb-6">
                E-Wallet Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Wallet Provider
                  </label>
                  <select
                    name="ewalletProvider"
                    value={profileData.ewalletProvider}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  >
                    <option value="">Select E-Wallet</option>
                    <option value="Maya">Maya (PayMaya)</option>
                    <option value="GCash">GCash</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="ewalletNumber"
                    value={profileData.ewalletNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="+63 912 345 6789"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.ewalletNumber ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.ewalletNumber && <p className="text-red-500 text-xs mt-1">{errors.ewalletNumber}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Name
                  </label>
                  <input
                    type="text"
                    name="ewalletName"
                    value={profileData.ewalletName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="John Doe"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
                      errors.ewalletName ? "border-red-500" :
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#7A1CA9]"
                        : "bg-gray-50     border-gray-200"
                    }`}
                  />
                  {errors.ewalletName && <p className="text-red-500 text-xs mt-1">{errors.ewalletName}</p>}
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white  rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold  text-gray-900  mb-6">
                Security Settings
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50     transition">
                  <span className="text-sm font-medium text-gray-700">
                    Change Password
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50     transition">
                  <span className="text-sm font-medium text-gray-700">
                    Two-Factor Authentication
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                    Disabled
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
