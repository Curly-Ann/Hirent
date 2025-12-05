import React, { useState } from "react";
import { Menu, Home, ClipboardCheck, CalendarPlus, MessageCircle, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onExpand }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const handleEnter = () => {
    setExpanded(true);
    onExpand(true);
  };

  const handleLeave = () => {
    setExpanded(false);
    onExpand(false);
  };

  const sidebarItems = [
    { icon: Home, link: "/", label: "Home" },
    { icon: ClipboardCheck, link: "/my-rentals", label: "My Rentals" },
    { icon: CalendarPlus, link: "/booking", label: "Booking" },
    { icon: MessageCircle, link: "/chat", label: "Messages" },
    { icon: User, link: "/account", label: "Account Management" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/" || location.pathname.startsWith("/product");
    return location.pathname === path;
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`fixed left-0 top-0 h-full bg-[#ffffff] rounded-r-sm transition-all duration-300 
                 ${expanded ? "w-64" : "w-16"} overflow-hidden`}
      style={{ zIndex: 2000 }}
    >
      {/* Top Logo + Menu */}
      <div className="flex items-center gap-3 px-5 py-5">
        <Menu className="w-5 h-5 text-gray-500" />
        {expanded && <img src="/assets/hirent-logo-purple.png" alt="HiRENT" className="h-6" />}
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`relative transition-all border-l-4 transform-gpu ${
              isActive(item.link)
                ? "bg-purple-50 text-[#7A1CA9] border-l-[#7A1CA9]"
                : "text-gray-700 border-l-[#ffffff] hover:bg-purple-50  hover:text-[#7A1CA9] hover:scale-105"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-2">
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {expanded && <span className="text-[13px] font-medium">{item.label}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
