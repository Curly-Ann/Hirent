import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ApplyCoupon from '../../../components/booking/ApplyCoupon';
import DeliveryMethod from '../../../components/booking/DeliveryMethod';
import ItemSummary from '../../../components/booking/ItemSummary';
import OrderSummary from '../../../components/booking/OrderSummary';
import PaymentMethod from '../../../components/booking/PaymentMethod';
import RentalPeriod from '../../../components/booking/RentalPeriod';
import ReturnDetails from '../../../components/booking/ReturnDetails';
import CancellationPolicy from '../../../components/booking/CancellationPolicy';
import RentalTerms from '../../../components/booking/RentalTerms';
import LateReturnPolicy from '../../../components/booking/LateReturnPolicy';
import { ArrowLeft, CalendarCheck } from "lucide-react";

const Booking = () => {
  const navigate = useNavigate();
  const [rentalData, setRentalData] = useState({
    startDate: '',
    endDate: '',
    days: 4,
  });

  const [couponData, setCouponData] = useState({
    applied: true,
    discount: 10,
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');

  const productData = {
    name: 'Professional DSLR Camera Kit',
    owner: 'Sarah Johnson',
    location: 'Naga City, Camarines Sur',
    pricePerDay: 800,
    image: '/assets/products/Canon.png',
  };

  const calculatePricing = () => {
    const subtotal = productData.pricePerDay * rentalData.days;
    const discountAmount = couponData.applied ? (subtotal * couponData.discount) / 100 : 0;
    const shippingFee = deliveryMethod === 'delivery' ? 20 : 0;
    const securityDeposit = 700;
    const total = subtotal - discountAmount + shippingFee + securityDeposit;

    return {
      subtotal,
      discount: discountAmount,
      shippingFee,
      securityDeposit,
      total,
    };
  };

  const pricing = calculatePricing();

  return (
    <div className="flex min-h-screen px-4 pl-24 bg-[#fbfbfb] pt-10 pb-20">

      {/* MAIN WRAPPER */}
      <div className="flex w-full gap-4">

        {/* LEFT COLUMN */}
        <div className="w-[430px] flex-shrink-0 sticky top-10 self-start">

          {/* Header */}
          <div className="bg-white p-5 rounded-xl shadow-sm mb-4">
            {/* Back Button */}
            <div className="mb-4">
              <button
                onClick={() => navigate(-1)} // Go back to the previous page
                className="flex items-center text-[#7A1CA9] text-sm font-medium hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Go back
              </button>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                <CalendarCheck className="w-10 h-10 text-[#a12fda]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-purple-900 mt-1">
                  Complete Your Booking
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Finalize rental details and review before confirming your booking.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary (Sticky) */}
          <div className="sticky top-36">
            <OrderSummary
              product={productData}
              pricing={pricing}
              rentalData={rentalData}
            />
          </div>

        </div>

        {/* RIGHT COLUMN — scrollable section */}
        <div className="flex-1 space-y-4">

          <ItemSummary
            product={productData}
            days={rentalData.days}
            coupon={couponData}
          />

          <ApplyCoupon
            couponData={couponData}
            setCouponData={setCouponData}
          />

          <RentalPeriod
            rentalData={rentalData}
            setRentalData={setRentalData}
          />

          <LateReturnPolicy />

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <DeliveryMethod
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          />

          <ReturnDetails deliveryMethod={deliveryMethod} />

          <CancellationPolicy />

          <RentalTerms />
        </div>
      </div>

    </div>
  );

};

export default Booking;
