import { useState } from "react";
import StarRatings from "react-star-ratings";
import { Heart, GitCompare, ShoppingCart } from "lucide-react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

export default function ProductCard({ product }) {
  const [inWishlist, setInWishlist] = useState(false);
  const [inCompare, setInCompare] = useState(false);

  const {
    id,
    image,
    title,
    price,
    originalPrice,
    discountPercent,
    isNew,
    isOutOfStock,
    rating = 0,
  } = product;

  const hasDiscount = discountPercent > 0 || originalPrice > price;

  return (
    <div
      className="group p-1.5  bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow overflow-hidden  flex flex-col cursor-pointer"
      data-product-id={id}>
      {/* Image container with aspect ratio */}
      <div className="relative aspect-square bg-gray-100">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-[5px] left-[5px] flex flex-col gap-1">
          {isOutOfStock && (
            <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded">
              Out of Stock
            </span>
          )}
          {isNew && !isOutOfStock && (
            <span className="px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded">
              New
            </span>
          )}
          {hasDiscount && !isOutOfStock && (
            <span className="px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist & Compare */}
        <div className="absolute top-1.5 right-1.5 flex flex-col gap-1 transition-opacity duration-200">
          <button
            onClick={() => setInWishlist(!inWishlist)}
            className={`p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-red-500 hover:text-white transition ${inWishlist ? "text-red-500" : "text-gray-600"
              }`}
            aria-label="Wishlist">
            <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => setInCompare(!inCompare)}
            className={`p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-blue-500 hover:text-white transition ${inCompare ? "text-blue-500" : "text-gray-600"
              }`}
            aria-label="Compare">
            <GitCompare size={18} />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2 lg:px-3 lg:py-2.5 xl:px-3 xl:py-2.5 2xl:px-3 2xl:py-2.5 flex flex-col">
        <h3 className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] font-semibold text-gray-600 line-clamp-2 mb-1 hover:underline">
          {title}
        </h3>

        <div className="text-[12px] text-gray-500 flex items-center gap-2 mb-4">
          <StarRatings
            rating={rating}
            starRatedColor="gray"
            starEmptyColor="lightgray"
            numberOfStars={5}
            starDimension="12px"
            starSpacing="1px"
            name="rating"
            className="shrink-0 inline-block"
          />
          <span>0 Review</span>
        </div>

        {/* PRICE SECTION – FIXED TO PREVENT LAYOUT SHIFT */}
        <div className="flex items-center justify-between mt-auto">
          {/* Always two lines: original (or invisible placeholder) + current price */}
          <div className="flex flex-col">
            {/* Top line: visible + line-through only when discounted; otherwise invisible */}
            <span
              className={`text-sm text-gray-400 ${hasDiscount ? "line-through" : "invisible"
                }`}>
              {formatCurrency(originalPrice || price)}
            </span>
            {/* Bottom line: current price, color depends on discount */}
            <span
              className={`text-md font-bold ${hasDiscount ? "text-red-600" : "text-blue-600"
                }`}>
              {formatCurrency(price)}
            </span>
          </div>

          <button
            className="p-1.5 rounded-md group text-blue-600 hover:bg-blue-600 hover:text-white bg-blue-100 outline outline-blue-200 transition"
            aria-label="Add to cart"
            disabled={isOutOfStock}>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}