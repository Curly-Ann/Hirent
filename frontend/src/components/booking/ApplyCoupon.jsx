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
    <div className="bg-white  text-purple-900   rounded-lg shadow-sm p-6">
      <h2 className="text-[16px] text-purple-900 mb-4">Apply Coupon</h2>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] text-black font-medium">
          Enter Code (Optional)
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            value={code}
            placeholder="e.g., SAVE10"
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-4 py-2 border text-[15px] font-base border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleApply}
            className="px-4 py-1 bg-[#7A1CA9] text-sm text-white rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Apply
          </button>
        </div>
      </div>

    </div>
  );
};

export default ApplyCoupon;
