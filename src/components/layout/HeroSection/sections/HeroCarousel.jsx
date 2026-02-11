import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      id: 0,
      title: "Summer Collection 2024",
      subtitle: "Up to 50% Off",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800",
    },
    {
      id: 1,
      title: "New Arrivals",
      subtitle: "Discover Latest Trends",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800",
    },
    {
      id: 2,
      title: "Tech Gadgets",
      subtitle: "Innovation at its Best",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800",
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length,
    );
  };

  return (
    <div className="relative h-full rounded-xl overflow-hidden ">
      {/* Carousel Items */}
      <div className="relative h-full">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}>
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
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-20 transition-all">
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-20 transition-all">
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
