import React, { useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileCategoryPanel from "./MobileCategoryPanel";

function MiddleBar() {
  const [isCategoryPanelOpen, setIsCategoryPanelOpen] = useState(false);

  const handleMenuClick = () => {
    setIsCategoryPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsCategoryPanelOpen(false);
  };

  return (
    <div className="max-w-[90vw] h-28 py-5 mx-auto">
      {/* Mobile Category Panel */}
      <MobileCategoryPanel
        isOpen={isCategoryPanelOpen}
        onClose={handleClosePanel}
      />

      {/* Desktop Navigation */}
      <DesktopNavbar />

      {/* Mobile & Tablet Navigation */}
      <MobileNavbar onMenuClick={handleMenuClick} />
    </div>
  );
}

export default MiddleBar;
