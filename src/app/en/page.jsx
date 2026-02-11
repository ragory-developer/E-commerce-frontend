'use client'
import React from 'react'
import Header from './../../components/layout/Header/Header';
import Footer from "@/components/layout/Footer/Footer";
import NewsletterSection from "@/components/layout/NewsLetter/NewsLetterSection";
import HeroSection from "@/components/layout/HeroSection/HeroSection";

const HomePage = () => {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}


export default HomePage