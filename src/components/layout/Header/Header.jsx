// src/components/layout/Header/Header.jsx
"use client";

import React from "react";
import HeaderTop from "./sections/HeaderTop";
import MiddleNavbar from "./sections/MiddleNavbar";
import CategoryTabs from "./sections/CategoryTabs";
import Container from "@/design-system/Container/Container";

const Header = () => {
  return (
    <header className="bg-white">
      {/* ① Top bar — shown only on lg+, scrolls away normally */}
      <HeaderTop />

      <div className="sticky top-0 z-10  bg-white ">
        <MiddleNavbar />
      </div>

      {/*
        ③ Category tabs — NOT sticky, scrolls away with the page.
           Only visible on md+ screens.
      */}
      {/* <div className="hidden md:block border-b mt-8 border-gray-100">
        <Container>
          <CategoryTabs />
        </Container>
      </div> */}
    </header>
  );
};

export default Header;
