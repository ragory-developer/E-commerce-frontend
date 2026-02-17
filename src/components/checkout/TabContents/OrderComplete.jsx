import React, { Fragment } from "react";
import {
  CheckCircle,
  Package,
  PackageCheck,
  Truck,
  MapPin,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

const OrderComplete = () => {
  // Mock order data
  const orderNumber = "ORD-2025-12345";
  const trackingNumber = "1Z999AA10123456784";
  const carrier = "UPS";
  const estimatedDelivery = "Monday, February 24";
  const shippingAddress = "123 Main St, Springfield, IL 62701";

  const steps = [
    {
      id: "placed",
      label: "Order Placed",
      icon: ShoppingBag,
      completed: true,
      active: true,
    },
    {
      id: "packed",
      label: "Packed",
      icon: Package,
      completed: true,
      active: true,
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: Truck,
      completed: true,
      active: true,
    },
    {
      id: "out",
      label: "Out for Delivery",
      icon: MapPin,
      completed: false,
      active: false,
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: CheckCircle,
      completed: false,
      active: false,
    },
  ];

  const products = [
    {
      id: "1",
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=128&h=128&fit=crop&auto=format",
    },
    {
      id: "2",
      name: "Smart Watch Series 7",
      price: 399.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=128&h=128&fit=crop&auto=format",
    },
    {
      id: "3",
      name: "Portable SSD 1TB",
      price: 129.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=128&h=128&fit=crop&auto=format",
    },
  ];

  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const shipping = 0; // free shipping
  const total = subtotal + shipping;

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-5xl mx-auto p-6 md:p-10">
        {/* Success Header */}
        <div className="text-center mb-10">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order has been received.
          </p>
          <p className="text-gray-600">
            Order number:{" "}
            <span className="text-blue-600 font-semibold">{orderNumber}</span>
          </p>
        </div>

        {/* Shipment Progress Tracker */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Shipment Status
          </h2>
          {/* Desktop horizontal stepper */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              return (
                <Fragment key={step.id}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-blue-600 text-white"
                          : step.active
                            ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                            : "bg-gray-100 text-gray-400"
                      }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        step.completed || step.active
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}>
                      {step.label}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`flex-1 h-0.5 ${
                        steps[index + 1].completed
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* Mobile vertical stepper */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      step.completed
                        ? "bg-blue-600 text-white"
                        : step.active
                          ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                          : "bg-gray-100 text-gray-400"
                    }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step.completed || step.active
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Package Info Card */}
        <div className="rounded-2xl border border-gray-200  w-full p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Package Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 block">Tracking Number</span>
              <span className="font-medium text-gray-600">
                {trackingNumber}
              </span>
            </div>
            <div>
              <span className="text-gray-600 block">Carrier</span>
              <span className="font-medium text-gray-600">{carrier}</span>
            </div>
            <div>
              <span className="text-gray-600 block">Estimated Delivery</span>
              <span className="font-medium text-gray-600">
                {estimatedDelivery}
              </span>
            </div>
            <div>
              <span className="text-gray-600 block">Shipping Address</span>
              <span className="font-medium text-gray-600">
                {shippingAddress}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Track Order
          </button>
          <button className="w-full sm:w-auto px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
};

export default OrderComplete;
