import React from "react";
import CategoryPanel from "./sections/CategoryPanel";
import HeroCarousel from "./sections/HeroCarousel";
import BannerSection from "./sections/BannerSection";
import Container from "@/design-system/Container/Container";

const HeroSection = () => {
  return (
    <section className="py-4 md:py-6">
      <Container>
        {/* Mobile: Stack vertically */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Category Panel - Hidden on mobile, fixed 240px on desktop */}
          <aside className="hidden lg:block lg:w-60 lg:flex-shrink-0">
            <div className="h-[500px] xl:h-[620px]">
              <CategoryPanel />
            </div>
          </aside>

          {/* Hero Carousel - Grows to fill available space */}
          <main className="flex-1 min-w-0">
            <div className="h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[620px]">
              <HeroCarousel />
            </div>
          </main>

          {/* Banner Section - Hidden until xl, fixed 280px */}
          <aside className="hidden xl:block xl:w-70 xl:flex-shrink-0">
            <div className="h-[620px] ">
              <BannerSection />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
