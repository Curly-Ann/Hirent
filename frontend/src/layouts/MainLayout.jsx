import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import MainNav from "../components/MainNav";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navbarHeight = 55; // px, adjust if your navbar height changes

  return (
    <>
      {isLoggedIn ? <Navbar /> : <MainNav />}
      <div className="min-h-screen" style={{ paddingTop: `${navbarHeight}px` }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
