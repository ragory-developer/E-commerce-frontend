"use client";

import React from "react";
import { Menu } from "lucide-react"; // Hamburger icon

const HeroTabs = () => {
  return (
    <div
      className={`
        bg-white hidden md:flex
         items-center py-4 md:py-6 mb-6
        h-16 w-full border border-gray-200 rounded-lg
      `}>
      {/* Inner container to control max width and horizontal padding */}
      <div className=" mx-auto w-full  flex items-center justify-between">
        {/* LEFT SECTION: Category dropdown + tabs */}
        <div className="flex items-center space-x-6 overflow-x-auto hide-scrollbar">
          {/* Category dropdown button (w-72, rounded-md) */}
          <button
            className="
              w-70 m-1 flex items-center justify-between
              bg-blue-600 
              rounded-md px-4 py-3.5
              text-sm uppercase font-medium text-white
              transition-all duration-200
              hadow-sm hover:shadow shrink-0
            ">
            <span>All Categories</span>
            <Menu size={18} className="text-white" />
          </button>

          {/* Category tabs – scrollable horizontally on mobile */}
          <nav className="flex items-center ml-4 space-x-5 text-sm font-medium text-gray-600">
            {[
              "Electronics",
              "Fashion",
              "Home & Living",
              "Sports",
              "Books",
              "Toys",
              "Beauty",
            ].map((cat) => (
              <a
                key={cat}
                href="#"
                className="
                  relative whitespace-nowrap py-1
                  text-gray-600 hover:text-blue-600
                  transition-colors duration-200
                  after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
                  after:bg-blue-600 after:scale-x-0 after:origin-left
                  hover:after:scale-x-100 after:transition-transform after:duration-200
                ">
                {cat}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeroTabs;
