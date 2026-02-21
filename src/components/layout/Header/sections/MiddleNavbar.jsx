// src/components/layout/Header/sections/MiddleNavbar.jsx
"use client";

import React, { useState, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileSidePanel from "./MobileSidePanel";
import Container from "@/design-system/Container/Container";

/**
 * MiddleNavbar
 *
 * Responsibility: Renders the primary navigation bar content.
 * Stickiness is handled by the PARENT (Header.jsx) — single responsibility.
 *
 * Scroll shadow: adds a subtle shadow when page is scrolled to give
 * visual depth feedback that navbar is "floating" above content.
 */
const MiddleNavbar = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`w-full transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-none"
        }`}>
        <Container className="py-4">
          <DesktopNavbar />
          <MobileNavbar onMenuClick={() => setIsSidePanelOpen(true)} />
        </Container>
      </div>

      <MobileSidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
      />
    </>
  );
};

export default MiddleNavbar;
