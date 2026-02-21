// src/app/layout.jsx
import HeaderTop from "@/components/layout/Header/sections/HeaderTop";

import CategoryTabs from "@/components/layout/Header/sections/CategoryTabs";
import Footer from "@/components/layout/Footer/Footer";

import Container from "@/design-system/Container/Container";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MiddleNavbar from "@/components/layout/Header/sections/MiddleNavbar";
import MobileBottomNav from "@/components/layout/Header/sections/MobileBottomNav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Ragory",
  description: "Ragory E-Commerce Solution",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="min-h-screen bg-white">
        {/* 1. Scrolls away — announcement / info bar */}
        <HeaderTop />

        <div className="sticky top-0 z-40 bg-white shadow-sm">
          <MiddleNavbar />
        </div>

        {/* 3. Scrolls away — desktop secondary nav */}
        <div className="hidden md:block border-b border-gray-100">
          <Container>
            <CategoryTabs />
          </Container>
        </div>

        <main className="min-h-screen pb-16 md:pb-0">{children}</main>

        {/* 5. Footer */}
        <Footer />

        {/*
          6. Mobile Bottom Nav — at body level
          position:fixed is relative to viewport here. ✅
        */}
        <MobileBottomNav />
      </body>
    </html>
  );
}
