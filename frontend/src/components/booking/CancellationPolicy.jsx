import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-blue-900 mb-2">Flexible Cancellation</p>
              <p className="text-sm text-blue-800">
                Free cancellation up to 48 hours before the rental start date. Get a full refund minus payment processing fees.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Cancellation Timeline & Refunds</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">48+ hours before pickup</p>
                <p className="text-sm text-gray-600">100% refund (excluding processing fees)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">24-48 hours before pickup</p>
                <p className="text-sm text-gray-600">50% refund</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Less than 24 hours before pickup</p>
                <p className="text-sm text-gray-600">No refund</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 space-y-2">
          <p>• Refunds will be processed within 5-7 business days</p>
          <p>• Security deposits are fully refundable upon item return and inspection</p>
          <p>• Owner reserves the right to cancel bookings due to item unavailability</p>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
