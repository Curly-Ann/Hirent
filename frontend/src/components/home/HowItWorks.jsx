// src/components/home/HowItWorks.js
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Search',
      description: 'Browse thousands of items available for rent in your area. Filter by category, price, and location.',
    },
    {
      number: 2,
      title: 'Rent',
      description: 'Book the item for your desired dates. Connect with the owner and arrange pickup or delivery.',
    },
    {
      number: 3,
      title: 'Return',
      description: 'Use the item and return it when done. Rate your experience and help build our trusted community.',
    },
  ];

  return (
    <section
      className="py-20 px-6 md:px-16 lg:px-24 relative"
      style={{
        backgroundImage: 'url(/assets/bg/howitworks_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#7A1CA9'
      }}
    >
      <div className="cart-scale max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            How It Works
          </h2>
          <p className="text-gray-100 text-[16px] mt-1">
            Renting on HiRENT is simple and secure. Get started in three easy steps.
          </p>
        </div>

        {/* Single Step Image */}
        <div className="flex justify-center mb-10">
          <img
            src="/assets/icons/howitworks.png"
            alt="How it works"
            className="w-[700px] md:w-[900px] lg:w-[1100px] object-contain translate-x-3"
          />
        </div>


        {/* Step Labels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-36 text-center">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <h3 className="text-[20px] font-medium text-white mb-4">
                {step.title}
              </h3>
              <p className="font-thin text-[16px] text-gray-100">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
