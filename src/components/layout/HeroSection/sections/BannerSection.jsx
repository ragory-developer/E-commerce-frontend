import React from "react";

const BannerSection = () => {
  const bannerImages = [
    {
      id: 0,
      title: "Limited Offer",
      subtitle: "30% OFF",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=400&h=300",
    },
    {
      id: 1,
      title: "Flash Sale",
      subtitle: "Ends Soon",
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=400&h=300",
    },
  ];

  return (
    <div className="h-full flex flex-col gap-4">
      {bannerImages.map((banner) => (
        <div
          key={banner.id}
          className="flex-1 relative rounded-md overflow-hidden group min-h-[220px]">
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${banner.image})` }}>
            <div className="absolute inset-0 ">
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold text-lg mb-1">{banner.title}</h4>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerSection;
