import React, { useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Bell, Menu } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import hirentLogo from "../../assets/hirent-logo.png";

const Navbar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, user, wishlistCount, collectionCount } = useContext(AuthContext);

  const handleSearch = () => {
    if (onSearch) onSearch(inputValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/wishlist");
    }
  };

  const handleCollectionClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/collection");
    }
  };

  const userName = user?.name || "User";

  return (
    <>
      <nav
        className="px-2 md:px-4 lg:px-6 fixed top-0 left-0 w-full z-50 shadow-sm"
        style={{
          background: "linear-gradient(180deg, #7A1CA9 0%, #A01FC9 100%)",
          height: "64px"
        }}
      >
        <div className="mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-full max-w-[1400px]">
          {/* LEFT AREA */}
          <div className="flex items-center h-full space-x-3">
            <Menu className="w-5 h-5 text-white cursor-pointer hover:opacity-80 transition lg:hidden" />
            <img src={hirentLogo} alt="HiRENT" className="h-6" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center h-full font-inter text-[13px]">
            {[
              { name: "Home", path: "/" },
              { name: "Browse", path: "/browse" },
              { name: "How It Works", path: "/how-it-works" },
              { name: "About Us", path: "/about" },
            ].map((link) => {
              const active = location.pathname === link.path;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`px-5 flex items-center h-full transition-colors relative 
  after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
  after:bottom-0 after:w-full after:h-[4px] after:bg-white rounded-t-lg after:rounded-full text-white 
  after:origin-center after:transition-transform after:duration-300
  ${active
                    ? "bg-[#59087f] text-white after:scale-x-100"
                    : "text-white hover:bg-[#680e91] after:scale-x-0"
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* RIGHT AREA */}
          <div className="hidden lg:flex items-center h-full space-x-2">
            {isLoggedIn ? (
              <>
                {/* Search Bar */}
                <div className="flex items-center bg-white rounded-full px-4 py-1.5 text-gray-700 w-64">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      if (onSearch) onSearch(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 outline-none text-[13px] bg-transparent placeholder-gray-400"
                  />
                  <Search
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition"
                    onClick={handleSearch}
                  />
                </div>

                {/* Icons */}
                <div className="flex h-full items-center space-x-4 ml-4">
                  {/* Wishlist Icon */}
                  <button
                    onClick={handleWishlistClick}
                    className="relative text-white hover:opacity-80 transition"
                  >
                    <Heart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  {/* Collection Icon */}
                  <button
                    onClick={handleCollectionClick}
                    className="relative text-white hover:opacity-80 transition"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {collectionCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {collectionCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications */}
                  <button className="text-white hover:opacity-80 transition">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>

                {/* User Greeting and Avatar */}
                <div className="hidden lg:flex items-center space-x-3 ml-4 pl-4 border-l border-white border-opacity-30">
                  {user?.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  )}
                  <span className="text-white text-[13px] font-medium">Hi, {userName}!</span>
                  <button
                    onClick={logout}
                    className="text-white text-[13px] hover:opacity-80 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Search Bar (when not logged in) */}
                <div className="flex items-center bg-white rounded-full px-4 py-1.5 text-gray-700 w-64">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 outline-none text-[13px] bg-transparent placeholder-gray-400"
                  />
                  <Search
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition"
                    onClick={handleSearch}
                  />
                </div>

                {/* Icons (not logged in) */}
                <div className="flex h-full items-center space-x-4 ml-4">
                  <button
                    onClick={handleWishlistClick}
                    className="text-white hover:opacity-80 transition"
                  >
                    <Heart className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleCollectionClick}
                    className="text-white hover:opacity-80 transition"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>

                  <button className="text-white hover:opacity-80 transition">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>

                {/* Login/Signup Links */}
                <div className="hidden lg:flex items-center space-x-3 ml-4 pl-4 border-l border-white border-opacity-30">
                  <NavLink
                    to="/login"
                    className="text-white text-[13px] hover:opacity-80 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="text-white text-[13px] hover:opacity-80 transition"
                  >
                    Sign Up
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
