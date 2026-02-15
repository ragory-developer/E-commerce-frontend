/**
 * CONTAINER COMPONENT - RESPONSIVE PADDING SYSTEM
 * ==============================================
 *
 * Max Width: 1920px (stops growing after)
 *
 * Padding Scale (smaller breakpoint = smaller padding):
 * Mobile (0-767px):    px-4  (16px)
 * Tablet (768-1023px): px-6  (24px)
 * Desktop (1024-1279px): px-8 (32px)
 * Large (1280-1919px): px-12 (48px)
 * XLarge (1920px+):    px-16 (64px)
 */

import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`
        max-w-[1920px]
        mx-auto 
        px-4 
        md:px-6 
        lg:px-8 
        xl:px-16
        2xl:px-24
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}>
      {children}
    </div>
  );
};

export default Container;
