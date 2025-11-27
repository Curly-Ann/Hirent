import React from 'react';

const ItemSummary = ({ product, days, coupon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Item Summary</h2>
      
      <div className="flex gap-4">
        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#7A1CA9] rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {product.owner.charAt(0)}
            </div>
            <div className="text-sm text-gray-600">
              <span className="text-gray-500">Listed by</span>
              <br />
              <span className="font-medium text-gray-900">{product.owner}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{product.location}</p>
          
          <div className="flex items-center gap-2">
            <span className="text-[#7A1CA9] font-bold text-lg">₱{product.pricePerDay}</span>
            <span className="text-gray-500 text-sm">per day</span>
          </div>
          
          {coupon.applied && (
            <div className="mt-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-600 text-sm font-medium">Coupon applied · {coupon.discount}% off</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemSummary;
