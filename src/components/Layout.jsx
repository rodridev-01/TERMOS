// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer"; 

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer /> 
    </>
  );
};

export default Layout;
