import React, { useState } from 'react';

const ApplyCoupon = ({ couponData, setCouponData }) => {
  const [code, setCode] = useState('');

  const handleApply = () => {
    // Frontend only - just toggle the coupon
    if (code.trim()) {
      setCouponData({ applied: true, discount: 10 });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
      
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter Code (Optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-[#7A1CA9] text-white rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ApplyCoupon;
