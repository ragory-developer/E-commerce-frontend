"use client";

import React, { useState } from "react";
import { ChevronRight, X, Grid, Zap, Package, Tag } from "lucide-react";

const MobileCategoryPanel = ({ isOpen, onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Categories without icons
  const categories = [
    {
      id: 1,
      title: "Electronics",
      children: [
        {
          id: 11,
          title: "Mobile & Tablets",
          children: [
            { id: 111, title: "Smartphones", count: 24 },
            { id: 112, title: "Tablets", count: 18 },
            { id: 113, title: "Wearables", count: 15 },
          ],
        },
        {
          id: 12,
          title: "Computers",
          children: [
            { id: 121, title: "Laptops", count: 32 },
            { id: 122, title: "Desktops", count: 21 },
            { id: 123, title: "PC Parts", count: 45 },
          ],
        },
        {
          id: 13,
          title: "Audio & Video",
          children: [
            { id: 131, title: "Headphones", count: 36 },
            { id: 132, title: "Speakers", count: 22 },
            { id: 133, title: "TVs", count: 17 },
          ],
        },
        { id: 14, title: "Gaming", count: 89 },
        { id: 15, title: "Accessories", count: 156 },
      ],
    },
    {
      id: 2,
      title: "Fashion",
      children: [
        {
          id: 21,
          title: "Men's Fashion",
          children: [
            { id: 211, title: "Clothing", count: 89 },
            { id: 212, title: "Footwear", count: 56 },
            { id: 213, title: "Accessories", count: 42 },
          ],
        },
        {
          id: 22,
          title: "Women's Fashion",
          children: [
            { id: 221, title: "Clothing", count: 120 },
            { id: 222, title: "Bags", count: 45 },
            { id: 223, title: "Jewelry", count: 67 },
          ],
        },
        { id: 23, title: "Kids", count: 93 },
        { id: 24, title: "Sports Wear", count: 76 },
      ],
    },
    {
      id: 3,
      title: "Home & Living",
      children: [
        { id: 31, title: "Furniture", count: 67 },
        { id: 32, title: "Kitchen", count: 154 },
        { id: 33, title: "Decor", count: 89 },
        { id: 34, title: "Bed & Bath", count: 112 },
      ],
    },
    {
      id: 4,
      title: "Sports",
      children: [
        { id: 41, title: "Fitness", count: 98 },
        { id: 42, title: "Outdoor", count: 76 },
        { id: 43, title: "Team Sports", count: 54 },
        { id: 44, title: "Cycling", count: 32 },
      ],
    },
    { id: 5, title: "Health", count: 189 },
    { id: 6, title: "Books", count: 456 },
    {
      id: 7,
      title: "Automotive",
      children: [
        { id: 71, title: "Car Parts", count: 45 },
        { id: 72, title: "Accessories", count: 32 },
      ],
    },
    { id: 8, title: "Food", count: 256 },
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const renderCategoryItem = (category, level = 0) => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasChildren = category.children && category.children.length > 0;

    const paddingLeft = level === 0 ? "pl-4" : level === 1 ? "pl-8" : "pl-12";
    const textColor =
      level === 0
        ? "text-gray-900"
        : level === 1
          ? "text-gray-700"
          : "text-gray-600";

    return (
      <div key={category.id}>
        <div
          className={`flex items-center justify-between py-3 cursor-pointer transition-all duration-200 hover:bg-gray-50/50 border-t border-gray-50
            ${paddingLeft} pr-4
            ${level === 0 ? "border-b border-gray-100" : ""}
          `}
          onClick={() => hasChildren && toggleCategory(category.id)}>
          <div className="flex items-center space-x-3 flex-1">
            {/* Title only - no icon */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center space-x-2">
                <span className={`font-medium ${textColor}`}>
                  {category.title}
                </span>
              </div>
            </div>
          </div>

          {hasChildren && (
            <ChevronRight
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
            />
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className={`${level === 0 ? "bg-gray-50/30" : ""}`}>
            {category.children.map((child) =>
              renderCategoryItem(child, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 w-full sm:w-80">
        <div className="h-full bg-white shadow-xl border-r border-gray-200 flex flex-col">
          <div className="relative p-4 border-b border-gray-200">
            {/* Original close button - hidden on mobile, shown on sm and up */}
            <button
              onClick={onClose}
              className="absolute -right-10 top-4 w-8 h-8 bg-white rounded-full shadow-md hidden sm:flex items-center justify-center hover:shadow-lg transition-all duration-200">
              <X className="w-4 h-4 text-gray-700" />
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Grid className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Categories
                  </h2>
                  <p className="text-xs text-gray-500">Browse all products</p>
                </div>
              </div>

              {/* New close button - shown only on mobile (when sidebar is fullscreen) */}
              <button
                onClick={onClose}
                className="sm:hidden w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200">
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="py-2">
              {categories.map((category) => renderCategoryItem(category))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCategoryPanel;
