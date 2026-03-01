import { Fragment } from 'react';
import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination as SwiperPagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { catProduct } from "@/data/productData";

import ProductListCard from '@/components/ui/ProductListCard';
import DefaultTabSection from '../layout/FeatureTabSection/DefaultTabSection';
// -----------------------------------------------------------------------------
// SpecificationTable (unchanged)
// -----------------------------------------------------------------------------
const SpecificationTable = ({ sections }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <tbody>
        {sections.map((section, idx) => (
          <Fragment key={idx}>
            <tr className="border-b border-gray-200">
              <th
                colSpan={2}
                className="text-left py-4 px-2 bg-gray-50 font-semibold text-gray-900"
              >
                {section.title}
              </th>
            </tr>
            {section.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-gray-100">
                <td className="py-3 px-2 text-gray-600">{row.label}</td>
                <td className="py-3 px-2 font-medium text-gray-900">{row.value}</td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  </div>
);
const addImg = 'https://img.freepik.com/free-psd/flat-design-spring-sale-square-flyer_23-2150072692.jpg?semt=ais_hybrid&w=740&q=80'
// -----------------------------------------------------------------------------
// ProductTabs – now with "Products you might like" sidebar
// -----------------------------------------------------------------------------
const ProductTabs = ({ activeTab, onTabChange, description, specifications }) => {
  const tabs = [
    { id: "description", label: "Product Description" },
    { id: "specifications", label: "Specifications" },
  ];
  const router = useRouter();
  // Dummy suggested products – replace with real data later
  const latestProducts = [
    {
      id: 101,
      image:
        "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
      title: "New Arrival Sneakers",
      price: 59.99,
    },
    {
      id: 102,
      image:
        "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
      title: "Leather Backpack",
      price: 79.99,
    },
    {
      id: 103,
      image:
        "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
      title: "Aviator Sunglasses",
      price: 89.99,
    },
  ];


  return (
    <div className="border-t border-gray-200 mt-8 lg:mt-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid: 2 columns on large screens, stack on mobile with 24px gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-2 order-3 lg:order-0">
            {/* Latest Products – sidebar swiper on mobile */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-gray-600 font-medium mb-3">Products You Might Like</h3>
              {/* <SectionDivider /> */}

              {/* Static list on md+ */}
              <div className="hidden md:flex flex-col gap-3">
                {latestProducts.map((product) => (
                  <ProductListCard onClick={() => router.push(`/en/product/${product.id}`)} key={product.id} product={product} />
                ))}
              </div>

              {/* Swiper on mobile */}
              <div className="md:hidden">
                <Swiper
                  modules={[A11y]}
                  slidesPerView={1.15}
                  spaceBetween={12}
                >
                  {latestProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductListCard onClick={() => router.push(`/en/product/${product.id}`)} product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Right column: Tabs and content */}
          <div className="lg:col-span-10">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex justify-center gap-6 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`shrink-0 px-8 py-4 font-medium text-sm relative ${activeTab === tab.id ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="py-6 border border-gray-200 rounded-lg bg-white p-2 sm:p-4 md:p-6 lg:p-8">
              {activeTab === "description" && (
                <div className="space-y-8">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">About This Product</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>{description}</p>
                      <p>
                        Designed with attention to detail, this backpack features multiple
                        compartments for organized storage, including a dedicated laptop sleeve that
                        fits up to 15-inch devices. The water-resistant material ensures your
                        belongings stay dry in all weather conditions.
                      </p>
                      <p>
                        The adjustable padded shoulder straps provide maximum comfort, making it
                        perfect for daily commutes, travel, or outdoor adventures. The premium
                        leather ages beautifully, developing a unique patina over time that tells
                        your story.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "specifications" && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-gray-900">Product Specifications</h3>
                  <SpecificationTable sections={specifications} />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* // 2nd rows  */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-2 order-4 lg:order-0">
            {/* Latest Products – sidebar swiper on mobile */}
            <div className="bg-white h-56 aspect-square border border-gray-200 rounded-lg p-4">


              <img src={addImg} alt="Advertisement" className="w-full h-full object-cover rounded-lg" />


            </div>
          </div>

          {/* Right column: Tabs and content */}
          <div className="lg:col-span-10">

            <DefaultTabSection products={catProduct} heading={"Related Product"} rowCount={1} maxInRow={5} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;