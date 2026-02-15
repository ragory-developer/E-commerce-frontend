"use client";

import React from "react";
import HeaderTop from "./sections/HeaderTop";
import MiddleBar from "./sections/MiddleBar";

const Header = () => {
  return (
    <header>
      <HeaderTop />
      <div className="sticky top-0 z-100 bg-white border-b border-gray-200">
        <MiddleBar />
      </div>
    </header>
  );
};

export default Header;
