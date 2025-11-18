import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About Us", path: "/about" },
    { name: "Be A Seller", path: "/seller" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center"
      style={{ backgroundColor: "#7A1CA9", height: "55px" }}
    >
      <div className="w-full px-6 md:px-16 lg:px-24 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <div className="flex items-center">
          <img
            src="/assets/hirent-logo.png"
            alt="HIRENT"
            className="h-8"
          />
        </div>

        {/* CENTER — NAV LINKS */}
        <div className="flex items-center space-x-8 font-inter text-[14px] font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={`text-white transition relative ${
                  isActive ? "font-semibold" : "hover:text-white/90"
                }`}
              >
                {link.name}

                {/* ACTIVE UNDERLINE */}
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#f6dc8f] rounded-full"></span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* RIGHT — LOGIN + REGISTER */}
        <div className="flex items-center space-x-3">

          {/* LOGIN */}
          <NavLink
            to="/login"
            className="px-4 py-1.5 text-white border border-white rounded-md text-[14px] hover:bg-white/10 transition"
          >
            Login
          </NavLink>

          {/* REGISTER */}
          <NavLink
            to="/signup"
            className="px-5 py-1.5 bg-white text-[#7A1CA9] font-semibold rounded-md text-[14px] hover:bg-white/90 transition"
          >
            Register
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
