"use client";
import React, { useState, useMemo } from "react";
import Container from "@/design-system/Container/Container";
import { X, ShoppingCart, Package, ShoppingCartIcon, Plus } from "lucide-react";
import MyCart from "@/components/checkout/TabContents/MyCart";
import Checkout from "@/components/checkout/TabContents/Checkout";
import OrderComplete from "@/components/checkout/TabContents/OrderComplete";

const initialProducts = [
  {
    id: 1,
    image:
      "https://asia.fleetcart.envaysoft.com/storage/media/0NyoRNyW1I5EqQXqbYAVCqsEyyTVKzkVTC4koInF.jpg",
    name: "Samsung Galaxy S24 Ultra 5G AI Smartphone",
    variant: "Color: Titanium Yellow, Size: 128GB",
    unitPrice: 799.0,
    quantity: 1,
  },
  {
    id: 2,
    image:
      "https://asia.fleetcart.envaysoft.com/storage/media/0NyoRNyW1I5EqQXqbYAVCqsEyyTVKzkVTC4koInF.jpg",
    name: "Apple 2023 MacBook Pro (14-inch)",
    variant: "Color: Space Black, Storage: 512GB",
    unitPrice: 1999.0,
    quantity: 1,
  },
  {
    id: 3,
    image:
      "https://asia.fleetcart.envaysoft.com/storage/media/0NyoRNyW1I5EqQXqbYAVCqsEyyTVKzkVTC4koInF.jpg",
    name: "Apple AirPods Pro",
    variant: "",
    unitPrice: 299.0,
    quantity: 1,
  },
  {
    id: 4,
    image:
      "https://asia.fleetcart.envaysoft.com/storage/media/0NyoRNyW1I5EqQXqbYAVCqsEyyTVKzkVTC4koInF.jpg",
    name: "Beats Studio Buds +",
    variant: "",
    unitPrice: 170.0,
    quantity: 1,
  },
];

// --- CartTabs Component (separated) ---
const CartTabs = ({ activeTab, onTabChange }) => {
  const tabs = ["My Cart", "Checkout", "Order Complete"];

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 py-6">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`w-full sm:w-[280px] lg:w-[300px] h-[50px] sm:h-[55px] font-medium rounded-md transition ${
            index === activeTab
              ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => onTabChange(index)}>
          {tab}
        </button>
      ))}
    </div>
  );
};

// --- Main CheckoutTab Component ---
const CheckoutTab = () => {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState(0); // 0 = "My Cart"

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setProducts(
      products.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p)),
    );
  };

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Memoized totals
  const total = useMemo(() => {
    const sub = products.reduce((acc, p) => acc + p.unitPrice * p.quantity, 0);
    const tax = sub * 0.1; // 10% tax
    return sub + tax;
  }, [products]);

  return (
    <section className="bg-white min-h-screen">
      <Container>
        <CartTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Conditionally render tab content based on activeTab */}
        {activeTab === 0 && (
          <MyCart
            products={products}
            updateQuantity={updateQuantity}
            removeProduct={removeProduct}
            total={total}
          />
        )}
        {activeTab === 1 && <Checkout />}
        {activeTab === 2 && <OrderComplete />}
      </Container>
    </section>
  );
};

export default CheckoutTab;
