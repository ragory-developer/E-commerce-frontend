
import React, { useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileSidePanel from "./MobileSidePanel";
import Container from "@/design-system/Container/Container";
function MiddleNavbar() {
  const [isCategoryPanelOpen, setIsCategoryPanelOpen] = useState(false);

  const handleMenuClick = () => {
    setIsCategoryPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsCategoryPanelOpen(false);
  };

  return (
    <Container className="py-5">
      <MobileSidePanel
        isOpen={isCategoryPanelOpen}
        onClose={handleClosePanel}
      />

      <DesktopNavbar />
      <MobileNavbar onMenuClick={handleMenuClick} />
    </Container>
  );
}

export default MiddleNavbar;
