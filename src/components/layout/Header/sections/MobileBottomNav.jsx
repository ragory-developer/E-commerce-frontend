// src/components/layout/MobileBottomNav/MobileBottomNav.jsx
// ⚠️  "use client" MUST be the very first line — required for usePathname()
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";

/**
 * MobileBottomNav
 *
 * Design decisions:
 * - Fixed to bottom, z-50, only visible on < md screens
 * - Uses Next.js <Link> for SPA navigation (no full reload)
 * - Active state derived from current pathname (no manual state needed)
 * - Safe area inset for iPhone home bar (env(safe-area-inset-bottom))
 * - Cart badge for item count
 * - Accessible: role="navigation", aria-label, aria-current on active item
 * - No unnecessary re-renders: pathname comparison is pure/cheap
 * - Hides when keyboard is open (mobile browsers resize viewport)
 */

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/en",
    icon: Home,
    ariaLabel: "Go to Home",
  },
  {
    label: "Categories",
    href: "/en/category",
    icon: LayoutGrid,
    ariaLabel: "Browse Categories",
  },
  {
    label: "Cart",
    href: "/en/cart",
    icon: ShoppingCart,
    ariaLabel: "View Cart",
    badge: 4, // In a real app, this comes from cart context/state
  },
  {
    label: "Account",
    href: "/en/account",
    icon: User,
    ariaLabel: "My Account",
  },
];

const MobileBottomNav = () => {
  const pathname = usePathname();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Hide nav when mobile keyboard is open (viewport height shrinks)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initialHeight = window.innerHeight;
    const handleResize = () => {
      // If viewport height drops by more than 150px, keyboard is likely open
      setIsKeyboardOpen(window.innerHeight < initialHeight - 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isKeyboardOpen) return null;

  return (
    <nav
      role="navigation"
      aria-label="Mobile bottom navigation"
      className={`
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        bg-white border-t border-gray-200
        shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
      `}
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}>
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(({ label, href, icon: Icon, ariaLabel, badge }) => {
          /**
           * Active matching:
           * - "/en" matches exactly to avoid false positives on all routes
           * - Other routes use startsWith for nested routes (e.g. /en/cart/something)
           */
          const isActive =
            href === "/en"
              ? pathname === "/en" || pathname === "/en/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-label={ariaLabel}
              aria-current={isActive ? "page" : undefined}
              className={`
                relative flex flex-col items-center justify-center flex-1
                gap-1 px-2 text-xs font-medium
                transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset
                ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-800 active:text-blue-600"
                }
              `}>
              {/* Icon with active indicator dot */}
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  aria-hidden="true"
                />

                {/* Cart badge */}
                {badge != null && badge > 0 && (
                  <span
                    aria-label={`${badge} items in cart`}
                    className="
                      absolute -top-1.5 -right-2
                      min-w-[18px] h-[18px] px-1
                      bg-blue-600 text-white
                      text-[10px] font-bold leading-none
                      rounded-full flex items-center justify-center
                    ">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`leading-none ${isActive ? "font-semibold" : ""}`}>
                {label}
              </span>

              {/* Active underline indicator */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
