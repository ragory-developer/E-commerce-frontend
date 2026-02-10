import React from "react";
import { GitCompare, Heart, Search, ShoppingCart } from "lucide-react";

const DesktopNavbar = () => {
  return (
    <div className="hidden lg:grid grid-cols-12 gap-6 items-center h-16">
      {/* Left Column: Logo */}
      <div className="col-span-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Fleet<span className="text-blue-600">Cart</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Column: Search Bar */}
      <div className="col-span-8">
        <div className="flex items-center w-full max-w-4xl mx-auto">
          <div className="relative flex-1">
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md overflow-hidden transition-shadow duration-200 hover:shadow-sm">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full py-3 pl-10 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0"
                />
              </div>

              {/* Search Button */}
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 hover:opacity-90 transition-opacity duration-200 font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Icons */}
      <div className="col-span-2">
        <div className="flex items-center justify-end space-x-4">
          {/* Compare Icon */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative">
              <GitCompare className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-3">
                <p className="font-medium text-gray-900 mb-2">Compare (3)</p>
                <div className="text-xs text-gray-600">
                  Click to view compared items
                </div>
              </div>
            </div>
          </div>

          {/* Wishlist Icon */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative">
              <Heart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-3">
                <p className="font-medium text-gray-900 mb-2">Wishlist (5)</p>
                <div className="text-xs text-gray-600">Your saved items</div>
              </div>
            </div>
          </div>

          {/* Cart Icon */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                12
              </span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4">
                <p className="font-medium text-gray-900 mb-2">
                  Cart (12 items)
                </p>
                <p className="text-sm text-gray-600 mb-3">Total: $245.99</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
