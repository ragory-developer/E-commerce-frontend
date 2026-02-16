import React from "react";
import CategoryPanel from "./sections/CategoryPanel";
import HeroCarousel from "./sections/HeroCarousel";
import BannerSection from "./sections/BannerSection";
import Container from "@/design-system/Container/Container";
import HeroTabs from "./sections/HeroTabs";

const HeroSection = () => {
  return (
    <section className="py-4 md:py-6">
      <Container>
        <HeroTabs />
        {/* Mobile: Stack vertically */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Category Panel - Hidden on mobile, fixed 240px on desktop */}
          <aside className="hidden lg:block lg:w-72  lg:flex-shrink-0">
            <div className="h-[480px] xl:h-[500px]">
              <CategoryPanel />
            </div>
          </aside>

          {/* Hero Carousel - Grows to fill available space */}
          <main className="flex-1 min-w-0">
            <div className="h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[500px]">
              <HeroCarousel />
            </div>
          </main>

          {/* Banner Section - Hidden until xl, fixed 280px */}
          <aside className="hidden xl:block xl:w-100 xl:flex-shrink-0">
            <div className="h-[500px] ">
              <BannerSection />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;




// square banner//

// const HeroSection = () => {
//   return (
//     <section className="py-4 md:py-6">
//       <Container>
//         <HeroTabs />

//         {/* Grid container with fluid height and responsive column definitions */}
// <div
//   className="grid gap-4 grid-cols-1 lg:grid-cols-[minmax(180px,240px)_1fr] xl:grid-cols-[minmax(180px,240px)_1fr_minmax(200px,280px)] h-[clamp(320px,50vw,500px)]"
// >
//   {/* Category Panel - hidden on mobile, visible at lg+ */}
//   <aside className="hidden lg:block overflow-hidden">
//     <div className="h-full">
//       <CategoryPanel />
//     </div>
//   </aside>

//   {/* Hero Carousel - always visible */}
//   <main className="overflow-hidden min-w-0">
//     <div className="h-full">
//       <HeroCarousel />
//     </div>
//   </main>

//   {/* Banner Section - hidden until xl */}
//   <aside className="hidden xl:block overflow-hidden">
//     <div className="h-full">
//       <BannerSection />
//     </div>
//   </aside>
// </div>
//       </Container >
//     </section >
//   );
// };




