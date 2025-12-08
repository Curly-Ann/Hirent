import React, { useContext } from 'react';
import { MoveRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const HeroSection = ({ user }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <section
      className="relative px-8 md:px-16 lg:px-24 py-28"
      style={{
        backgroundImage: 'url("/assets/bg/landingBg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          
          <div className="max-w-3xl">

            <h1 className="text-[36px] font-bold text-black mt-12 mb-3 leading-tight">
              Rent What You Need.<br />
              Earn From What You Don't.
            </h1>

            <p className="text-[16px] text-black mb-5 leading-relaxed">
              Save money, reduce waste, and join the sharing economy with HiRENT.
              {user?.city && (
                <span className="block mt-1 text-[#7A1CA9] font-semibold">
                  Showing results near: {user.city}
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {isLoggedIn ? (
                <>
                  <button
                    className="px-3 py-1.5 text-white rounded-md font-medium flex items-center gap-2 text-[13px]"
                    style={{ backgroundColor: '#7A1CA9' }}
                    onClick={() => navigate('/browse')}
                  >
                    Explore Rentals <MoveRight size={12} />
                  </button>
                  <button
                    className="px-3 py-1.5 bg-white text-black border border-black rounded-md font-medium text-[13px]"
                    onClick={() => navigate('/owner/dashboard')}
                  >
                    My Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="px-3 py-1.5 text-white rounded-md font-medium flex items-center gap-2 text-[13px]"
                    style={{ backgroundColor: '#7A1CA9' }}
                    onClick={() => navigate('/signup')}
                  >
                    Get Started <MoveRight size={12} />
                  </button>
                  <button
                    className="px-3 py-1.5 bg-white text-black border border-black rounded-md font-medium text-[13px]"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-8 md:gap-12">
              <HeroStat number="10,000+" label="Items Listed" />
              <HeroStat number="5,000+" label="Active Users" />
              <HeroStat number="99%" label="Satisfaction" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const HeroStat = ({ number, label }) => (
  <div>
    <h3 className="text-[30px] font-bold" style={{ color: '#7A1CA9' }}>{number}</h3>
    <p className="text-xs md:text-sm font-medium text-gray-700">{label}</p>
  </div>
);

export default HeroSection;
