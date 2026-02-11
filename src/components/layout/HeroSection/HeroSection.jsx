import React from "react";
import CategoryPanel from "./sections/CategoryPanel";
import HeroCarousel from "./sections/HeroCarousel";
import BannerSection from "./sections/BannerSection";

const HeroSection = () => {
  return (
    <section className="w-full max-w-[90vw] mx-auto py-4 px-2 md:px-4">
      <div className="grid grid-cols-12 gap-3 md:gap-4 lg:gap-6">
        {/* Category */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
          <CategoryPanel />
        </div>

        {/* Hero */}
        <div className="col-span-12 lg:col-span-9 xl:col-span-7">
          <div className="w-full h-[300px] md:h-[400px] lg:h-[620px]">
            <HeroCarousel />
          </div>
        </div>

        {/* Banner - visible only on xl */}
        <div className="hidden xl:block xl:col-span-3">
          <BannerSection />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
