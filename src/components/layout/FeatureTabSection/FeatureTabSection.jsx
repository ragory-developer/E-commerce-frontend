"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import ProductCard from "@/components/ui/ProductCard";
import Container from "./../../../design-system/Container/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Static product data with category field ────────────────────────────────
const PRODUCTS = [
  // ── Electronics ──────────────────────────────────────────────────────────
  {
    id: 1,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Wireless Noise-Cancelling Headphones",
    price: 79.99,
    originalPrice: 129.99,
    discountPercent: 38,
    isNew: true,
    isOutOfStock: false,
    rating: 4.8,
    review: 342,
  },
  {
    id: 2,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Smart Watch Pro Series 5",
    price: 199.99,
    originalPrice: 249.99,
    discountPercent: 20,
    isNew: true,
    isOutOfStock: false,
    rating: 4.6,
    review: 218,
  },
  {
    id: 3,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Portable Bluetooth Speaker",
    price: 49.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: false,
    isOutOfStock: false,
    rating: 4.4,
    review: 185,
  },
  {
    id: 4,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "4K Ultra HD Action Camera",
    price: 149.99,
    originalPrice: 199.99,
    discountPercent: 25,
    isNew: false,
    isOutOfStock: false,
    rating: 4.5,
    review: 97,
  },
  {
    id: 5,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "USB-C Fast Charging Hub 7-in-1",
    price: 34.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: true,
    isOutOfStock: false,
    rating: 4.3,
    review: 412,
  },
  {
    id: 6,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Gaming Mechanical Keyboard RGB",
    price: 89.99,
    originalPrice: 119.99,
    discountPercent: 25,
    isNew: false,
    isOutOfStock: true,
    rating: 4.7,
    review: 563,
  },
  {
    id: 7,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Wireless Ergonomic Mouse",
    price: 39.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: false,
    isOutOfStock: false,
    rating: 4.2,
    review: 291,
  },
  {
    id: 8,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Smart LED Desk Lamp Wi-Fi",
    price: 29.99,
    originalPrice: 44.99,
    discountPercent: 33,
    isNew: false,
    isOutOfStock: false,
    rating: 4.1,
    review: 134,
  },
  {
    id: 9,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "True Wireless Earbuds ANC",
    price: 59.99,
    originalPrice: 79.99,
    discountPercent: 25,
    isNew: true,
    isOutOfStock: false,
    rating: 4.6,
    review: 677,
  },
  {
    id: 10,
    category: "Electronics",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Mini Projector 1080p Portable",
    price: 119.99,
    originalPrice: 159.99,
    discountPercent: 25,
    isNew: false,
    isOutOfStock: false,
    rating: 4.0,
    review: 88,
  },

  // ── Fashion ───────────────────────────────────────────────────────────────
  {
    id: 11,
    category: "Fashion",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Men's Classic Slim Fit Chinos",
    price: 44.99,
    originalPrice: 59.99,
    discountPercent: 25,
    isNew: true,
    isOutOfStock: false,
    rating: 4.4,
    review: 203,
  },
  {
    id: 12,
    category: "Fashion",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Women's Floral Wrap Dress",
    price: 34.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: true,
    isOutOfStock: false,
    rating: 4.7,
    review: 318,
  },
  {
    id: 13,
    category: "Fashion",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Leather Bifold Wallet Slim",
    price: 19.99,
    originalPrice: 29.99,
    discountPercent: 33,
    isNew: false,
    isOutOfStock: false,
    rating: 4.3,
    review: 145,
  },
  {
    id: 14,
    category: "Fashion",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Unisex Oversized Hoodie",
    price: 39.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: false,
    isOutOfStock: false,
    rating: 4.5,
    review: 492,
  },
  {
    id: 15,
    category: "Fashion",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Canvas Sneakers Low-Top",
    price: 54.99,
    originalPrice: 74.99,
    discountPercent: 27,
    isNew: true,
    isOutOfStock: true,
    rating: 4.2,
    review: 261,
  },
  {
    id: 16,
    category: "Fashion",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Polarized Aviator Sunglasses",
    price: 24.99,
    originalPrice: 39.99,
    discountPercent: 38,
    isNew: false,
    isOutOfStock: false,
    rating: 4.1,
    review: 178,
  },
  {
    id: 17,
    category: "Fashion",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Knit Beanie Winter Hat",
    price: 14.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: false,
    isOutOfStock: false,
    rating: 4.6,
    review: 89,
  },
  {
    id: 18,
    category: "Fashion",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Crossbody Vegan Leather Bag",
    price: 49.99,
    originalPrice: 64.99,
    discountPercent: 23,
    isNew: true,
    isOutOfStock: false,
    rating: 4.8,
    review: 374,
  },

  // ── Home & Living ─────────────────────────────────────────────────────────
  {
    id: 19,
    category: "Home & Living",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Bamboo Cutting Board Set (3 pcs)",
    price: 29.99,
    originalPrice: 39.99,
    discountPercent: 25,
    isNew: false,
    isOutOfStock: false,
    rating: 4.7,
    review: 512,
  },
  {
    id: 20,
    category: "Home & Living",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Scented Soy Candle Gift Set",
    price: 24.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: true,
    isOutOfStock: false,
    rating: 4.9,
    review: 286,
  },
  {
    id: 21,
    category: "Home & Living",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Memory Foam Pillow King Size",
    price: 44.99,
    originalPrice: 59.99,
    discountPercent: 25,
    isNew: false,
    isOutOfStock: false,
    rating: 4.5,
    review: 193,
  },
  {
    id: 22,
    category: "Home & Living",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Ceramic Plant Pot Set Modern",
    price: 19.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: true,
    isOutOfStock: false,
    rating: 4.4,
    review: 147,
  },
  {
    id: 23,
    category: "Home & Living",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Non-Stick Cookware Set 10 pcs",
    price: 89.99,
    originalPrice: 129.99,
    discountPercent: 31,
    isNew: false,
    isOutOfStock: true,
    rating: 4.6,
    review: 428,
  },
  {
    id: 24,
    category: "Home & Living",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Wall Art Canvas Print 3 Panel",
    price: 39.99,
    originalPrice: 54.99,
    discountPercent: 27,
    isNew: false,
    isOutOfStock: false,
    rating: 4.2,
    review: 93,
  },
  {
    id: 25,
    category: "Home & Living",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Stainless Steel Water Bottle 1L",
    price: 22.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: true,
    isOutOfStock: false,
    rating: 4.8,
    review: 631,
  },
  {
    id: 26,
    category: "Home & Living",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Adjustable Shelf Organizer",
    price: 17.99,
    originalPrice: 24.99,
    discountPercent: 28,
    isNew: false,
    isOutOfStock: false,
    rating: 4.3,
    review: 209,
  },

  // ── Sports ────────────────────────────────────────────────────────────────
  {
    id: 27,
    category: "Sports",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Resistance Bands Set 5 Levels",
    price: 18.99,
    originalPrice: 24.99,
    discountPercent: 24,
    isNew: false,
    isOutOfStock: false,
    rating: 4.6,
    review: 782,
  },
  {
    id: 28,
    category: "Sports",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Yoga Mat Non-Slip 6mm Thick",
    price: 29.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: true,
    isOutOfStock: false,
    rating: 4.7,
    review: 543,
  },
  {
    id: 29,
    category: "Sports",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Adjustable Dumbbell Pair 20kg",
    price: 119.99,
    originalPrice: 159.99,
    discountPercent: 25,
    isNew: false,
    isOutOfStock: true,
    rating: 4.8,
    review: 317,
  },
  {
    id: 30,
    category: "Sports",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Running Belt Waist Pack",
    price: 14.99,
    originalPrice: 19.99,
    discountPercent: 25,
    isNew: false,
    isOutOfStock: false,
    rating: 4.3,
    review: 246,
  },
  {
    id: 31,
    category: "Sports",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Jump Rope Speed Cable Pro",
    price: 12.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: true,
    isOutOfStock: false,
    rating: 4.5,
    review: 411,
  },
  {
    id: 32,
    category: "Sports",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Foam Roller Deep Tissue 45cm",
    price: 22.99,
    originalPrice: 32.99,
    discountPercent: 30,
    isNew: false,
    isOutOfStock: false,
    rating: 4.6,
    review: 358,
  },
  {
    id: 33,
    category: "Sports",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Insulated Sports Gym Bag",
    price: 34.99,
    originalPrice: null,
    discountPercent: 0,
    isNew: false,
    isOutOfStock: false,
    rating: 4.4,
    review: 172,
  },
  {
    id: 34,
    category: "Sports",
    image: "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: "Compression Running Socks 3 Pairs",
    price: 16.99,
    originalPrice: 22.99,
    discountPercent: 26,
    isNew: true,
    isOutOfStock: false,
    rating: 4.5,
    review: 297,
  },
];

// ─── Tab config — categories derive from unique product categories ───────────
const ALL_LABEL = "All";
const TABS = [
  ALL_LABEL,
  ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function FeatureTabSection() {
  const [activeTab, setActiveTab] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // ── Filter products by active tab ─────────────────────────────────────────
  const activeCategory = TABS[activeTab];
  const filteredProducts =
    activeCategory === ALL_LABEL
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const swiperParams = {
    modules: [Navigation, Pagination, Grid],
    Autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1, // smallest screens
    grid: { rows: 1, fill: "row" },
    spaceBetween: 12,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
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

  return (
    <section className="bg-white py-8 md:py-12">
      <Container>
        <div className="relative">
          {/* ── Tab Headers ──────────────────────────────────────────────── */}
          <div className="flex items-center justify-start md:justify-between">
            {/* Tabs container – full width on mobile, flex‑1 on desktop */}
            <div className="w-full md:flex-1 mb-6">
              <ul
                className="flex flex-nowrap gap-2 md:gap-6 overflow-x-auto pb-2"
                style={{ scrollbarWidth: 'thin' }} /* optional: nicer scrollbar */
              >
                {TABS.map((tab, index) => (
                  <li
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`cursor-pointer whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors ${activeTab === index
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                      }`}
                  >
                    {tab}
                    <span
                      className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${activeTab === index
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {tab === ALL_LABEL
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.category === tab).length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation buttons – hidden below md */}
            <div className="gap-3 hidden md:flex">
              <button
                ref={prevRef}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 active:text-blue-600 focus:outline-none focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <button
                ref={nextRef}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 active:text-blue-600 hover:text-blue-600 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Tab Content ──────────────────────────────────────────────── */}
          <div className="relative">
            {filteredProducts.length > 0 ? (
              <Swiper key={activeTab} {...swiperParams}>
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="w-full">
                      <ProductCard product={product} className="h-full w-full" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="py-8 text-center text-gray-500">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );

}