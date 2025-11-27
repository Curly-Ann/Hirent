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
import Sidebar from '../../../components/layouts/Sidebar';

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
    <div className="flex flex-1 bg-[#fbfbfb]">
      <Sidebar />
      
      <div className="flex flex-col lg:flex-row ml-12 mr-12 mt-12">
        
        {/* Left Column - Main Content */}
        <div className="cart-scale flex-1 lg:w-2/3 space-y-4">
        <h1 className="text-2xl font-semibold">Complete Your Booking</h1>
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
        <div className="cart-scale lg:w-1/3">
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
  );
};

export default Booking;
