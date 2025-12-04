import React, { useState } from "react";
import { Info } from "lucide-react";

const ReturnDetails = () => {
  const [depositMethod, setDepositMethod] = useState("cash");
  const [selectedEwallet, setSelectedEwallet] = useState("gcash");

  return (
    <div className="bg-white  text-purple-900   rounded-xl shadow-sm p-6">

      {/* SECTION TITLE */}
      <h2 className="text-lg font-semibold mb-4">
        Return Details & Security Deposit
      </h2>

      {/* INFO BANNER */}
      <div className="flex items-start bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 gap-2 mt-2 ml-1 animate-fadeIn">
        <Info className="w-4 h-4 text-blue-800 mt-0.5" />
        <p className="text-[15px] text-blue-800">
          A refundable security deposit may be required to cover potential
          damage upon return of the item.
        </p>
      </div>

      {/* SECURITY DEPOSIT AMOUNT */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Security Deposit Amount</h3>

        <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold  text-gray-900 ">₱1000.00</p>
            <p className="text-[15px] text-gray-600 mt-1">Set by item owner</p>
          </div>

          {/* SHIELD ICON */}
          <img
            src="/assets/icons/Shield.svg"
            alt="Security Shield"
            className="w-10 h-10 opacity-70"
          />
        </div>
      </div>

      {/* PAYMENT METHOD TITLE */}
      <h3 className="font-medium mb-3">Deposit Payment Method</h3>

      {/* OPTION — CASH ON RETURN */}
      <div className="mb-4">
         <label
          className={`flex items-center text-[15px] gap-3 p-4 border rounded-xl cursor-pointer transition
          ${depositMethod === "cash"
              ? "border-[#7A1CA9]  bg-purple-50"
              : "border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900"
            }`}
        >
          <input
            type="radio"
            name="deposit-method"
            checked={depositMethod === "cash"}
            onChange={() => setDepositMethod("cash")}
            className="w-4 h-4 accent-[#7A1CA9]"
          />
          <span className="font-medium">Cash on Return</span>
        </label>

        {depositMethod === "cash" && (
                <div className="flex items-start gap-2 mb-4 mt-2 ml-1 animate-fadeSlide">
                  <Info className="w-5 h-5 text-gray-500 mt-0.5" />
                  <p className="text-sm text-gray-500">
                    You will pay the security deposit in cash when you receive the item.
            After inspection during item return, the owner will refund your cash
            immediately if no damage is found.
                  </p>
                </div>
              )}
      </div>

      {/* OPTION — DEDUCT FROM CARD */}
      <div className="mb-4">
        <label
          className={`flex items-center text-[15px]  gap-3 p-4 border rounded-xl cursor-pointer transition
          ${depositMethod === "card"
              ? "border-[#7A1CA9]  bg-purple-50"
              : "border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900"
            }`}
        >
          <input
            type="radio"
            name="deposit-method"
            checked={depositMethod === "card"}
            onChange={() => setDepositMethod("card")}
            className="w-4 h-4 accent-[#7A1CA9]"
          />
          <span className="font-medium">Deduct from Card on File</span>
        </label>

        {depositMethod === "card" && (
                <div className="flex items-start gap-2 mb-4 mt-2 ml-1 animate-fadeSlide">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5" />
                  <p className="text-sm text-gray-500">
                    A temporary hold will be placed on your card for the security
            deposit. It will be released after the item is returned without
            damage.
                  </p>
                </div>
              )}
      </div>

      {/* OPTION — E-WALLET */}
      <div className="mb-6">
        <label
          className={`flex items-center text-[15px]  gap-3 p-4 border rounded-xl cursor-pointer transition
          ${depositMethod === "ewallet"
              ? "border-[#7A1CA9]  bg-purple-50"
              : "border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900"
            }`}
        >
          <input
            type="radio"
            name="deposit-method"
            checked={depositMethod === "ewallet"}
            onChange={() => setDepositMethod("ewallet")}
            className="w-4 h-4 accent-[#7A1CA9]"
          />
          <span className="font-medium">Online / E-Wallet</span>
        </label>

        {/* E-WALLET SELECTION (GCASH + MAYA) */}
        {depositMethod === "ewallet" && (
          <div className="mt-4 ml-8 mr-10 animate-fadeSlide">

            <div className="flex gap-3">

            {/* GCASH */}
            <label
              className={`flex items-center text-[15px]  gap-3 flex-1 px-4 py-2.5 rounded-full cursor-pointer transition ${selectedEwallet === "gcash"
                  ? "border border-[#7A1CA9]  bg-purple-50"
                  : "border border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900"
                }`}
              onClick={() => setSelectedEwallet("gcash")}
            >
              <input
                type="radio"
                name="wallet"
                checked={selectedEwallet === "gcash"}
                className="w-4 h-4 accent-[#7A1CA9]"
              />
              <img
                src="/assets/icons/gcash.png"
                alt="GCash"
                className="h-6"
              />
              <span className="font-medium">GCash</span>
            </label>

            {/* MAYA */}
            <label
              className={`flex items-center text-[15px]  gap-3 flex-1 px-4 py-2.5 rounded-full cursor-pointer transition ${selectedEwallet === "maya"
                  ? "border border-[#7A1CA9]  bg-purple-100"
                  : "border border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:bg-gray-900"
                }`}
              onClick={() => setSelectedEwallet("maya")}
            >
              <input
                type="radio"
                name="wallet"
                checked={selectedEwallet === "maya"}
                className="w-4 h-4 accent-[#7A1CA9]"
              />
              <img
                src="/assets/icons/maya.png"
                alt="Maya"
                className="h-6"
              />
              <span className="font-medium">Maya</span>
            </label>
            </div>

             
             
          </div>
        )}

             {depositMethod === "ewallet" && (
                <div className="flex items-start gap-2 mb-4 mt-3 ml-1 animate-fadeSlide">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5" />
                  <p className="text-sm text-gray-500">
                   Deposit will be refunded back to your e-wallet within 1–2 business days.
                  </p>
                </div>
              )}
      </div>

 

      {/* AGREEMENT CHECKBOX */}
      <div className="p-5 rounded-xl mb-6 bg-gray-100">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 mt-0.5 accent-[#7A1CA9]"
          />
          <span className="text-[15px] font-medium  text-gray-900  leading-5">
            I understand that the deposit will be refunded after inspection,
            unless damages are found.
          </span>
        </label>
      </div>

      {/* NOTES FIELD */}
      <div>
        <h3 className=" text-[16px] text-purple-900 mb-2">
          Additional notes regarding return condition (Optional)
        </h3>

        <textarea
          rows="4"
          placeholder="Enter any special notes or concerns about the item's return..."
          className= "w-full h-24 px-4 py-3 text-[15px] placeholder:text-gray-400 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          maxLength={500}
        />
        <p className="text-[15px] text-gray-500 mt-0.5">0/500 characters</p>
      </div>

      {/* ANIMATION STYLES */}
      <style>{`
        .animate-fadeSlide {
          animation: fadeSlide .25s ease-out;
        }
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ReturnDetails;
