"use client";

import React from "react";
import HeaderTop from "./sections/HeaderTop";
import MiddleNavbar from "./sections/MiddleNavbar";
// TODO: here sticky navbar not working and headertop is overshadowed by MiddleNavbar z-index
const Header = () => {
  return (
    <header className="relative">
      <div className="">

      <HeaderTop />
      </div>
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <MiddleNavbar />
      </div>
    </header>
  );
};

export default Header;
