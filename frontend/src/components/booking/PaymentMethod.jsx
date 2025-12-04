import React, { useState } from "react";
import { Info } from "lucide-react";

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
    <div className="bg-white  text-purple-900   rounded-xl shadow-sm px-6 py-3 border border-gray-200">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-[16px] text-purple-900">Payment Method</h2>
        <img
          src="/assets/icons/paymentMethod.png"
          alt="Payment Methods"
          className="h-14 object-contain"
        />
      </div>

      {/* --------------------------- CASH ON DELIVERY --------------------------- */}
      <div className="mb-4">
        <label
  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition 
    border ${paymentMethod === "cod" ? "border-[#7A1CA9]  bg-purple-50" : "border-gray-300"}`}
>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "cod"}
            onChange={() => handlePaymentSelect("cod")}
            className="w-4 h-4 accent-[#7A1CA9]"
          />

          <img src="/assets/icons/cod.svg" alt="COD" className="w-6 h-6" />
          <span className="font-medium text-[15px]">Cash on Delivery</span>
        </label>

            {paymentMethod === "cod" && (
        <div className="flex items-start gap-2 mt-2 ml-1 animate-fadeSlide">
          <Info className="w-4 h-4 text-gray-500 mt-0.5" />
          <p className="text-sm text-gray-500">
            Cash payment will be collected upon delivery or during pickup.
          </p>
        </div>
      )}
      </div>

      {/* --------------------------- CREDIT / DEBIT CARD --------------------------- */}
      <div className="mb-4">
        <label
  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition 
    border ${paymentMethod === "card" ? "border-[#7A1CA9]  bg-purple-50" : "border-gray-300"}`}
>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "card"}
            onChange={() => handlePaymentSelect("card")}
            className="w-4 h-4 accent-[#7A1CA9]"
          />

          <img src="/assets/icons/Credit.svg" alt="Card" className="w-5 h-5" />
          <span className="font-medium text-[15px]">Credit / Debit Card</span>
        </label>



        {showCardForm && (
          <div className="mt-4 ml-6 mb-3 space-y-3 animate-fadeSlide">
            <p className="text-[15px] font-medium mb-1">Add a new card</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Card Number"
                className="px-4 py-2 text-[15px] text-black border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="px-4 py-2 text-[15px] border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Cardholder Name"
                className="px-4 py-2 text-[15px] border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                className="px-4 py-2  text-[15px] border bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

          </div>


        )}

        {paymentMethod === "card" && (
          <div className="flex items-start gap-2 mt-2 ml-1 animate-fadeSlide">
            <Info className="w-4 h-4 text-gray-500 mt-0.5" />
            <p className="text-sm text-gray-500">
              Your card details are encrypted and processed safely through our payment partner.
            </p>
          </div>
        )}

      </div>

      {/* --------------------------- E-WALLET --------------------------- */}
      <div className="mb-3">
        <label
  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition 
    border ${paymentMethod === "ewallet" ? "border-[#7A1CA9]  bg-purple-50" : "border-gray-300"}`}
>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "ewallet"}
            onChange={() => handlePaymentSelect("ewallet")}
            className="w-4 h-4 accent-[#7A1CA9]"
          />

          <img src="/assets/icons/ewallet.svg" alt="E-Wallet" className="w-6 h-6" />
          <span className="font-medium text-[15px]">Online / E-Wallet</span>
        </label>

        {showEwallet && (
          <div className="mt-4 ml-8 mr-10 animate-fadeSlide">

            {/* Side-by-side layout */}
            <div className="flex gap-3">

              {/* GCash Option */}
              <label
                className={`flex items-center gap-3 flex-1 px-4 py-2.5 rounded-full cursor-pointer transition
                  ${ewalletSelected === "gcash"
                    ? "border border-[#7A1CA9]  bg-purple-50"
                    : "border border-gray-300 bg-white  text-purple-900  "
                  }`}
                onClick={() => setEwalletSelected("gcash")}
              >
                <input
                  type="radio"
                  name="ewalletOption"
                  checked={ewalletSelected === "gcash"}
                  onChange={() => setEwalletSelected("gcash")}
                  className="w-4 h-4 accent-[#7A1CA9]"
                />
                <img src="/assets/icons/gcash.png" alt="GCash" className="h-6" />
                <span className="font-medium text-[15px]">GCash</span>
              </label>

              {/* Maya Option */}
              <label
                className={`flex items-center gap-3 flex-1 px-4 py-2.5 rounded-full cursor-pointer transition
                  ${ewalletSelected === "maya"
                    ? "border border-[#7A1CA9]  bg-purple-50"
                    : "border border-gray-300 bg-white  text-purple-900  "
                  }`}
                onClick={() => setEwalletSelected("maya")}
              >
                <input
                  type="radio"
                  name="ewalletOption"
                  checked={ewalletSelected === "maya"}
                  onChange={() => setEwalletSelected("maya")}
                  className="w-4 h-4 accent-[#7A1CA9]"
                />
                <img src="/assets/icons/maya.png" alt="Maya" className="h-6" />
                <span className="font-medium text-[15px]">Maya</span>
              </label>

            </div>
          </div>
        )}
      </div>


      {paymentMethod === "ewallet" && (
        <div className="flex items-start gap-2 mb-4 mt-2 ml-1 animate-fadeSlide">
          <Info className="w-4 h-4 text-gray-500 mt-0.5" />
          <p className="text-sm text-gray-500">
            Your payment will be redirected securely to third-party e-wallet providers.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
