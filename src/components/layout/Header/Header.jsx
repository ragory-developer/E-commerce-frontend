"use client";

import React from "react";
import HeaderTop from "./sections/HeaderTop";
import MiddleNavbar from "./sections/MiddleNavbar";
import CategoryTabs from "./sections/CategoryTabs";
import Container from "./../../../design-system/Container/Container";
// TODO: here sticky navbar not working and header top is overshadowed by MiddleNavbar z-index
const Header = () => {
  return (
    <header className=" bg-white">
      <div className="">
        <HeaderTop />
      </div>
      <div className="sticky  z-40 w-full bg-white ">
        <MiddleNavbar />
      </div>

      <div className="md:mt-10">
        <Container>
          <CategoryTabs />
        </Container>
      </div>
    </header>
  );
};

export default Header;
