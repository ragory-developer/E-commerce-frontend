import React from "react";
import CategoryPanel from "./sections/CategoryPanel";
import HeroCarousel from "./sections/HeroCarousel";
import BannerSection from "./sections/BannerSection";

const HeroSection = () => {
  return (
    <section className=" px-4 md:max-w-[90%] mx-auto py-4 xl:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6">
        {/* Category Panel - Hidden on mobile, shows from lg */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
          <div className="h-full min-h-[300px] lg:min-h-[620px]">
            <CategoryPanel />
          </div>
        </div>

        {/* Hero Carousel - Full width on mobile, adapts on larger screens */}
        <div className="col-span-1 md:col-span-2 lg:col-span-9 xl:col-span-7">
          <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[620px]">
            <HeroCarousel />
          </div>
        </div>

        {/* Banner Section - Hidden until xl breakpoint */}
        <div className="hidden xl:block xl:col-span-3">
          <div className="h-full min-h-[620px]">
            <BannerSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
