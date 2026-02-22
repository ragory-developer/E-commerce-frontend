import React, { useState, useRef, useEffect } from "react";

const PriceRangeFilter = ({ min, max }) => {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const rangeRef = useRef(null);

  // Update slider track background to show selected range
  useEffect(() => {
    if (rangeRef.current) {
      const percentMin = ((minPrice - min) / (max - min)) * 100;
      const percentMax = ((maxPrice - min) / (max - min)) * 100;
      rangeRef.current.style.background = `linear-gradient(to right, #d1d5db ${percentMin}%, #3b82f6 ${percentMin}%, #3b82f6 ${percentMax}%, #d1d5db ${percentMax}%)`;
    }
  }, [minPrice, maxPrice, min, max]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const handleMinSlider = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxSlider = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const applyFilter = () => {
    console.log("Filter applied:", { min: minPrice, max: maxPrice });
    // Here you would trigger a fetch or update products
  };

  return (
    <div className="space-y-4">
      {/* Dual range slider container */}
      <div className="relative w-full h-2 mt-6">
        {/* Background track */}
        <div
          ref={rangeRef}
          className="absolute w-full h-2 rounded-full bg-gray-300"
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={minPrice}
          onChange={handleMinSlider}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: minPrice > max - 100 ? 3 : 2 }}
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxPrice}
          onChange={handleMaxSlider}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Input fields */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label
            htmlFor="min-price"
            className="block text-xs text-gray-500 mb-1">
            Min
          </label>
          <input
            type="number"
            id="min-price"
            value={minPrice}
            onChange={handleMinChange}
            min={min}
            max={max}
            className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <span className="text-gray-400 mt-5">—</span>
        <div className="flex-1">
          <label
            htmlFor="max-price"
            className="block text-xs text-gray-500 mb-1">
            Max
          </label>
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            onChange={handleMaxChange}
            min={min}
            max={max}
            className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <button
        onClick={applyFilter}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm font-medium py-2 rounded-md transition-colors">
        Apply Filter
      </button>
    </div>
  );
};

export default PriceRangeFilter;
