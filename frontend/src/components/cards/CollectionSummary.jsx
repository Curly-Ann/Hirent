import React from "react";
import { CircleCheckBig, Clock, Package } from "lucide-react";

const CollectionSummary = ({
  navigate,
  collectionItems,
  approvedItems,
  waitingCount,
  approvedTotals,
  approvedSecurityDepositTotal,
  approvedGrandTotalWithDeposit,
}) => {
  return (
    <div>
      {/* Rental Summary */}
      <div className="bg-white px-4 py-3 rounded-lg shadow-sm space-y-1 mr-5">
        <h2 className="font-semibold text-[16px] mb-2">Collection Summary</h2>

        <div className="flex items-center text-gray-600 mb-1 gap-1.5">
          <Package className="w-4 h-4" />
          <p className="text-[13px]">
            {collectionItems.length} item{collectionItems.length > 1 ? "s" : ""}{" "}
            in collection
          </p>
        </div>

        {/* Approved + Waiting */}
        <div className="flex flex-col gap-1 ml-4 text-[13px]">
          {approvedItems.length > 0 && (
            <div className="flex items-center gap-1.5 text-green-700">
              <CircleCheckBig className="w-3 h-3" />
              <span>{approvedItems.length} approved</span>
            </div>
          )}

          {waitingCount > 0 && (
            <div className="flex items-center mb-2 gap-1.5 text-yellow-700">
              <Clock className="w-3 h-3" />
              <span>{waitingCount} waiting for approval</span>
            </div>
          )}
        </div>

        <hr className="my-3" />

        {/* Approved Items */}
        {approvedItems.length > 0 && (
          <div className="text-[13px] space-y-1 pb-2">
            <p className="font-semibold mt-3 mb-3">Approved Items</p>
            {approvedItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>{item.itemId?.title || item.name || 'Unknown Item'}</span>
                <span>₱{(item.itemId?.pricePerDay || item.price || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        <hr className="my-3" />

        {/* Totals */}
        <div className="text-[13px] space-y-1 pt-2 pb-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₱{(approvedTotals?.subtotal || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {approvedItems.length > 0
                ? (approvedTotals?.shipping || 0) === 0
                  ? "Free"
                  : `₱${(approvedTotals?.shipping || 0).toFixed(2)}`
                : "--"}
            </span>
          </div>

          {(approvedTotals?.discount || 0) > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Discount</span>
              <span>-₱{(approvedTotals?.discount || 0).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Security Deposit</span>
            <span>
              {approvedItems.length > 0
                ? `₱${(approvedSecurityDepositTotal || 0).toFixed(2)}`
                : "--"}
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₱{(approvedGrandTotalWithDeposit || 0).toFixed(2)}</span>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="space-y-3">
          {approvedItems.length > 0 && (
            <div className="bg-blue-50 text-blue-700 border border-blue-200 p-3 rounded-md text-[13px]">
              Continue to booking for each approved item to finalize your rental
              dates and complete payment.
            </div>
          )}

          {waitingCount > 0 && (
            <div className="bg-yellow-50 text-yellow-900 border border-yellow-200 p-3 rounded-md text-[13px]">
              {waitingCount} item{waitingCount > 1 ? "s" : ""} waiting for owner
              approval.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Box */}
      <div className="bg-gray-100 p-4 mt-3 mb-10 mr-5 rounded-lg text-gray-700 text-[13px]">
        <ul className="space-y-1">
          <li>✓ Secure checkout</li>
          <li>✓ Fast approval process</li>
          <li>✓ Owner verification guarantee</li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionSummary;
