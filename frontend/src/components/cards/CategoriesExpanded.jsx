import React from "react";

export default function ExpandedCategories() {
  const accent = "#8A3FFC";

  const categories = [
    { id: "gadgets", label: "Gadgets", icon: gadgetIcon },
    { id: "clothes", label: "Clothes", icon: clothesIcon },
    { id: "electronics", label: "Electronics", icon: electronicsIcon },
    { id: "vehicles", label: "Vehicles", icon: vehiclesIcon },
    { id: "cameras", label: "Cameras", icon: camerasIcon },
    { id: "furniture", label: "Furniture", icon: furnitureIcon },
    { id: "instruments", label: "Musical Instruments", icon: instrumentsIcon },
    { id: "tools", label: "Tools", icon: toolsIcon },
    { id: "books", label: "Books", icon: booksIcon },
    { id: "appliances", label: "Appliances", icon: appliancesIcon },
    { id: "sports", label: "Sports", icon: sportsIcon },
    { id: "outdoors", label: "Outdoors", icon: outdoorsIcon }
  ];

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">All Categories</h2>
          <p className="mt-2 text-gray-500">Browse all available categories and find exactly what you need.</p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <article
              key={c.id}
              className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center h-40 w-full mb-4">
                <div
                  className="h-full w-full rounded-xl flex items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(180deg, #FBFBFD 0%, #FFFFFF 100%)" }}
                >
                  {/* Icon / Illustration placeholder */}
                  <div className="w-32 h-24" aria-hidden>
                    {c.icon({ accent })}
                  </div>
                </div>
              </div>

              <h3 className="text-center text-gray-800 font-medium">{c.label}</h3>
            </article>
          ))}
        </div>

        {/* Footer call-to-action */}
        <div className="flex justify-center mt-8">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 text-purple-700 hover:bg-purple-50"
            style={{ borderColor: "rgba(138,63,252,0.15)" }}
          >
            See all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}


function gadgetIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#F3F0FF" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect rx="10" x="6" y="6" width="108" height="58" fill="url(#g1)" stroke="#EFE8FF" />
      <rect x="18" y="18" width="84" height="36" rx="4" fill="#FFFFFF" stroke="#EDEAF8" />
      <rect x="24" y="24" width="64" height="24" rx="3" fill="#F7F6FB" />
      <circle cx="96" cy="46" r="4" fill={accent} />
    </svg>
  );
}

function clothesIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <path d="M38 54c6-14 20-14 26 0" stroke="#EEE9F8" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M30 32c6-8 10-9 18-9s12 1 18 9" stroke={accent} strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function electronicsIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <rect x="16" y="18" width="88" height="36" rx="6" fill="#FAFAFB" stroke="#EEEAF8" />
      <rect x="22" y="24" width="56" height="24" rx="3" fill="#F7F6FB" />
      <rect x="82" y="26" width="8" height="12" rx="1.5" fill={accent} />
    </svg>
  );
}

function vehiclesIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <path d="M18 46h70l8-16H30z" fill="#F7F6FB" stroke="#ECE7F8" />
      <circle cx="36" cy="54" r="6" fill="#EEE" stroke="#DDD" />
      <circle cx="78" cy="54" r="6" fill="#EEE" stroke="#DDD" />
      <rect x="86" y="34" width="10" height="6" rx="2" fill={accent} />
    </svg>
  );
}

function camerasIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <rect x="22" y="26" width="76" height="28" rx="5" fill="#FBFBFD" stroke="#ECE7F8" />
      <circle cx="60" cy="40" r="10" fill="#F2F1F7" stroke="#E7E3F6" />
      <circle cx="60" cy="40" r="5" fill={accent} />
    </svg>
  );
}

function furnitureIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <rect x="20" y="30" width="80" height="18" rx="3" fill="#FAFAFB" stroke="#ECE7F8" />
      <rect x="22" y="38" width="16" height="8" rx="2" fill="#EFEAF8" />
      <rect x="82" y="38" width="16" height="8" rx="2" fill="#EFEAF8" />
    </svg>
  );
}

function instrumentsIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <path d="M40 28c6 6 20 6 26 0" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <rect x="54" y="28" width="6" height="24" rx="3" fill="#F6F4FB" />
      <circle cx="46" cy="48" r="4" fill="#EFEAF8" />
    </svg>
  );
}

function toolsIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <path d="M30 46l28-20 6 8-28 20z" fill="#FAFAFB" stroke="#ECE7F8" />
      <rect x="56" y="40" width="18" height="6" rx="2" fill={accent} />
    </svg>
  );
}

function booksIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <rect x="20" y="22" width="28" height="36" rx="2" fill="#F9F8FB" stroke="#EFEAF8" />
      <rect x="52" y="22" width="36" height="36" rx="2" fill="#FBFBFD" stroke="#EFEAF8" />
      <line x1="26" y1="30" x2="44" y2="30" stroke="#EEE9F8" strokeWidth="1.5" />
    </svg>
  );
}

function appliancesIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <rect x="28" y="20" width="64" height="40" rx="4" fill="#FBFBFD" stroke="#ECE7F8" />
      <rect x="36" y="28" width="12" height="12" rx="2" fill="#F1F0F6" />
      <circle cx="78" cy="40" r="4" fill={accent} />
    </svg>
  );
}

function sportsIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <circle cx="60" cy="40" r="12" fill="#F7F6FB" stroke="#EDEAF8" />
      <path d="M60 28v24" stroke={accent} strokeWidth="2" />
    </svg>
  );
}

function outdoorsIcon({ accent = "#8A3FFC" }) {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect rx="10" x="6" y="6" width="108" height="58" fill="#FFF" stroke="#F1EFF9" />
      <path d="M20 52c10-18 40-18 60 0" fill="#F6F5FB" stroke="#ECE7F8" />
      <path d="M40 34c6-12 18-12 24 0" stroke={"#BFD9A6"} strokeWidth="3" fill="none" />
      <circle cx="56" cy="28" r="3" fill={accent} />
    </svg>
  );
}
