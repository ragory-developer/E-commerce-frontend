"use client";

import React, { useState } from "react";
import { Search, Globe, Menu, X } from "lucide-react";

// Helper components defined outside the main component


const MobileNavbarInactive = ({
  onMenuClick,
  toggleSearch,
  isLanguageOpen,
  setIsLanguageOpen,
  selectedLanguage,
  languages,
  handleLanguageSelect,
}) => (
  <div className="md:hidden flex items-center justify-between h-16">
    <div className="flex items-center space-x-3 flex-shrink-0">
      <button
        className="p-2 hover:bg-gray-100 rounded-md"
        onClick={onMenuClick}>
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
      <div className="flex items-center space-x-2">
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

    <div className="flex items-center space-x-3 flex-shrink-0">
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
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
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

const MobileNavbarActive = ({
  onMenuClick,
  toggleSearch,
  isLanguageOpen,
  setIsLanguageOpen,
  selectedLanguage,
  languages,
  handleLanguageSelect,
}) => (
  <div className="md:hidden flex items-center justify-between h-16 space-x-3">
    <div className="flex-grow">
      <div className="relative">
        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-3 pl-10 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0"
              autoFocus
            />
            <div className="absolute">
              {/* prompt for ai:act as expert frontend dev make professtionaly add button to search button inside input field to
        click search when click outside of the search bar it closes to inactive mode don't need a toggle button */}
              <button>
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center space-x-3 flex-shrink-0">
      <button
        onClick={toggleSearch}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
        <X className="w-6 h-6 text-gray-700" />
      </button>

      <div className="relative">
        {isLanguageOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
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

// Main component
const MobileNavbar = ({ onMenuClick }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
  ];

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isLanguageOpen) setIsLanguageOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsLanguageOpen(false);
  };

  return (
    <>
    

      {isSearchActive ? (
        <MobileNavbarActive
          onMenuClick={onMenuClick}
          toggleSearch={toggleSearch}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
          selectedLanguage={selectedLanguage}
          languages={languages}
          handleLanguageSelect={handleLanguageSelect}
        />
      ) : (
        <MobileNavbarInactive
          onMenuClick={onMenuClick}
          toggleSearch={toggleSearch}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
          selectedLanguage={selectedLanguage}
          languages={languages}
          handleLanguageSelect={handleLanguageSelect}
        />
      )}
    </>
  );
};

export default MobileNavbar;
