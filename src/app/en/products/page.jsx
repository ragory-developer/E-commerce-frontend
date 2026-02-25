"use client";
import React, { useState, useMemo } from "react";
import { Grid, List } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import ProductListCard from "@/components/ui/ProductListCard";
import Accordion from "@/components/ui/Accordion";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import Container from "@/design-system/Container/Container";

// --- Mock data generation (could be moved to a separate file) ---
const generateMockProducts = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    image:
      "https://asia.fleetcart.envaysoft.com/storage/media/CJ5PGd1PJYtelQrDiHWZsSfdd3di5mEG1aDlEu6I.jpg",
    title: `Product demo name for demo product ${index + 1}`,
    price: 19.99 + index * 5,
    originalPrice: index % 3 === 0 ? 49.99 + index * 2 : null,
    discountPercent: index % 3 === 0 ? 20 : 0,
    isNew: index < 5,
    isOutOfStock: index === 18,
    rating: 4 + (index % 5) / 5,
    review: 50 + index * 7,
  }));

const categoryData = [
  {
    title: "Men",
    children: [
      {
        title: "Clothing",
        children: ["T‑shirts", "Jeans", "Jackets"],
      },
      {
        title: "Shoes",
        children: ["Sneakers", "Formal", "Sandals"],
      },
    ],
  },
  {
    title: "Women",
    children: [
      { title: "Dresses", children: ["Casual", "Evening"] },
      { title: "Accessories", children: ["Bags", "Jewelry"] },
    ],
  },
  {
    title: "Kids",
    children: [
      { title: "Boys", children: ["Shirts", "Shorts"] },
      { title: "Girls", children: ["Frocks", "Skirts"] },
    ],
  },
];

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

// --- Custom pagination hook (plain JS) ---
const usePagination = (totalItems, initialPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage],
  );

  const getPaginatedItems = (items) =>
    items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    getPaginatedItems,
  };
};

// --- Main Component ---
const ProductPage = () => {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [sortBy, setSortBy] = useState("featured");

  // Simulate API data (replace with real fetch)
  const [products, setProducts] = useState(generateMockProducts(20));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    getPaginatedItems,
  } = usePagination(products.length, 12);

  const handleSortChange = (e) => setSortBy(e.target.value);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const delta = 2; // pages to show around current
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside
            className="lg:w-64 shrink-0 space-y-8 order-2 lg:order-1"
            aria-label="Product filters">
            <div className="bg-white p-4 hidden md:block rounded-lg">
              <h3 className="text-gray-600 font-medium mb-3">Categories</h3>
              <div className="relative border-b border-gray-200 mb-4 rounded-full">
                <div className="absolute top-0 left-0 h-0.5 w-1/5 bg-blue-600" />
              </div>
              <Accordion items={categoryData} />
            </div>

            <div className="bg-white rounded-lg p-4 hidden md:block">
              <h3 className="text-gray-600 font-medium mb-3">Price Range</h3>
              <div className="relative border-b border-gray-200 mb-4 rounded-full">
                <div className="absolute top-0 left-0 h-0.5 w-1/5 bg-blue-600" />
              </div>
              <PriceRangeFilter min={0} max={1000} />
            </div>

            <div className="bg-white rounded-lg p-4">
              <h3 className="text-gray-600 font-medium mb-3">
                Latest Products
              </h3>
              <div className="relative border-b border-gray-200 mb-4 rounded-full">
                <div className="absolute top-0 left-0 h-0.5 w-1/5 bg-blue-600" />
              </div>
              <div className="space-y-3">
                {latestProducts.map((product) => (
                  <ProductListCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </aside>

          {/* Main content - flex column to push pagination to bottom */}
          <main className="flex-1 flex flex-col order-1 lg:order-2">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-200 text-gray-600 border-gray-300"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}>
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 border rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-200 text-gray-600 border-gray-300"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}>
                  <List size={20} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort" className="text-gray-600 text-sm">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border border-gray-200 rounded-md px-3 py-2 text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <option value="featured">Featured</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label htmlFor="perPage" className="text-gray-600 text-sm">
                    Show:
                  </label>
                  <select
                    id="perPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-200 rounded-md px-3 py-2 text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading / Error / Empty states */}
            {loading && (
              <div className="text-center py-10">Loading products...</div>
            )}
            {error && (
              <div className="text-center py-10 text-red-500">
                Error: {error}
              </div>
            )}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-10">No products found.</div>
            )}

            {/* Product grid/list - grows to fill space */}
            {!loading && !error && products.length > 0 && (
              <>
                <div className="flex-1">
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4"
                        : "grid grid-cols-1 md:grid-cols-2 gap-4"
                    }>
                    {getPaginatedItems(products).map((product) =>
                      viewMode === "grid" ? (
                        <ProductCard key={product.id} product={product} />
                      ) : (
                        <ProductListCard key={product.id} product={product} />
                      ),
                    )}
                  </div>
                </div>

                {/* Pagination - sticky at bottom */}
                {totalPages > 1 && (
                  <nav
                    className="mt-8 flex justify-center items-center gap-2"
                    aria-label="Pagination">
                    {/* First button (hidden on mobile) */}
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="hidden sm:inline-block px-3 py-2 rounded-full border border-gray-300 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      aria-label="First page">
                      First
                    </button>

                    {/* Previous */}
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-full border border-gray-300 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      aria-label="Previous page">
                      Previous
                    </button>

                    {/* Page numbers with ellipsis */}
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                          aria-label={`Page ${page}`}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }>
                          {page}
                        </button>
                      ),
                    )}

                    {/* Next */}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-full border border-gray-300 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      aria-label="Next page">
                      Next
                    </button>

                    {/* Last button (hidden on mobile) */}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="hidden sm:inline-block px-3 py-2 rounded-full border border-gray-300 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      aria-label="Last page">
                      Last
                    </button>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>
      </Container>
    </section>
  );
};

export default ProductPage;
