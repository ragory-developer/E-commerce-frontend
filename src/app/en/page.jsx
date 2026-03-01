'use client'
import React from "react";
import NewsletterSection from "@/components/layout/NewsLetter/NewsLetterSection";
import HeroSection from "@/components/layout/HeroSection/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection/FeaturesSection";
import BrandsSection from "@/components/layout/BrandsSection/BrandsSection";
import { catProduct } from "@/data/productData";
import DefaultTabSection from "@/components/layout/FeatureTabSection/DefaultTabSection";





const HomePage = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturesSection />
      <DefaultTabSection products={catProduct} />
      <BrandsSection />
      <DefaultTabSection products={catProduct} rowCount={2} />
      <DefaultTabSection products={catProduct} />
      <NewsletterSection />
    </div>
  );
}


export default HomePage