import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselItems = [
  {
    id: 0,
    title: "Summer Collection 2024",
    subtitle: "Up to 50% Off",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800",
  },
  {
    id: 1,
    title: "New Arrivals",
    subtitle: "Discover Latest Trends",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800",
  },
  {
    id: 2,
    title: "Tech Gadgets",
    subtitle: "Innovation at its Best",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800",
  },
];

export default function HeroCarousel() {
  return (
    <div className="relative h-full rounded-md overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: ".custom-swiper-prev",
          nextEl: ".custom-swiper-next",
        }}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
          bulletClass: "swiper-pagination-bullet !bg-white/60 !opacity-100",
          bulletActiveClass: "!bg-white !w-6 !rounded-full",
        }}
        className="h-full w-full">
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent">
                <div className="absolute left-6 md:left-8 bottom-6 md:bottom-8 text-white max-w-md">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    {item.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-4 opacity-90">
                    {item.subtitle}
                  </p>
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className="custom-swiper-prev absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all">
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button className="custom-swiper-next absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all">
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <div className="custom-swiper-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2" />
      </Swiper>
    </div>
  );
}
