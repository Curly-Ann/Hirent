import React, { useState } from "react";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showEwallet, setShowEwallet] = useState(false);

  // Track selected e-wallet
  const [ewalletSelected, setEwalletSelected] = useState("gcash");

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setShowCardForm(method === "card");
    setShowEwallet(method === "ewallet");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <img
          src="/assets/icons/paymentMethod.png"
          alt="Payment Methods"
          className="h-10 object-contain"
        />
      </div>

      {/* --------------------------- CASH ON DELIVERY --------------------------- */}
      <div className="mb-4">
        <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "cod"}
            onChange={() => handlePaymentSelect("cod")}
            className="w-4 h-4 text-purple-600"
          />

          <img src="/assets/icons/cod.png" alt="COD" className="w-6 h-6" />
          <span className="font-medium">Cash on Delivery</span>
        </label>

        {paymentMethod === "cod" && (
          <p className="text-sm text-gray-500 mt-2 ml-12 animate-fadeIn">
            Cash payment will be collected upon delivery or during pickup.
          </p>
        )}
      </div>

      {/* --------------------------- CREDIT / DEBIT CARD --------------------------- */}
      <div className="mb-4">
        <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "card"}
            onChange={() => handlePaymentSelect("card")}
            className="w-4 h-4 text-purple-600"
          />

          <img src="/assets/icons/Credit.png" alt="Card" className="w-6 h-6" />
          <span className="font-medium">Credit / Debit Card</span>
        </label>

        {showCardForm && (
          <div className="mt-4 ml-8 space-y-4 animate-fadeIn">
            <p className="text-sm font-medium mb-2">Add a new card</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Card Number"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Cardholder Name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* --------------------------- E-WALLET --------------------------- */}
      <div className="mb-4">
        <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "ewallet"}
            onChange={() => handlePaymentSelect("ewallet")}
            className="w-4 h-4 text-purple-600"
          />

          <img src="/assets/icons/ewallet.png" alt="E-Wallet" className="w-6 h-6" />
          <span className="font-medium">Online / E-Wallet</span>
        </label>

        {showEwallet && (
          <div className="mt-4 ml-8 animate-fadeIn">

            {/* Side-by-side layout */}
            <div className="flex gap-3">

              {/* GCash Option */}
              <label
                className={`flex items-center gap-3 flex-1 p-3 rounded-full cursor-pointer transition
                  ${ewalletSelected === "gcash"
                    ? "border-2 border-purple-500 bg-purple-50"
                    : "border border-gray-300 bg-white"
                  }`}
                onClick={() => setEwalletSelected("gcash")}
              >
                <input
                  type="radio"
                  name="ewalletOption"
                  checked={ewalletSelected === "gcash"}
                  onChange={() => setEwalletSelected("gcash")}
                  className="w-4 h-4 text-purple-600"
                />
                <img src="/assets/icons/gcash.png" alt="GCash" className="h-6" />
                <span className="font-medium">GCash</span>
              </label>

              {/* Maya Option */}
              <label
                className={`flex items-center gap-3 flex-1 p-3 rounded-full cursor-pointer transition
                  ${ewalletSelected === "maya"
                    ? "border-2 border-purple-500 bg-purple-50"
                    : "border border-gray-300 bg-white"
                  }`}
                onClick={() => setEwalletSelected("maya")}
              >
                <input
                  type="radio"
                  name="ewalletOption"
                  checked={ewalletSelected === "maya"}
                  onChange={() => setEwalletSelected("maya")}
                  className="w-4 h-4 text-purple-600"
                />
                <img src="/assets/icons/maya.png" alt="Maya" className="h-6" />
                <span className="font-medium">Maya</span>
              </label>

            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Your payment will be redirected securely to third-party e-wallet providers.
      </p>
    </div>
  );
};

export default PaymentMethod;
