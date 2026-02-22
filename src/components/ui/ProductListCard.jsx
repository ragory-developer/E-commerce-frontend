import StarRatings from "react-star-ratings";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export default function ProductListCard({ product }) {
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
      className="group w-full  h-26 bg-white  rounded-lg hover:shadow-sm transition-shadow overflow-hidden flex flex-row items-center gap-2 pl-2 cursor-pointer"
      data-product-id={id}>
      {/* Image with border and badges overlay */}
      <div className="relative h-full aspect-square shrink-0 p-0.5  overflow-hidden ">
        {image ? (
          <img
            src={image}
            alt={title}
            className=" object-cover w-full h-full "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No image
          </div>
        )}
      </div>

      {/* Content area - vertically centered with right padding */}
      <div className="flex-1 pr-2 py-1.5 flex flex-col justify-center">
        {/* Title - two lines max */}
        <h3 className="text-xs sm:text-sm hover:underline md:text-base font-medium text-gray-700 line-clamp-2 leading-tight mb-0.5">
          {title}
        </h3>

        {/* Rating row */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500 mb-1">
          <StarRatings
            rating={rating}
            starRatedColor="gray"
            starEmptyColor="lightgray"
            numberOfStars={5}
            starDimension="12px"
            starSpacing="1px"
            name="rating"
          />
          <span>0</span>
        </div>

        {/* Price with discount handling */}
        <div className="flex items-center gap-1.5">
          {hasDiscount ? (
            <>
              <span className="text-sm sm:text-base font-semibold text-blue-600 leading-tight">
                {formatCurrency(price)}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 line-through leading-tight">
                {formatCurrency(originalPrice || price)}
              </span>
            </>
          ) : (
            <span className="text-sm sm:text-base font-semibold text-blue-600 leading-tight">
              {formatCurrency(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
