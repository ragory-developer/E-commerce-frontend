import { ChevronDown, Phone, Globe, DollarSign, User } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import Container from "@/design-system/Container/Container";

// ==================== CONFIGURATION ====================


const topBarItems = [
  {
    id: "contact",
    type: "link",
    label: "Contact",
    href: "/contact",
    icon: Phone,
    hasBorder: true,
  },
  {
    id: "language",
    type: "dropdown",
    triggerIcon: Globe,
    triggerLabel: "English", // initially selected language label
    hasBorder: true,
    options: [
      { value: "en", label: "English", icon: Globe },
      { value: "bn", label: "Bangla", icon: Globe },
      { value: "es", label: "Spanish", icon: Globe },
      { value: "fr", label: "French", icon: Globe },
    ],
    initialValue: "en",
  },
  {
    id: "currency",
    type: "dropdown",
    triggerIcon: DollarSign,
    triggerLabel: "USD", // initially selected currency label
    hasBorder: true,
    options: [
      { value: "usd", label: "USD", symbol: "$" },
      { value: "eur", label: "EUR", symbol: "€" },
      { value: "gbp", label: "GBP", symbol: "£" },
      { value: "jpy", label: "JPY", symbol: "¥" },
    ],
    initialValue: "usd",
  },
  {
    id: "login",
    type: "link",
    label: "Login / Register",
    href: "/auth/login",
    icon: User,
    hasBorder: false,
  },
];

// ==================== DROPDOWN COMPONENT ====================

const Dropdown = ({
  id,
  triggerIcon: TriggerIcon,
  triggerLabel,
  options,
  selectedValue,
  onSelect,
  isOpen,
  onToggle,
  hasBorder = true,
}) => {
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className="relative">
      <button
        className={`flex items-center gap-2 px-3 py-1 cursor-pointer hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-50 ${
          hasBorder ? "border-r border-gray-300 pr-4" : ""
        }`}
        onClick={() => onToggle(id)}>
        <TriggerIcon className="w-4 h-4" />
        <span>{selectedOption?.label || triggerLabel}</span>
        <ChevronDown className="w-3 h-3 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-20 overflow-hidden">
          <div className="py-2">
            {options.map((option) => {
              const OptionIcon = option.icon;
              const isSelected = option.value === selectedValue;
              return (
                <div
                  key={option.value}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center justify-between"
                  onClick={() => {
                    onSelect(option.value);
                    onToggle(id); // close dropdown after selection
                  }}>
                  <div className="flex items-center gap-2">
                    {OptionIcon && <OptionIcon className="w-4 h-4" />}
                    {option.symbol && (
                      <span className="font-medium">{option.symbol}</span>
                    )}
                    <span>{option.label}</span>
                  </div>
                  {isSelected && (
                    <span className="text-blue-600 text-xs">✓</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const HeaderTop = () => {
  // State for dropdowns: only one open at a time
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // State for selected language and currency
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  const handleToggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  // Helper to get the current label for a dropdown trigger
  const getTriggerLabel = (item) => {
    if (item.type !== "dropdown") return "";
    if (item.id === "language") {
      const lang = item.options.find((opt) => opt.value === selectedLanguage);
      return lang?.label || item.triggerLabel;
    }
    if (item.id === "currency") {
      const curr = item.options.find((opt) => opt.value === selectedCurrency);
      return curr?.label || item.triggerLabel;
    }
    return item.triggerLabel;
  };

  return (
    <div className="border-b border-gray-200 bg-white hidden lg:block">
      <Container>
        <div className="h-10 flex items-center justify-between text-sm">
          {/* Welcome message (can also be made configurable) */}
          <div className="font-normal text-gray-900">
            Welcome to Ragory store
          </div>

          {/* Right side – dynamically render items from config */}
          <div className="flex items-center gap-6">
            {topBarItems.map((item) => {
              if (item.type === "link") {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-1 cursor-pointer hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-50 ${
                      item.hasBorder ? "border-r border-gray-300 pr-4" : ""
                    }`}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              if (item.type === "dropdown") {
                return (
                  <Dropdown
                    key={item.id}
                    id={item.id}
                    triggerIcon={item.triggerIcon}
                    triggerLabel={getTriggerLabel(item)}
                    options={item.options}
                    selectedValue={
                      item.id === "language"
                        ? selectedLanguage
                        : selectedCurrency
                    }
                    onSelect={(value) => {
                      if (item.id === "language") setSelectedLanguage(value);
                      if (item.id === "currency") setSelectedCurrency(value);
                    }}
                    isOpen={openDropdownId === item.id}
                    onToggle={handleToggleDropdown}
                    hasBorder={item.hasBorder}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};;;;

export default HeaderTop;