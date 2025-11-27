import React from 'react';

const OrderSummary = ({ product, pricing, rentalData }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {/* Product Info */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-[#7A1CA9] font-bold">
            ₱{product.pricePerDay}
            <span className="text-sm text-gray-500"> per day</span>
          </p>
        </div>
        
        {/* Price Breakdown */}
        <div className="border-t pt-4">

          {/* Subtotal */}
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">
              {pricing.subtotal > 0 ? formatCurrency(pricing.subtotal) : "---"}
            </span>
          </div>

          {/* Subtotal Explanation */}
          {pricing.subtotal > 0 && (
            <p className="text-xs text-gray-500 mb-3 ml-1">
              ({rentalData.days} {rentalData.days === 1 ? "day" : "days"}
              {" × "}
              {formatCurrency(product.pricePerDay)}
              /day)
            </p>
          )}

          {/* Discount — ALWAYS ₱0.00 */}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Discount</span>
            <span className="text-gray-900">₱0.00</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Shipping Fee</span>
            <span className="text-gray-900">
              {pricing.shippingFee > 0
                ? `+${formatCurrency(pricing.shippingFee)}`
                : "Free"}
            </span>
          </div>

          {/* Security Deposit */}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Security Deposit</span>
            <span className="text-gray-900">
              +{formatCurrency(pricing.securityDeposit)}
            </span>
          </div>
        </div>
        
        {/* Total + Actions */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(pricing.total)}
            </span>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              Select rental dates to see total price
            </p>
          </div>
          
          <button className="w-full bg-[#7A1CA9] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition mb-3">
            Place Booking
          </button>
          
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
