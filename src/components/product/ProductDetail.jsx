"use client";

import React, { useState, useCallback, useEffect } from "react";
import StarRatings from "react-star-ratings";
import {
  Heart,
  ShoppingCart,
  Check,
  Star,
  Share2,
  Facebook,
  Twitter,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ZoomIn,
  Headphones,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import Container from "@/design-system/Container/Container";
import ProductTabs from "./ProductTabs";

// -----------------------------------------------------------------------------
// CUSTOM IMAGE GALLERY – replaces react-image-gallery (no CSS import needed)
// -----------------------------------------------------------------------------
const CustomImageGallery = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const goTo = useCallback(
    (index) => {
      setActiveIndex((index + items.length) % items.length);
      setIsZoomed(false);
    },
    [items.length]
  );

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFullscreen, prev, next]);

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const MainImage = ({ fullscreen = false }) => (
    <div
      className={`relative overflow-hidden bg-gray-50 ${fullscreen ? "w-full h-full" : "w-full aspect-square"
        }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <div
        className={`w-full h-full transition-transform duration-200 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        style={
          isZoomed
            ? {
              transform: "scale(2.2)",
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            }
            : { transform: "scale(1)" }
        }
        onClick={() => setIsZoomed((z) => !z)}
      >
        <img
          src={items[activeIndex].original}
          alt={`Product image ${activeIndex + 1}`}
          className="w-full h-full object-cover select-none"
          draggable={false}
        />
      </div>

      {/* Nav arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors border border-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors border border-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Zoom hint */}
      {!isZoomed && !fullscreen && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/50 text-white text-xs px-2.5 py-1.5 rounded-full pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Click to zoom</span>
        </div>
      )}

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 pointer-events-none">
          {items.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${i === activeIndex
                ? "w-5 h-1.5 bg-blue-600"
                : "w-1.5 h-1.5 bg-gray-300"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Main gallery */}
      <div className="space-y-2">
        <div className="relative rounded-md overflow-hidden border border-gray-200 group">
          <MainImage />
          {/* Fullscreen button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 border border-gray-100"
          >
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Thumbnails */}
        {items.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === activeIndex
                  ? "border-blue-600 ring-2 ring-blue-600/20"
                  : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                  }`}
              >
                <img
                  src={item.thumbnail}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <div
            className="flex-1 flex items-center justify-center px-16 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prev}
              className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <img
              src={items[activeIndex].original}
              alt={`Product image ${activeIndex + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            <button
              onClick={next}
              className="absolute right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div
            className="flex justify-center gap-2 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex
                  ? "border-blue-400 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
                  }`}
              >
                <img
                  src={item.thumbnail}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="text-center pb-4 text-white/60 text-sm">
            {activeIndex + 1} / {items.length}
          </div>
        </div>
      )}
    </>
  );
};

// -----------------------------------------------------------------------------
// 1. ProductImageGallery
// -----------------------------------------------------------------------------
const ProductImageGallery = ({ images, discount }) => (
  <div className="lg:sticky lg:top-8 lg:self-start">
    <div className="relative">
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
          -{discount}% OFF
        </div>
      )}
      <CustomImageGallery items={images} />
    </div>

    {/* Share Section (desktop only) */}
    <div className="hidden lg:block pt-6 border-t border-gray-200 mt-6">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Share this product</span>
        <div className="flex gap-3">
          {[Facebook, Twitter, Share2].map((Icon, i) => (
            <button
              key={i}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// 2. ProductHeader (tightened)
// -----------------------------------------------------------------------------
const ProductHeader = ({ category, name, rating, reviewCount, isWishlisted, onWishlistToggle }) => (
  <div>
    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{category}</span>
    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 mb-1 leading-tight">
      {name}
    </h1>
    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <StarRatings
            rating={rating}             // your rating value (e.g., 3.5)
            starRatedColor="orange"      // color for filled stars
            starEmptyColor="gray"        // color for empty stars
            numberOfStars={5}            // total number of stars
            starDimension="16px"         // equivalent to w-3.5 h-3.5
            starSpacing="2px"            // optional spacing between stars
            name="rating"
            // round to nearest half star
            halfStar={false}              // allow half stars
          />
        </div>
        <span className="text-xs text-gray-600">
          {rating}/5 · {reviewCount} reviews
        </span>
      </div>
      <button
        onClick={onWishlistToggle}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 ${isWishlisted
          ? "bg-blue-50 border-blue-600 text-blue-600"
          : "border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600"
          }`}
      >
        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-blue-600" : ""}`} />
        <span className="text-xs font-medium">{isWishlisted ? "Saved" : "Save"}</span>
      </button>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// 3. ProductPrice 
// -----------------------------------------------------------------------------
const ProductPrice = ({ currency, current, original, savings, inStock, stockCount }) => (
  <div className="space-y-1">
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-900">
        {currency}
        {current.toFixed(2)}
      </span>
      {original && (
        <span className="text-base text-gray-400 line-through">
          {currency}
          {original}
        </span>
      )}
      {savings > 0 && (
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">
          Save {currency}
          {savings.toFixed(2)}
        </span>
      )}
    </div>
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
      <span className={`text-xs font-medium ${inStock ? "text-green-600" : "text-red-600"}`}>
        {inStock ? `In Stock · ${stockCount} left` : "Out of Stock"}
      </span>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// 4. ProductSkuTags (tightened)
// -----------------------------------------------------------------------------
const ProductSkuTags = ({ sku, tags }) => (
  <div className="space-y-2 py-3 border-y border-gray-200">
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-600">SKU</span>
      <span className="text-xs font-medium text-gray-900">{sku}</span>
    </div>
    <div>
      <span className="text-xs text-gray-600 block mb-1">Tags</span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// 5. ProductColorSelector 
// -----------------------------------------------------------------------------
const ProductColorSelector = ({ colors, selectedColor, onColorChange }) => {
  const selectedColorData = colors.find((c) => c.id === selectedColor);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Color</h3>
        <span className="text-sm text-gray-600">{selectedColorData?.name}</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onColorChange(color.id)}
            disabled={!color.available}
            className={`relative flex flex-col items-center group ${!color.available ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <div
              className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full  border-2 flex items-center justify-center transition-all duration-200 ${selectedColor === color.id
                ? "border-blue-600 ring-2 ring-blue-600/30 "
                : "border-gray-300 group-hover:border-gray-400"
                }`}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.id && (
                <Check className="w-4 h-4 text-white drop-shadow-md" />
              )}
            </div>
            <span className="text-xs mt-1 text-gray-600 hidden sm:block">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 6. ProductSizeSelector 
// -----------------------------------------------------------------------------
const ProductSizeSelector = ({ sizes, selectedSize, onSizeChange, currency }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900">Size</h3>
      <span className="text-sm text-gray-500">Select your size</span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => onSizeChange(size.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1 ${selectedSize === size.id
            ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
        >
          <span>{size.value}</span>
          {size.price > 0 && (
            <span className="text-[10px] text-gray-500">
              +{currency}
              {size.price}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// 7. ProductQuantityAddToCart (tightened)
// -----------------------------------------------------------------------------
const ProductQuantityAddToCart = ({
  quantity,
  onQuantityChange,
  totalPrice,
  currency,
  inStock,
  onAddToCart,
}) => (
  <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Quantity</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-base sm:text-lg font-bold text-gray-900">
              {currency}
              {totalPrice.toFixed(2)}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-around  gap-12">
        <button
          disabled={!inStock}
          onClick={onAddToCart}
          className={`w-2/5 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-sm ${inStock
            ? "bg-gray-700 hover:bg-gray-00 text-white"
            : "bg-gray-300 cursor-not-allowed text-gray-500"
            }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {inStock ? "Order Now" : "Out of Stock"}
        </button>
        <button
          disabled={!inStock}
          onClick={onAddToCart}
          className={`w-2/5 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-sm ${inStock
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 cursor-not-allowed text-gray-500"
            }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>

      </div>
    </div>
  </div>
);


// -----------------------------------------------------------------------------
// 10. ProductSupportInfo (new component)
// -----------------------------------------------------------------------------
const ProductSupportInfo = () => {
  const items = [
    { icon: Headphones, title: "24/7 SUPPORT", subtitle: "Support every time" },
    { icon: CreditCard, title: "ACCEPT PAYMENT", subtitle: "Visa, Paypal, Master" },
    { icon: Shield, title: "SECURED PAYMENT", subtitle: "100% secured" },
    { icon: Truck, title: "FREE SHIPPING", subtitle: "Order over $100" },
    { icon: RotateCcw, title: "30 DAYS RETURN", subtitle: "30 days guarantee." },
  ];

  return (
    <div className="space-y-5">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 flex items-center justify-center text-gray-600">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-gray-700 text-sm">{item.title}</div>
              <div className="text-gray-400 text-xs">{item.subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("m");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productData = {
    id: "PROD001",
    name: "Premium Leather Backpack",
    category: "Bags & Luggage",
    brand: "Luxury Goods",
    description:
      "Experience unparalleled quality with our premium leather backpack. Crafted from genuine full-grain leather and designed for both style and functionality, this backpack combines timeless elegance with modern convenience.",
    shortDescription: "Premium genuine leather backpack with modern design",
    sku: "BAG-2024-001",
    price: { current: 249.99, original: 349.99, currency: "$", discount: 29 },
    rating: 4.7,
    reviewCount: 128,
    inStock: true,
    stockCount: 15,
    tags: ["Premium", "Leather", "Backpack", "Waterproof", "Laptop Compatible"],
    images: [
      {
        original: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
      },
      {
        original: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=200&q=80",
      },
      {
        original: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80",
      },
      {
        original:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80&auto=format&fit=crop&crop=center&h=800",
        thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
      },
    ],
    colors: [
      { id: "red", name: "Burgundy", hex: "#7C2D12", available: true },
      { id: "brown", name: "Chestnut Brown", hex: "#92400E", available: true },
      { id: "black", name: "Jet Black", hex: "#1F2937", available: true },
      { id: "tan", name: "Saddle Tan", hex: "#B45309", available: false },
    ],
    sizes: [
      { id: "s", value: "Small", price: 0 },
      { id: "m", value: "Medium", price: 0 },
      { id: "l", value: "Large", price: 20 },
      { id: "xl", value: "Extra Large", price: 40 },
    ],
  };

  const selectedSizeData = productData.sizes.find((s) => s.id === selectedSize);
  const basePrice = productData.price.current;
  const sizePrice = selectedSizeData?.price || 0;
  const totalPrice = (basePrice + sizePrice) * quantity;
  const savings = productData.price.original - basePrice;

  const specifications = [
    {
      title: "Dimensions & Weight",
      rows: [
        { label: "Height", value: "18 inches" },
        { label: "Width", value: "12 inches" },
        { label: "Depth", value: "6 inches" },
        { label: "Weight", value: "2.5 lbs" },
        { label: "Volume", value: "25 liters" },
      ],
    },
    {
      title: "Materials & Care",
      rows: [
        { label: "Material", value: "Full-grain Leather" },
        { label: "Lining", value: "Polyester" },
        { label: "Zippers", value: "YKK® Metal Zippers" },
        { label: "Care Instructions", value: "Wipe with damp cloth" },
        { label: "Warranty", value: "2 Years" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Container>
        {/* 12‑col grid: 3 cols image, 6 cols details, 3 cols support */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 lg:px-8 lg:py-8">
          {/* Column 1: Image Gallery (1/4) */}
          <div className="col-span-12 lg:col-span-4">
            <ProductImageGallery
              images={productData.images}
              discount={productData.price.discount}
            />
          </div>

          {/* Column 2: Product Details (2/4) – tightened spacing */}
          <div className="col-span-12 lg:col-span-6 px-4 lg:px-0">
            <div className="space-y-4">
              <ProductHeader
                category={productData.category}
                name={productData.name}
                rating={productData.rating}
                reviewCount={productData.reviewCount}
                isWishlisted={isWishlisted}
                onWishlistToggle={() => setIsWishlisted(!isWishlisted)}
              />
              <ProductPrice
                currency={productData.price.currency}
                current={totalPrice}
                original={productData.price.original}
                savings={savings}
                inStock={productData.inStock}
                stockCount={productData.stockCount}
              />
              <ProductSkuTags sku={productData.sku} tags={productData.tags} />
              <ProductColorSelector
                colors={productData.colors}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
              <ProductSizeSelector
                sizes={productData.sizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                currency={productData.price.currency}
              />
              <ProductQuantityAddToCart
                quantity={quantity}
                onQuantityChange={setQuantity}
                totalPrice={totalPrice}
                currency={productData.price.currency}
                inStock={productData.inStock}
                onAddToCart={() => alert("Added to cart!")}
              />
            </div>
          </div>

          {/* Column 3: Support Info (1/4) */}
          <div className="hidden lg:block col-span-12 lg:col-span-2">
            <div className="lg:pl-4">
              <ProductSupportInfo />
            </div>
          </div>
        </div>

        {/* Tabs & Description Section (full width) */}
        <ProductTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          description={productData.description}
          specifications={specifications}
        />
      </Container>
    </div>
  );
}