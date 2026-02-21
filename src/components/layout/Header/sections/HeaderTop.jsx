"use client";
/**
 * HEADER TOP - FIXED VERSION
 * ==========================
 *
 * Changes Made:
 * 1. Using Container component (consistent padding)
 * 2. Fixed z-index for dropdowns (z-dropdown)
 * 3. Changed colors to use primary theme
 */

import { ChevronDown, Phone, Globe, DollarSign, User } from "lucide-react";
import React, { useState } from "react";
import Container from "@/design-system/Container/Container";

const HeaderTop = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 bg-white hidden lg:block">
      <Container>
        <div className="h-10 flex items-center justify-between text-sm">
          <div className="font-medium text-gray-900">
            Welcome to FleetCart store
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 px-3 py-1 cursor-pointer pr-4 border-r border-gray-300 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-50">
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </button>

            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-1 cursor-pointer pr-4 border-r border-gray-300 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setCurrencyOpen(false);
                }}>
                <Globe className="w-4 h-4" />
                <span>English</span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>

              {languageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-dropdown overflow-hidden">
                  <div className="py-2">
                    <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>English</span>
                      </div>
                      <span className="text-blue-600 text-xs">✓</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Bangla</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Spanish</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>French</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-1 cursor-pointer pr-4 border-r border-gray-300 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setLanguageOpen(false);
                }}>
                <DollarSign className="w-4 h-4" />
                <span>USD</span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>

              {currencyOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-dropdown overflow-hidden">
                  <div className="py-2">
                    <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>USD</span>
                      </div>
                      <span className="text-blue-600 text-xs">✓</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2">
                      <span className="font-medium">€</span>
                      <span>EUR</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2">
                      <span className="font-medium">£</span>
                      <span>GBP</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2">
                      <span className="font-medium">¥</span>
                      <span>JPY</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-50">
              <User className="w-4 h-4" />
              <span>Login / Register</span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeaderTop;
