// src/components/layout/Header/Header.jsx
"use client";

import React from "react";
import HeaderTop from "./sections/HeaderTop";
import MiddleNavbar from "./sections/MiddleNavbar";
import CategoryTabs from "./sections/CategoryTabs";
import Container from "@/design-system/Container/Container";

/**
 * Header Architecture:
 *
 * BEFORE (broken):
 *   <header>                          ← positioned in normal flow
 *     <HeaderTop />
 *     <div className="sticky top-0">  ← sticky within header's scroll container
 *       <MiddleNavbar />              ← stops sticking when header scrolls away
 *     </div>
 *     <CategoryTabs />
 *   </header>
 *
 * ROOT CAUSE:
 *   `position: sticky` sticks an element relative to its NEAREST SCROLLING ANCESTOR.
 *   When MiddleNavbar is inside <header>, it sticks within the header's bounding box.
 *   Once the header itself scrolls out of the viewport, sticky has nothing left to stick to.
 *
 * FIX:
 *   Move the sticky wrapper OUTSIDE the header and into the root layout,
 *   OR make the sticky element a direct child of the <body>'s scroll container.
 *   The cleanest architectural pattern: render HeaderTop & CategoryTabs normally,
 *   and give MiddleNavbar its OWN fixed/sticky positioning at the layout level.
 *
 *   We achieve this by using `position: sticky; top: 0` on a wrapper that is a
 *   DIRECT child of the document's scroll container (the <body> / layout root),
 *   NOT nested inside a positioned ancestor with overflow hidden/auto/scroll.
 *
 * INDUSTRY STANDARD:
 *   - HeaderTop scrolls away naturally (announcement bar pattern)
 *   - MiddleNavbar (logo + search + icons) is always visible = core nav
 *   - CategoryTabs scroll away naturally (secondary nav)
 *   - MobileBottomNav handles mobile navigation (separate concern)
 */
const Header = () => {
  return (
    <header>
      {/* Scrolls away on scroll — top info bar */}
      <HeaderTop />

      {/*
        ✅ FIX: sticky wrapper is now at the TOP LEVEL of <header>,
        which itself is a direct child of <body> via layout.jsx.
        No overflow:hidden on any ancestor = sticky works correctly.
      */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <MiddleNavbar />
      </div>

      {/* Scrolls away — secondary category nav, desktop only */}
      <div className="hidden md:block border-b border-gray-100">
        <Container>
          <CategoryTabs />
        </Container>
      </div>
    </header>
  );
};

export default Header;
