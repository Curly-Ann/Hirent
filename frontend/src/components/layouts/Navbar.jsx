import React, { useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Search, Bookmark, ShoppingBag, Bell, Menu } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import hirentLogo from "../../assets/hirent-logo.png";
import { getFakeUser } from "../../utils/fakeAuth";

const Navbar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleSearch = () => {
    if (onSearch) onSearch(inputValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const [collectionCount, setCollectionCount] = useState(0);

  useEffect(() => {
    const user = getFakeUser();
    if (user && user.collection) setCollectionCount(user.collection.length);
    else setCollectionCount(0);
  }, []);

  return (
    <>
      {/* --- NAVBAR --- */}
      <nav
        className="px-2 md:px-4 lg:px-6 fixed top-0 left-0 w-full z-50 shadow-sm"
        style={{
          background: "linear-gradient(180deg, #7A1CA9 0%, #A01FC9 100%)",
          height: "60px"
        }}
      >

        <div className="mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-full max-w-[1400px]">

          {/* LEFT AREA: Menu Icon + Logo */}
          <div className="flex items-center h-full space-x-3">
            {/* Menu Icon: show on mobile only */}
            <Menu
              className="w-5 h-5 text-white cursor-pointer hover:opacity-80 transition lg:hidden"
              onClick={toggleSidebar}
            />
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
  after:bottom-0 after:w-full after:h-[4px] after:bg-white  text-white 
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

          {/* RIGHT AREA (search/icons) */}
          <div className="hidden lg:flex items-center h-full space-x-2">
            {isLoggedIn ? (
              <>
                {/* Search Bar */}
                <div className="flex items-center bg-white  text-white rounded-full px-4 py-1.5 text-gray-700 w-64">
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
                <div className="flex h-full">
                  {[
                    { icon: <Bookmark className="w-5 h-5" />, path: "/wishlist" },
                    {
                      icon: (
                        <div className="relative">
                          <ShoppingBag className="w-5 h-5" />
                          {collectionCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                              {collectionCount}
                            </span>
                          )}
                        </div>
                      ),
                      path: "/collection",
                    },
                    { icon: <Bell className="w-5 h-5" />, path: "/notifications" },
                  ].map(({ icon, path }) => {
                    const active = location.pathname === path;
                    return (
                      <NavLink
                        key={path}
                        to={path}
                        className={`px-3 flex items-center h-full transition-colors relative 
  after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
  after:bottom-0 after:w-full after:h-[4px] after:bg-white  text-white 
  after:origin-center after:transition-transform after:duration-300
  ${active
                            ? "bg-[#59087f] text-white after:scale-x-100"
                            : "text-white hover:bg-[#680e91] after:scale-x-0"
                          }`}

                      >
                        {icon}
                      </NavLink>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-white hover:bg-[#680e91] rounded transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-white hover:bg-[#680e91] rounded transition"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>

          {/* Greeting + Logout */}
          <div className="flex items-center text-white text-[13px] space-x-2">
            <span>Hi, {getFakeUser()?.name || "User"}!</span>
            <span className="text-white">|</span>
            <NavLink
              to="/login"
              onClick={logout}
              className="text-white hover:underline hover:opacity-90 transition"
            >
              Logout
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
