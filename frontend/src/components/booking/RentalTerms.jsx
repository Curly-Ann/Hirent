import React, { useState } from 'react';

const RentalTerms = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Rental Terms & Conditions</h2>
      
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <h3 className="font-medium text-gray-900 mb-3">Key Terms Summary</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 mt-1">•</span>
            <span>You must be at least 18 years old to rent items on HiRent</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 mt-1">•</span>
            <span>Valid government-issued ID required for verification</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 mt-1">•</span>
            <span>Renter is responsible for any damage or loss during rental period</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 mt-1">•</span>
            <span>Items must be returned in the same condition as received</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 mt-1">•</span>
            <span>Subletting or transferring the rental to another party is prohibited</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 mt-1">•</span>
            <span>Late returns are subject to additional fees as outlined in the Late Return Policy</span>
          </li>
        </ul>
      </div>
      
      {showFullTerms && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Full Terms and Conditions</h4>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              <strong>1. Rental Agreement:</strong> By confirming this booking, you enter into a legally binding rental agreement with the item owner. You agree to use the rented item responsibly and return it on time in its original condition.
            </p>
            <p>
              <strong>2. Payment:</strong> Full payment including rental fees, security deposit, and applicable charges must be completed before item pickup. Payment methods accepted include credit/debit cards, e-wallets, and cash on delivery.
            </p>
            <p>
              <strong>3. Security Deposit:</strong> The security deposit will be held and refunded after successful return and inspection of the item. Deductions may apply for damages, cleaning, or late returns.
            </p>
            <p>
              <strong>4. Liability & Insurance:</strong> Renters are fully liable for loss, theft, or damage to rented items. Optional insurance coverage is available for additional protection.
            </p>
            <p>
              <strong>5. Usage Restrictions:</strong> Items must only be used for their intended purpose. Misuse, commercial use (unless specified), or illegal activities are strictly prohibited.
            </p>
            <p>
              <strong>6. Dispute Resolution:</strong> Any disputes will be resolved through HiRent's dispute resolution process. Both parties agree to cooperate in good faith.
            </p>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setShowFullTerms(!showFullTerms)}
        className="text-purple-600 text-sm font-medium hover:text-purple-700 mb-4"
      >
        {showFullTerms ? 'Hide Full Terms' : 'Read Full Terms & Conditions'}
      </button>
      
      <div className="border-t pt-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-5 h-5 mt-0.5 text-purple-600 rounded border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the <span className="font-medium text-purple-600">Rental Terms & Conditions</span>, <span className="font-medium text-purple-600">Cancellation Policy</span>, and <span className="font-medium text-purple-600">Late Return Policy</span>. I understand that I am responsible for the rented item during the rental period.
          </span>
        </label>
      </div>
    </div>
  );
};

export default RentalTerms;
