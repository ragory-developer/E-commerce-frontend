import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Replace with your actual brand data
const brands = [
  {
    id: 1,
    name: "Asus",
    logo: "https://asia.fleetcart.envaysoft.com/storage/media/JnH5uK3QY3mOamQ8NsHCbtqj0xULHsjOTHtHTbeO.png",
    url: "https://asia.fleetcart.envaysoft.com/en/brands/asus/products",
  },
  {
    id: 2,
    name: "Acer",
    logo: "https://asia.fleetcart.envaysoft.com/storage/media/rCfwklCfNTBKz4JGeloPqqI7BTS8PdYibzEkB8mS.png",
    url: "https://asia.fleetcart.envaysoft.com/en/brands/acer/products",
  },
  {
    id: 3,
    name: "Adidas",
    logo: "https://asia.fleetcart.envaysoft.com/storage/media/H0BnQ6XoB6vBb1YAkRg22mncLS76Yv0zGz4T4M04.png",
    url: "https://asia.fleetcart.envaysoft.com/en/brands/adidas/products",
  },
  {
    id: 4,
    name: "Apple",
    logo: "https://asia.fleetcart.envaysoft.com/storage/media/jZG1juhijMhWSrn8B4jgsX5x4Vb8dOTdZTtGNACo.png",
    url: "https://asia.fleetcart.envaysoft.com/en/brands/apple/products",
  },
  {
    id: 5,
    name: "Beats",
    logo: "https://asia.fleetcart.envaysoft.com/storage/media/3IcUp71JfyiH3wkWU0omhlcs0xqgdWzmY3Z4imMO.png",
    url: "https://asia.fleetcart.envaysoft.com/en/brands/beats/products",
  },
  {
    id: 6,
    name: "Dell",
    logo: "https://asia.fleetcart.envaysoft.com/storage/media/8bmlnpJluQBwAAJolyS708652aY6Kj8dEmYQ7woo.png",
    url: "https://asia.fleetcart.envaysoft.com/en/brands/dell/products",
  },
  {
    id: 7,
    name: "HP",
    logo: "https://asia.fleetcart.envaysoft.com/storage/media/j2WP3lfi8JTanXQsxrNDclJAb2RHKxBOtlQwlK2g.png",
    url: "https://asia.fleetcart.envaysoft.com/en/brands/hp/products",
  },
  {
    id: 8,
    name: "Huawei",
    logo: "https://asia.fleetcart.envaysoft.com/storage/media/SbgS1CCecSpvvnBeBmG6xP49q2NymXQzJpiHbMAi.png",
    url: "https://asia.fleetcart.envaysoft.com/en/brands/huawei/products",
  },
  // Add more brands as needed
];

export default function BrandsSection() {
  return (
    <section className="bg-white w-full px-4 py-8 md:py-12">
      {/* Outer container – same max-width & padding as FeatureCarousel */}
      <div className="md:max-w-[90vw] xl:max-w-500 xl:px-12 mx-auto">
        {/* Relative wrapper for border + hover effect on buttons */}
        <div className="relative border border-gray-200 rounded-2xl overflow-hidden group">
          <Swiper
            modules={[FreeMode, Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={5}
            freeMode={true}
            grabCursor={true}
            loop={true} // Enables infinite sliding
            autoplay={{
              delay: 3000, // Slide every 3 seconds
              pauseOnMouseEnter: true, // Pause when hovering over the carousel
              disableOnInteraction: true, // Stop autoplay after user drags/clicks (default)
            }}
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
            className="top-brands swiper">
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <a
                  href={brand.url}
                  className="top-brand-item flex items-center justify-center h-24 p-4 overflow-hidden">
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

          {/* Navigation buttons – hidden by default, appear on section hover */}
          <button className="brand-swiper-prev absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-blue-200  hover:bg-blue-600 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button className="brand-swiper-next absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-blue-200  hover:bg-blue-600 rounded-full p-1.5   opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
