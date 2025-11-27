import React from 'react';

const DeliveryMethod = ({ deliveryMethod, setDeliveryMethod }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
      
      <h3 className="font-medium mb-4">Delivery Method</h3>
      
      {/* Delivery Option */}
      <label className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 mb-3">
        <input
          type="radio"
          name="delivery"
          checked={deliveryMethod === 'delivery'}
          onChange={() => setDeliveryMethod('delivery')}
          className="w-4 h-4 mt-1 text-[#7A1CA9]"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <img src="/assets/icons/delivery.png" alt="Delivery" className="w-5 h-5" />
            <span className="font-medium">Delivery</span>
          </div>
          <p className="text-sm text-gray-600">Item will be delivered to your address</p>
          <p className="text-sm text-[#7A1CA9] font-medium mt-1">+₱15 shipping fee</p>
        </div>
      </label>
      
      {/* Pickup Option */}
      <label className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
        <input
          type="radio"
          name="delivery"
          checked={deliveryMethod === 'pickup'}
          onChange={() => setDeliveryMethod('pickup')}
          className="w-4 h-4 mt-1 text-[#7A1CA9]"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <img src="/assets/icons/pickup.png" alt="Pickup" className="w-5 h-5" />
            <span className="font-medium">Pickup</span>
          </div>
          <p className="text-sm text-gray-600">Pick up the item from the owner's location</p>
          <p className="text-sm text-green-600 font-medium mt-1">Free - No Shipping Fee</p>
        </div>
      </label>

      {/* Notes for Owner */}
      <div className="mt-6">
        <h3 className="font-medium mb-2">Notes for Owner (Optional)</h3>
        <textarea
          placeholder="Any special requests or instructions for the owner..."
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">0/500 characters</p>
      </div>
    </div>
  );
};

export default DeliveryMethod;
