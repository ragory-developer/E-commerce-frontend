'use client'
import React from 'react'
import Header from './../../components/layout/Header/Header';
import Footer from "@/components/layout/Footer/Footer";
import NewsletterSection from "@/components/layout/NewsLetter/NewsLetterSection";
import HeroSection from "@/components/layout/HeroSection/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection/FeaturesSection";
import BrandsSection from "@/components/layout/BrandsSection/BrandsSection";
import ProcessTab from '@/components/checkout/CheckoutTab';



const HomePage = () => {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProcessTab />
      <BrandsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}


export default HomePage