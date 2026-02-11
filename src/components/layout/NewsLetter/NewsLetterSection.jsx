"use client";
import React, { useState } from "react";
import { Mail, Loader2 } from "lucide-react";

const OptimizedNewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      console.log("Submitting:", email);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setEmail("");
      alert("Thank you for subscribing!");
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-blue-600 py-4 flex items-center justify-center">
      <div className="w-full md:max-w-[90%] lg:max-w-[70%] px-4 mx-auto">
        <div className="py-4 text-white">
          {/* Grid Layout - Responsive with flex-col on mobile */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
            {/* Text Column */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-xl lg:text-2xl font-semibold">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-sm md:text-base lg:text-lg opacity-90">
                Subscribe to our newsletter & get notification about discounts.
              </p>
            </div>

            {/* Form Column */}
            <div className="w-full md:w-1/2 flex md:justify-end justify-center">
              <form onSubmit={handleSubmit} className="w-full max-w-125">
                <div className="relative">
                  <div className="relative">
                    {/* Email Icon - Using Lucide */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <Mail className="w-5 h-5" />
                    </div>

                    {/* Input Field with Button Inside */}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-28 md:pr-32 py-3 md:py-3.5 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-500"
                      required
                      disabled={isSubmitting}
                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 text-white font-semibold py-2 md:py-2.5 px-4 md:px-5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed flex items-center justify-center min-w-[90px] md:min-w-[100px] text-sm md:text-base">
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedNewsletterSection;
