import React from 'react';
import { MoveRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate(); // hook to programmatically navigate

  return (
    <section
      className="relative px-8 md:px-16 lg:px-24 py-28 md:py-28"
      style={{
        backgroundImage: 'url("/assets/bg/landingBg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Left: Text content */}
          <div className="max-w-3xl md:flex-1">
            <h1 className="text-[36px] font-inter font-bold text-black mt-12 mb-3 leading-tight">
              Rent What You Need.<br />
              Earn From What You Don't.
            </h1>
            <p className="text-[16px] font-inter text-black mb-5 leading-relaxed">
              Save money, reduce waste, and join the sharing economy with HiRENT.<br />
              Discover thousands of items available for rent near you.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <button
                className="px-3 py-1.5 text-white rounded-md font-inter font-medium hover:opacity-90 transition shadow-md flex items-center gap-2 text-[13px]"
                style={{ backgroundColor: '#7A1CA9' }}
                onClick={() => navigate('/browse')} // Navigate to Browse Rentals
              >
                Explore Rentals <MoveRight size={12} />
              </button>

              <button
                className="px-3 py-1.5 bg-white  text-purple-900   rounded-md font-inter font-medium hover:bg-black hover:bg-opacity-5 transition text-[13px]"
                style={{ border: '1px solid #000000', color: '#000000' }}
                onClick={() => navigate('/how-it-works')} // Navigate to How It Works
              >
                Learn More
              </button>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-8 md:gap-12">
              <div>
                <h3 className="text-[30px] font-inter font-bold" style={{ color: '#7A1CA9' }}>10,000+</h3>
                <p className="text-xs md:text-sm font-inter font-medium" style={{ color: '#1F2937' }}>Items Listed</p>
              </div>
              <div>
                <h3 className="text-[30px] font-inter font-bold" style={{ color: '#7A1CA9' }}>5,000+</h3>
                <p className="text-xs md:text-sm font-inter font-medium" style={{ color: '#1F2937' }}>Active Users</p>
              </div>
              <div>
                <h3 className="text-[30px] font-inter font-bold" style={{ color: '#7A1CA9' }}>99%</h3>
                <p className="text-xs md:text-sm font-inter font-medium" style={{ color: '#1F2937' }}>Satisfaction</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
