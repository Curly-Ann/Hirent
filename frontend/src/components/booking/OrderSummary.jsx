import React from 'react';

const OrderSummary = ({ product, pricing, rentalData }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  return (
    <div className="bg-white   rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 text-purple-900  ">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {/* Product Info */}
        <div className="flex items-center justify-between">
          <h3 className="font-medium  text-gray-900 ">{product.name}</h3>

          <p className="text-[#7A1CA9] font-bold">
            ₱{product.pricePerDay}
            <span className="text-[15px] font-normal text-gray-600"> per day</span>
          </p>
        </div>


        {/* Price Breakdown */}
        <div className="border-t pt-4 border-gray-300">

          {/* Subtotal */}
          <div className="flex justify-between text-[15px] mb-1">
            <span className="text-gray-900">Subtotal</span>
            <span className=" text-gray-900 ">
              {pricing.subtotal > 0 ? formatCurrency(pricing.subtotal) : "---"}
            </span>
          </div>

          {/* Subtotal Explanation */}
          {pricing.subtotal > 0 && (
            <p className="text-sm text-[#7A1CA9] mb-3 ml-1">
              ({rentalData.days} {rentalData.days === 1 ? "day" : "days"}
              {" × "}
              {formatCurrency(product.pricePerDay)}
              /day)
            </p>
          )}

          {/* Discount — ALWAYS ₱0.00 */}
          <div className="flex justify-between text-[15px] mb-2">
            <span className="text-gray-900">Discount</span>
            <span className=" text-gray-900 ">₱0.00</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-[15px] mb-2">
            <span className="text-gray-900">Shipping Fee</span>
            <span className=" text-gray-900 ">
              {pricing.shippingFee > 0
                ? `+${formatCurrency(pricing.shippingFee)}`
                : "Free"}
            </span>
          </div>

          {/* Security Deposit */}
          <div className="flex justify-between text-[15px] mb-2">
            <span className="text-gray-900">Security Deposit</span>
            <span className=" text-gray-900 ">
              +{formatCurrency(pricing.securityDeposit)}
            </span>
          </div>
        </div>

        {/* Total + Actions */}
        <div className="border-t pt-4 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold  text-gray-900 ">Total</span>
            <span className="text-xl font-bold  text-gray-900 ">
              {formatCurrency(pricing.total)}
            </span>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              Select rental dates to see total price
            </p>
          </div>

          <button
            className="w-full bg-gradient-to-r from-[#b23cd9] to-[#7A1CA9] text-white text-[15px] py-3 
  rounded-lg font-medium transition-all duration-300 ease-in-out 
  hover:opacity-90 active:scale-95 mb-3"
          >
            Place Booking
          </button>

          <button
            className="w-full bg-white  border text-[15px] border-gray-300 text-purple-900 py-2.5 
  rounded-lg font-medium transition-all duration-300 ease-in-out 
  hover:bg-gray-50 active:scale-95"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
