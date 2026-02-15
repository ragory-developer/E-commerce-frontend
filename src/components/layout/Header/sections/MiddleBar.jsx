/**
 * MIDDLE BAR - FIXED VERSION
 * ==========================
 *
 * Changes Made:
 * 1. Using Container component
 * 2. Removed sticky (parent Header is sticky)
 * 3. Removed fixed height, using py-5
 * 4. Proper responsive padding
 */

import React, { useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileCategoryPanel from "./MobileCategoryPanel";
import Container from "@/design-system/Container/Container";
function MiddleBar() {
  const [isCategoryPanelOpen, setIsCategoryPanelOpen] = useState(false);

  const handleMenuClick = () => {
    setIsCategoryPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsCategoryPanelOpen(false);
  };

  return (
    <Container className="py-5">
      <MobileCategoryPanel
        isOpen={isCategoryPanelOpen}
        onClose={handleClosePanel}
      />

      <DesktopNavbar />
      <MobileNavbar onMenuClick={handleMenuClick} />
    </Container>
  );
}

export default MiddleBar;
