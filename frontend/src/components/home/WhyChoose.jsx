import React from "react";

export default function WhyChoose() {
  const benefits = [
    {
      title: "Save Money",
      description:
        "Why buy when you can rent? Access what you need at a fraction of the cost — perfect for one-time events or temporary needs.",
      icon: "/assets/icons/save.png",
    },
    {
      title: "Earn Income",
      description:
        "Turn unused items into cash. List your belongings and earn passive income from items sitting idle.",
      icon: "/assets/icons/star.png",
    },
    {
      title: "Support Sustainability",
      description:
        "Reduce waste and your carbon footprint. Sharing items helps create a more sustainable future.",
      icon: "/assets/icons/sustainability.png",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-16 lg:px-32 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold text-black">
            Why Choose HiRent?
          </h2>
          <p className="text-gray-600 text-[16px] mt-2">
            Join thousands who are saving money and earning more.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#743593] to-[#991BD8] rounded-2xl p-10 text-white shadow-lg hover:shadow-2xl hover:scale-[1.04] transition-transform"
            >
              <div className="flex justify-center mb-6">
                <img src={b.icon} alt={b.title} className="w-16 h-16" />
              </div>

              <h3 className="text-[22px] font-semibold text-center mb-3">
                {b.title}
              </h3>

              <p className="text-[15px] text-center leading-relaxed text-purple-100">
                {b.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
