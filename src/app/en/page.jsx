'use client'
import React from "react";
import NewsletterSection from "@/components/layout/NewsLetter/NewsLetterSection";
import HeroSection from "@/components/layout/HeroSection/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection/FeaturesSection";
import BrandsSection from "@/components/layout/BrandsSection/BrandsSection";




const HomePage = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturesSection />

      <BrandsSection />
      <NewsletterSection />
    </div>
  );
}


export default HomePage