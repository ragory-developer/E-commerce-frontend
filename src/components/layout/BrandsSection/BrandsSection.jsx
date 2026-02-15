/**
 * BRANDS SECTION - FIXED VERSION
 * ==============================
 * 
 * Changes Made:
 * 1. Using Container (consistent padding)
 * 2. Removed autoplay (better UX)
 * 3. Fixed alignment with other sections
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/design-system/Container/Container";
const brands = [
  { id: 1, name: "Asus", logo: "https://asia.fleetcart.envaysoft.com/storage/media/JnH5uK3QY3mOamQ8NsHCbtqj0xULHsjOTHtHTbeO.png", url: "/brands/asus" },
  { id: 2, name: "Acer", logo: "https://asia.fleetcart.envaysoft.com/storage/media/rCfwklCfNTBKz4JGeloPqqI7BTS8PdYibzEkB8mS.png", url: "/brands/acer" },
  { id: 3, name: "Adidas", logo: "https://asia.fleetcart.envaysoft.com/storage/media/H0BnQ6XoB6vBb1YAkRg22mncLS76Yv0zGz4T4M04.png", url: "/brands/adidas" },
  { id: 4, name: "Apple", logo: "https://asia.fleetcart.envaysoft.com/storage/media/jZG1juhijMhWSrn8B4jgsX5x4Vb8dOTdZTtGNACo.png", url: "/brands/apple" },
  { id: 5, name: "Beats", logo: "https://asia.fleetcart.envaysoft.com/storage/media/3IcUp71JfyiH3wkWU0omhlcs0xqgdWzmY3Z4imMO.png", url: "/brands/beats" },
  { id: 6, name: "Dell", logo: "https://asia.fleetcart.envaysoft.com/storage/media/8bmlnpJluQBwAAJolyS708652aY6Kj8dEmYQ7woo.png", url: "/brands/dell" },
  { id: 7, name: "HP", logo: "https://asia.fleetcart.envaysoft.com/storage/media/j2WP3lfi8JTanXQsxrNDclJAb2RHKxBOtlQwlK2g.png", url: "/brands/hp" },
  { id: 8, name: "Huawei", logo: "https://asia.fleetcart.envaysoft.com/storage/media/SbgS1CCecSpvvnBeBmG6xP49q2NymXQzJpiHbMAi.png", url: "/brands/huawei" },
];

export default function BrandsSection() {
  return (
    <section className="bg-white py-8 md:py-12">
      <Container>
        <div className="relative border border-gray-200 rounded-2xl overflow-hidden group">
          <Swiper
            modules={[FreeMode, Navigation]}
            spaceBetween={16}
            slidesPerView={5}
            freeMode={true}
            grabCursor={true}
            loop={true}
            navigation={{
              prevEl: ".brand-swiper-prev",
              nextEl: ".brand-swiper-next",
            }}
            observer={true}
            observeParents={true}
            watchOverflow={true}
            breakpoints={{
              320: { slidesPerView: 2 },
              480: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            className="top-brands swiper"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <a
                  href={brand.url}
                  className="flex items-center justify-center h-24 p-4 overflow-hidden"
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-110"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="brand-swiper-prev absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button className="brand-swiper-next absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </Container>
    </section>
  );
}
