import React, { useState, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileSidePanel from "./MobileSidePanel";
import Container from "@/design-system/Container/Container";

function MiddleNavbar() {
  const [isCategoryPanelOpen, setIsCategoryPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    setIsCategoryPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsCategoryPanelOpen(false);
  };

  return (
    <div>
      {/* Sticky navbar wrapper */}
      <div
        className={`
           w-full transition-all duration-300 ease-in-out
          ${isScrolled ? "bg-white/95 backdrop-blur-md " : "bg-white "}
        `}>
        <Container className="py-5">
          <DesktopNavbar />
          <MobileNavbar onMenuClick={handleMenuClick} />
        </Container>
      </div>

      {/* Mobile side panel - ensure it's above everything */}
      <MobileSidePanel
        isOpen={isCategoryPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
}

export default MiddleNavbar;
