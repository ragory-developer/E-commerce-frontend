// components/Footer/Footer.tsx
"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  ChevronRight,
  ShoppingCart,
  Tag,
  Sparkles,
  Flame,
  Briefcase,
  Shirt,
  LayoutDashboard,
  Package,
  Star,
  User,
  RefreshCw,
  HelpCircle,
  Shield,
  FileText,
  Facebook,
  X,
  Instagram,
  Youtube,
  MessageCircleMorex,
  MessageCircle,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const handleBuyNow = () => {
    alert("Redirecting to checkout for $59 item");
  };

  // Centralized data structure
  const footerData = {
    newsletter: {
      title: "Subscribe to Our Newsletter",
      description:
        "Subscribe to our newsletter & get notification about discounts.",
    },
    contact: {
      title: "Contact Us",
      items: [
        { icon: Phone, text: "+990123456789" },
        { icon: Mail, text: "admin@email.com" },
        { icon: MapPin, text: "Dhaka, Mohammadapur" },
      ],
    },
    myAccount: {
      title: "My Account",
      links: [
        { text: "Dashboard", href: "#" },
        { text: "My Orders", href: "#" },
        { text: "My Reviews", href: "#" },
        { text: "My Profile", href: "#" },
      ],
    },
    ourServices: {
      title: "Our Services",
      links: [
        { text: "Return Policy", href: "#" },
        { text: "FAQ", href: "#" },
        { text: "Privacy & Policy", href: "#" },
        { text: "Terms Of Use", href: "#" },
      ],
    },
    information: {
      title: "Information",
      links: [
        { text: "New Arrivals", href: "#" },
        { text: "Specials", href: "#" },
        { text: "Hot Deals", href: "#" },
        { text: "Backpacks", href: "#" },
        { text: "Men's Fashion", href: "#" },
      ],
    },
    tags: [
      "Accessories",
      "Electronics",
      "Entertainment",
      "Fashion",
      "Gadgets",
      "Hot deals",
      "Lifestyle",
      "Smartphone",
    ],
    socialLinks: [
      { icon: Facebook, url: "https://facebook.com/..." },
      { icon: MessageCircle, url: "https://wa.me/..." },
      { icon: Twitter, url: "https://twitter.com/..." },
      { icon: Instagram, url: "https://instagram.com/..." },
      { icon: Youtube, url: "https://youtube.com/..." },
    ],
  };

  return (
    <footer className="w-full bg-white text-gray-800 py-8 border-t border-gray-200 md:py-12">
      <div className="max-w-[90vw] xl:max-w-500 xl:px-16 mx-auto px-4">
        {/* Main Footer Grid - 5 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* Column 1: Newsletter + Contact Us */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact Us Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900">Contact Us</h3>
              <div className="space-y-6">
                {footerData.contact.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="text-gray-600 mt-0.5" size={18} />
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Social Links – added here, centered */}
              <div className="w-full flex justify-start items-center gap-6 pt-4">
                {footerData.socialLinks?.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors">
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: My Account */}
          <div className="lg:col-span-2 ">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              My Account
            </h3>
            <ul className="space-y-6">
              {footerData.myAccount.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <ChevronRight
                      size={14}
                      className="text-gray-400 group-hover:text-blue-600"
                    />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-2 ">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Our Services
            </h3>
            <ul className="space-y-6">
              {footerData.ourServices.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <ChevronRight
                      size={14}
                      className="text-gray-400 group-hover:text-blue-600"
                    />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Information */}
          <div className="lg:col-span-2 ">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Information
            </h3>
            <ul className="space-y-6">
              {footerData.information.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <ChevronRight
                      size={14}
                      className="text-gray-400 group-hover:text-blue-600"
                    />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Tags */}
          <div className="lg:col-span-3 ">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {footerData.tags.map((tag, index) => (
                <a
                  key={index}
                  className="
  inline-flex items-center gap-1.5
  px-3 py-1.5
  border border-transparent
  hover:border-blue-600 hover:text-blue-600
  text-gray-700 rounded-xl text-sm
  transition-colors cursor-pointer
">
                  <Tag size={12} className="text-gray-500" />
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-gray-600 text-md font-medium text-center md:text-right">
              Shop Gift @ FleetCart 2026. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
