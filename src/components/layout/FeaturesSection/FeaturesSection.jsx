import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import {
  Headset,
  CreditCard,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    title: "24/7 SUPPORT",
    description: "Support every time",
    icon: Headset,
  },
  {
    title: "ACCEPT PAYMENT",
    description: "Visa, Paypal, Master",
    icon: CreditCard,
  },
  {
    title: "SECURED PAYMENT",
    description: "100% secured",
    icon: ShieldCheck,
  },
  {
    title: "FREE SHIPPING",
    description: "Order over $100",
    icon: Truck,
  },
  {
    title: "30 DAYS RETURN",
    description: "30 days guarantee",
    icon: RotateCcw,
  },
];

export default function FeatureCarousel() {
  return (
    <section className="bg-white w-full px-4 py-8 md:py-12">
      {/* Centered container with max width and border */}
      <div className="md:max-w-[90vw] xl:max-w-500 xl:px-12">
        <div className="  px-4  mx-auto border border-gray-200 rounded-2xl overflow-hidden">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={16}
            slidesPerView={5}
            freeMode={true}
            grabCursor={true}
            observer={true}
            observeParents={true}
            watchOverflow={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="feature-swiper">
            {features.map(({ title, description, icon: Icon }, index) => (
              <SwiperSlide key={index}>
                {/* Outer card: fixed height, flex, centered vertically */}
                <div className="bg-white h-24 flex items-center px-2 relative">
                  {/* Content wrapper – centered horizontally with gap */}
                  <div className="flex items-center justify-center gap-2 w-full">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0 text-center sm:text-left">
                      <h3 className="font-medium text-xs sm:text-sm text-gray-700 truncate">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Short divider – only between slides, hidden on mobile */}
                  {index < features.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200 hidden sm:block" />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
