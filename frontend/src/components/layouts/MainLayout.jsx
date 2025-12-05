import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [blur, setBlur] = useState(false);

  return (
    <>
      <Navbar />

      {/* Fixed Sidebar */}
      <Sidebar onExpand={setBlur} />

      {/* Main content */}
      <div className="mt-[50px] relative transition-all duration-300 min-h-screen flex flex-col">
        {blur && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 pointer-events-none"
          />
        )}
        <div className="relative z-0 flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
