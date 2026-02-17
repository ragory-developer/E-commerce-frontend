// src/app/layout.jsx

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      <body className="flex flex-col min-h-screen bg-white">
        {/* ① Header sits at the top of every page */}
        <Header />

        {/*
          ② main grows to fill the remaining vertical space.
             This prevents the footer from floating up on short pages.
        */}
        <main className="flex-1">{children}</main>

        {/* ③ Footer always stays at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
