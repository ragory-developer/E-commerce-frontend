"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import ProductCard from "@/components/ui/ProductCard";
import Container from "./../../../design-system/Container/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductListCard from "@/components/ui/ProductListCard";

// Fallback sample data (matches the design reference)

export default function FeatureTabSection({ tabs = [], products = {} }) {
  const [activeTab, setActiveTab] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Get products for active tab, fallback to sample data if none provided

  const swiperParams = {
    modules: [Navigation, Pagination, Grid],
    slidesPerView: 4,
    grid: { rows: 2, fill: "row" },
    spaceBetween: 20,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      1024: { slidesPerView: 4 },
      768: { slidesPerView: 3 },
      640: { slidesPerView: 2 },
      480: { slidesPerView: 1 },
    },
    onInit: (swiper) => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    },
  };

  return (
    <section className="bg-white py-8 md:py-12">
      <Container>
        <div className="relative">
          {/* Tab Headers */}
          <div className="mb-6 border-b border-gray-200">
            <ul className="flex flex-wrap gap-2 md:gap-6">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className={`cursor-pointer px-1 py-2 text-sm font-medium transition-colors ${
                    activeTab === index
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setActiveTab(index)}>
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          {/* Swiper Slider */}
          <div className="relative">
            <Swiper key={activeTab}>
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                  <ProductListCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <div className="hidden md:flex items-center gap-2 absolute -top-12 right-0">
              <button
                ref={prevRef}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button
                ref={nextRef}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Pagination */}
            <div className="swiper-pagination !relative mt-8"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
