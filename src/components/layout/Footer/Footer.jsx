/**
 * FOOTER - SIMPLIFIED VERSION
 * ===========================
 *
 * Changes Made:
 * 1. Using Container (consistent padding)
 * 2. Simplified grid: 12 cols → 5 cols
 * 3. Fixed alignment with other sections
 * 4. Cleaner structure
 */

"use client";
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Tag,
  Facebook,
  MessageCircle,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import Container from "@/design-system/Container/Container";

const Footer = () => {
  const footerData = {
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
      { icon: Facebook, url: "https://facebook.com" },
      { icon: MessageCircle, url: "https://wa.me" },
      { icon: Twitter, url: "https://twitter.com" },
      { icon: Instagram, url: "https://instagram.com" },
      { icon: Youtube, url: "https://youtube.com" },
    ],
  };

  return (
    <footer className="w-full bg-white text-gray-800 py-8 border-t border-gray-200 md:py-12">
      <Container>
        {/* Simplified 5-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Column 1: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900">Contact Us</h3>
            <div className="space-y-4">
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

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {footerData.socialLinks.map((item, index) => {
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

          {/* Column 2: My Account */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              My Account
            </h3>
            <ul className="space-y-3">
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
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
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
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Information
            </h3>
            <ul className="space-y-3">
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
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {footerData.tags.map((tag, index) => (
                <a
                  key={index}
                  href="#"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-transparent hover:border-blue-600 hover:text-blue-600 text-gray-700 rounded-xl text-sm transition-colors cursor-pointer">
                  <Tag size={12} className="text-gray-500" />
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="text-gray-600 text-sm font-medium text-center md:text-left">
            © FleetCart 2026. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
