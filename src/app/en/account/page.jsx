"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  Heart,
  Star,
  MapPin,
  User,
  LogOut,
} from "lucide-react";
import Container from "@/design-system/Container/Container";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "downloads", label: "My Downloads", icon: Download },
  { id: "wishlist", label: "My Wishlist", icon: Heart },
  { id: "reviews", label: "My Reviews", icon: Star },
  { id: "addresses", label: "My Addresses", icon: MapPin },
  { id: "profile", label: "My Profile", icon: User },
  { id: "logout", label: "Logout", icon: LogOut },
];

const orders = [
  {
    id: "#1001",
    date: "2024-02-15",
    status: "Delivered",
    total: "$125.00",
    tracking: "TRK12345",
  },
  {
    id: "#1002",
    date: "2024-02-10",
    status: "Processing",
    total: "$89.50",
    tracking: "TRK67890",
  },
  {
    id: "#1003",
    date: "2024-02-05",
    status: "Shipped",
    total: "$210.30",
    tracking: "TRK11223",
  },
];

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="bg-white py-12 md:py-16 min-h-screen">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar – responsive width */}
          <aside className="lg:w-64 w-full shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative w-full flex items-center gap-3 pl-7 pr-4 h-9 text-sm
                      transition-colors duration-200 group
                      ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}
                    `}>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-[50%] bg-blue-600 rounded-r-full" />
                    )}
                    <Icon size={18} className="shrink-0" />
                    <span className="font-normal truncate">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right content area */}
          <main className="flex-1 min-w-0 bg-white rounded-lg border border-gray-100  p-4 md:p-6">
            {activeTab === "orders" && (
              <>
                {/* Header with title and view all link */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                    My Orders
                  </h2>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    View all
                  </a>
                </div>

                {/* Responsive table wrapper */}
                <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
                  <table className="w-full text-sm text-left min-w-[640px] md:min-w-full">
                    <thead className="text-gray-600 border-b border-gray-200">
                      <tr>
                        <th className="px-4 md:px-6 pt-5 pb-4 font-medium">
                          Order ID
                        </th>
                        <th className="px-4 md:px-6 pt-5 pb-4 font-medium">
                          Date
                        </th>
                        <th className="px-4 md:px-6 pt-5 pb-4 font-medium">
                          Status
                        </th>
                        <th className="px-4 md:px-6 pt-5 pb-4 font-medium">
                          Total
                        </th>
                        <th className="px-4 md:px-6 pt-5 pb-4 font-medium">
                          Tracking
                        </th>
                        <th className="px-4 md:px-6 pt-5 pb-4 font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 md:px-6 pt-5 pb-4 text-gray-800 font-medium">
                            {order.id}
                          </td>
                          <td className="px-4 md:px-6 pt-5 pb-4 text-gray-700">
                            {order.date}
                          </td>
                          <td className="px-4 md:px-6 pt-5 pb-4">
                            <span
                              className={`
                                inline-flex px-2 py-1 text-xs rounded-full
                                ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Processing"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                }
                              `}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 pt-5 pb-4 text-gray-700">
                            {order.total}
                          </td>
                          <td className="px-4 md:px-6 pt-5 pb-4 text-gray-700">
                            {order.tracking}
                          </td>
                          <td className="px-4 md:px-6 pt-5 pb-4">
                            <button className="text-blue-600 hover:underline text-sm">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Placeholders for other tabs */}
            {activeTab === "dashboard" && (
              <div className="text-gray-700">
                Dashboard overview coming soon.
              </div>
            )}
            {activeTab === "downloads" && (
              <div className="text-gray-700">
                Your downloadable products will appear here.
              </div>
            )}
            {activeTab === "wishlist" && (
              <div className="text-gray-700">Your saved items.</div>
            )}
            {activeTab === "reviews" && (
              <div className="text-gray-700">Reviews you&apos;ve written.</div>
            )}
            {activeTab === "addresses" && (
              <div className="text-gray-700">
                Manage your shipping addresses.
              </div>
            )}
            {activeTab === "profile" && (
              <div className="text-gray-700">
                Edit your personal information.
              </div>
            )}
            {activeTab === "logout" && (
              <div className="text-gray-700">
                You have been logged out. (Simulated)
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default MyAccount;
