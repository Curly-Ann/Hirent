import React from 'react';

const LateReturnPolicy = () => {
  return (
    <div className="bg-white  text-purple-900   rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Late Return Policy</h2>
      
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-orange-900 mb-2">
              Please return the item on time to avoid additional charges.
            </p>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Late fee: ₱200 per hour (first 3 hours)</li>
              <li>• Late fee: ₱500 per day (after 3 hours)</li>
              <li>• Grace period: 30 minutes (no charge)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-medium text-[15px]  text-gray-900 ">Need to extend your rental?</p>
            <p className="text-sm text-gray-600">Contact the owner before your rental period ends to request an extension.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-medium text-[15px]  text-gray-900 ">Emergency situations</p>
            <p className="text-sm text-gray-600">In case of emergencies preventing timely return, contact support immediately to avoid penalties.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LateReturnPolicy;
