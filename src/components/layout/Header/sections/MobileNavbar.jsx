/**
 * MOBILE NAVBAR - COMPLETE VERSION
 * ================================
 *
 * Changes Made:
 * 1. Added TabletNavbar (uses mobile layout as requested)
 * 2. Fixed search functionality with close-on-outside-click
 * 3. Proper search button inside input
 * 4. Clean component structure
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Globe, Menu, X } from "lucide-react";

const MobileNavbar = ({ onMenuClick }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
  ];

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    };

    if (isSearchActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchActive]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isLanguageOpen) setIsLanguageOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsLanguageOpen(false);
  };

  // Tablet & Mobile (Inactive Search)
  const InactiveNav = () => (
    <div className="lg:hidden flex items-center justify-between h-16">
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          className="p-2 hover:bg-gray-100 rounded-md"
          onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Fleet<span className="text-blue-600">Cart</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={toggleSearch}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <Search className="w-6 h-6 text-gray-700" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <Globe className="w-6 h-6 text-gray-700" />
          </button>

          {isLanguageOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-dropdown">
              <div className="py-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150 ${
                      selectedLanguage === language.name
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}>
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Active Search Mode
  const ActiveSearch = () => (
    <div className="lg:hidden flex items-center gap-3 h-16" ref={searchRef}>
      <div className="flex-grow">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
              <Search className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-3 pl-11 pr-20 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm font-medium">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <button
        onClick={toggleSearch}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0">
        <X className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );

  return <div>{isSearchActive ? <ActiveSearch /> : <InactiveNav />}</div>;
};;

export default MobileNavbar;
