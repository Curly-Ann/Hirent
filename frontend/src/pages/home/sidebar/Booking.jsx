import React, { useState } from 'react';
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
import { CalendarCheck } from "lucide-react";

const Booking = () => {
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
    <div className="flex flex-col min-h-screen pt-5 px-10 md:px-20 lg:px-42 pb-20 bg-[#fbfbfb] dark:bg-gray-900">
      {/* MAIN FLEX */}
      <div className="flex flex-1 ml-16">

        <div className="flex flex-col lg:flex-row mt-12 gap-6 ">

          {/* Left Column - Main Content */}
          <div className="flex-1 lg:w-2/3 space-y-5">

            {/* Container */}
            <div className="p-6 bg-white  text-purple-900   rounded-xl shadow-sm">
              <div className="flex items-start gap-5">

                {/* Gradient Icon Box */}
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                  <CalendarCheck className="w-10 h-10 text-[#a12fda]" />
                </div>

                {/* Line + Text */}
                <div className="flex items-start gap-4">

                  {/* Text Group */}
                  <div>
                    <h1 className="text-[22px] mt-1 font-bold text-purple-900">
                      Complete Your Booking
                    </h1>
                    <p className="text-gray-500 mt-0.5 text-[15px]">
                      Finalize your rental details and review everything before confirming your booking.
                    </p>
                  </div>

                </div>

              </div>
            </div>



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

            <ReturnDetails
              deliveryMethod={deliveryMethod}
            />

            <CancellationPolicy />

            <RentalTerms />
          </div>

          {/* Right Column - Order Summary (Sticky Container) */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 self-start">
              <OrderSummary
                product={productData}
                pricing={pricing}
                rentalData={rentalData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Booking;
