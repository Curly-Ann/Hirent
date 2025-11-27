import React, { useState, useRef, useEffect } from "react";

import clothesImg from "../../assets/categories/clothes.png";
import gadgetImg from "../../assets/categories/gadgets.png";
import vehiclesImg from "../../assets/categories/vehicles.png";
import camerasImg from "../../assets/categories/cameras.png";
import furnitureImg from "../../assets/categories/furniture.png";
import instrumentsImg from "../../assets/categories/instruments.png";
import toolsImg from "../../assets/categories/tools.png";
import booksImg from "../../assets/categories/books.png";
import appliancesImg from "../../assets/categories/appliances.png";
import sportsImg from "../../assets/categories/sports.png";
import outdoorsImg from "../../assets/categories/outdoors.png";

export default function FeaturedCategories() {
  const allCategories = [
    { id: "clothes", label: "Clothes", desc: "Designer wear for every occasion", image: clothesImg },
    { id: "vehicles", label: "Vehicles", desc: "From compact to luxury vehicles", image: vehiclesImg },
    { id: "appliances", label: "Appliances", desc: "Smart devices and accessories", image: appliancesImg },
    { id: "gadgets", label: "Gadgets", desc: "Latest tech and electronics", image: gadgetImg },
    { id: "furniture", label: "Furniture", desc: "Modern and classic pieces", image: furnitureImg },
    { id: "instruments", label: "Musical Instruments", desc: "Guitars, keyboards, and more", image: instrumentsImg },
    { id: "cameras", label: "Cameras", desc: "DSLR, mirrorless, and more", image: camerasImg },
    { id: "tools", label: "Tools", desc: "Hand tools and power tools", image: toolsImg },
    { id: "books", label: "Books", desc: "Educational & leisure reads", image: booksImg },
    { id: "sports", label: "Sports", desc: "Equipment for all sports", image: sportsImg },
    { id: "outdoors", label: "Outdoors", desc: "Camping & adventure gear", image: outdoorsImg },
  ];

  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const lastCategoryRef = useRef(null);

  const categoriesToShow = showAll ? allCategories : allCategories.slice(0, 4);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    if (showAll) {
      lastCategoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAll]);

  return (
    <section ref={sectionRef} className="bg-gray-50 py-1 px-8 md:px-20 lg:px-42">
      <div className="cart-scale max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-12">Featured Categories</h2>
          <p className="text-gray-500 text-[16px] mt-1">
            Browse through our popular categories and find exactly what you need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {categoriesToShow.map((cat, index) => {
            const isEvenRow = Math.floor(index / 2) % 2 === 0;
            const isFirstInRow = index % 2 === 0;
            const colSpan = isEvenRow
              ? isFirstInRow ? "md:col-span-5" : "md:col-span-7"
              : isFirstInRow ? "md:col-span-7" : "md:col-span-5";

            const ref = index === categoriesToShow.length - 1 ? lastCategoryRef : null;

            return (
              <div key={cat.id} className={colSpan} ref={ref}>
                <CategoryCard data={cat} />
              </div>
            );
          })}
        </div>

        {/* Show All / Show Less Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleToggle}
            className="px-6 py-2 border-2 rounded-lg font-inter font-semibold text-sm inline-flex items-center gap-2 text-[#7A1CA9] border-[#7A1CA9] hover:bg-purple-50 transition-colors"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>
      </div>
    </section>

  );
}

function CategoryCard({ data }) {
  return (
    <div className="bg-white rounded-xl border transition-all duration-300 ease-out hover:shadow-[0_12px_40px_rgba(138,63,252,0.15)] hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 flex justify-between items-start relative overflow-hidden min-h-[240px] group">
      <div className="z-10 max-w-[50%]">
        <h3 className="text-[22px] font-semibold text-gray-900">{data.label}</h3>
        <p className="text-gray-500 text-[15px] mb-1">{data.desc}</p>

        <button
          className="mt-2 px-2.5 py-1.5 rounded-md border text-[#7A1CA9] border-[#7A1CA9] hover:bg-purple-50 transition hover:shadow-[0_12px_40px_rgba(138,63,252,0.15)] hover:scale-[1.02] inline-flex items-center shadow-md font-medium text-[14px] gap-1"
        >
          Browse
          <svg xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <img
        src={data.image}
        alt={data.label}
        className="absolute right-0 bottom-0 h-60 object-contain z-0 transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );
}
