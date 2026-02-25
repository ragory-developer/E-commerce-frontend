"use client";
import React from "react";
import Link from "next/link";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Simple header */}
      <header className="border-b border-gray-200 py-4 px-6 sm:px-8">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition">
          ShopGrid
        </Link>
      </header>

      {/* Main error content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left side – illustration */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full animate-pulse" />
                <div className="absolute inset-4 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <span className="text-8xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                    404
                  </span>
                </div>
                {/* Floating shopping cart icon */}
                <div className="absolute -top-4 -right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg">
                  <ShoppingCart className="h-8 w-8" />
                </div>
              </div>
            </div>

            {/* Right side – text and actions */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Oops! Page not found
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
                  <Home className="w-5 h-5 mr-2 -ml-1" />
                  Go to Homepage
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
                  <ShoppingBag className="w-5 h-5 mr-2 -ml-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="border-t border-gray-200 py-6 px-4 sm:px-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopGrid. All rights reserved.
      </footer>
    </div>
  );
};

export default ErrorPage;
