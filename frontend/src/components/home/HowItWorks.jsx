import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Search",
      description:
        "Browse thousands of items available for rent in your area. Filter by category, price, and location.",
    },
    {
      number: 2,
      title: "Rent",
      description:
        "Book the item for your desired dates. Connect with the owner and arrange pickup or delivery.",
    },
    {
      number: 3,
      title: "Return",
      description:
        "Use the item and return it when done. Rate your experience and help build our trusted community.",
    },
  ];

  return (
    <section
      className="relative py-16 px-6 md:px-16 lg:px-32 bg-[#7A1CA9] text-white"
      style={{
        backgroundImage: "url(/assets/bg/howitworks_bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold">How It Works</h2>
          <p className="text-gray-100 text-[16px] mt-2">
            Renting on HiRENT is simple and secure. Get started in three easy
            steps.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center mb-12">
          <img
            src="/assets/icons/howitworks.png"
            alt="How HiRent works"
            className="w-[90%] max-w-[1100px] object-contain"
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center px-4"
            >
              <h3 className="text-[22px] font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-100 text-[15px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
