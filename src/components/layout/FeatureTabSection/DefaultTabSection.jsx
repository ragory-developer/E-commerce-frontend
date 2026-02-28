"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import ProductCard from "@/components/ui/ProductCard";
import Container from "../../../design-system/Container/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Sentinel: pass as `category` to show all products ───────────────────────
export const ALL_CATEGORY = "__ALL__";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildDefaultTabs(products) {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return [
    { label: "All", category: ALL_CATEGORY },
    ...categories.map((c) => ({ label: c, category: c })),
  ];
}

function filterProducts(products, tab) {
  const cat = tab.category ?? tab.label;
  return cat === ALL_CATEGORY ? products : products.filter((p) => p.category === cat);
}

// ─── Component ───────────────────────────────────────────────────────────────
/**
 * DefaultTabSection
 *
 * Props:
 *  - products      {Array}            Required. Array of product objects.
 *  - tabTitles     {Array}            Optional. Array of { label, category? }.
 *                                     Defaults to "All" + one tab per unique category.
 *                                     Set category to ALL_CATEGORY to show everything.
 *  - tabAlignment  {"left"|"right"}   Optional. Which side the tab strip sits on. Default "left".
 *  - heading       {string}           Optional. Section heading above the card.
 */
export default function DefaultTabSection({
  products,
  tabTitles,
  tabAlignment = "left",
  heading,
  rowCount = 1,
}) {
  const tabs = tabTitles ?? buildDefaultTabs(products);

  const [activeTab, setActiveTab] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const tabsScrollRef = useRef(null);
  const activeTabRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // ── Scrollability detection ───────────────────────────────────────────────
  const checkScrollability = useCallback(() => {
    const el = tabsScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = tabsScrollRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    const ro = new ResizeObserver(checkScrollability);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      ro.disconnect();
    };
  }, [checkScrollability]);

  // ── Scroll active tab into view on change ────────────────────────────────
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeTab]);

  const filteredProducts = filterProducts(products, tabs[activeTab]);

  const swiperParams = {
    modules: [Navigation, Pagination, Grid, Autoplay],
    slidesPerView: 1,
    grid: { rows: rowCount, fill: "row" },
    spaceBetween: 16,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    pagination: { clickable: true, dynamicBullets: true },
    breakpoints: {
      400: { slidesPerView: 2 },
      600: { slidesPerView: 3 },
      800: { slidesPerView: 4 },
      1000: { slidesPerView: 5 },
      1200: { slidesPerView: 6 },
      1400: { slidesPerView: 6 },
      1600: { slidesPerView: 7 },
    },
    onInit: (swiper) => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    },
  };

  // "right" flips the flex row: tabs on the right, nav arrows on the left
  const headerRowClass = tabAlignment === "right" ? "flex-row-reverse justify-between" : "flex-row";

  return (
    <section className="bg-white py-8 md:py-12">
      <Container>
        {heading && (
          <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">
            {heading}
          </h2>
        )}

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">

          {/* ── Header Bar ─────────────────────────────────────────────── */}
          <div className={`flex items-center gap-2 border-b border-gray-100 px-4 bg-gray-50/60 ${headerRowClass}`}>

            {/* Scrollable tab strip */}
            <div className="relative flex-1 min-w-0">
              {/* Left fade */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-full w-8 z-10 transition-opacity duration-200"
                style={{
                  background: "linear-gradient(to right, rgb(249 250 251 / 0.95), transparent)",
                  opacity: canScrollLeft ? 1 : 0,
                }}
              />
              {/* Right fade */}
              <div
                className="pointer-events-none absolute right-0 top-0 h-full w-8 z-10 transition-opacity duration-200"
                style={{
                  background: "linear-gradient(to left, rgb(249 250 251 / 0.95), transparent)",
                  opacity: canScrollRight ? 1 : 0,
                }}
              />

              <div
                ref={tabsScrollRef}
                className="flex items-center gap-1 overflow-x-auto scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>{`div::-webkit-scrollbar{display:none}`}</style>

                {tabs.map((tab, index) => {
                  const isActive = activeTab === index;
                  const count = filterProducts(products, tab).length;

                  return (
                    <button
                      key={`${tab.label}-${index}`}
                      ref={isActive ? activeTabRef : null}
                      onClick={() => setActiveTab(index)}
                      className={[
                        "relative flex items-center gap-1.5 whitespace-nowrap",
                        "px-3.5 py-3.5 text-sm font-medium transition-all duration-200",
                        "outline-none flex-shrink-0 group",
                        isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-800",
                      ].join(" ")}
                    >
                      {/* Animated underline */}
                      <span
                        className={[
                          "absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-blue-600 transition-all duration-300",
                          isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                        ].join(" ")}
                        style={{ transformOrigin: "left" }}
                      />

                      <span>{tab.label}</span>

                      {/* Count badge */}
                      <span
                        className={[
                          "inline-flex items-center justify-center rounded-full",
                          "text-[11px] font-semibold min-w-[20px] h-5 px-1.5 tabular-nums transition-all duration-200",
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200 flex-shrink-0" />

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1 flex-shrink-0 py-2">
              <button
                ref={prevRef}
                aria-label="Previous products"
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-150",
                  "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow",
                  "active:scale-95 disabled:pointer-events-none disabled:opacity-30",
                ].join(" ")}
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
              </button>

              <button
                ref={nextRef}
                aria-label="Next products"
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-150",
                  "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow",
                  "active:scale-95 disabled:pointer-events-none disabled:opacity-30",
                ].join(" ")}
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* ── Product Carousel ─────────────────────────────────────────── */}
          <div className="px-4 pt-4 pb-8">
            {filteredProducts.length > 0 ? (
              <Swiper key={activeTab} {...swiperParams}>
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="pb-1">
                      <ProductCard product={product} className="h-full w-full" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex h-32 items-center justify-center text-sm text-gray-400">
                No products available in this category.
              </div>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}