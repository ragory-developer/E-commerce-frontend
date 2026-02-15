import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  Smartphone,
  Tv,
  Watch,
  Shirt,
  Backpack,
  Tablet,
  Headphones,
  Flame,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";
import { createPortal } from "react-dom";

// Icon mapping
const iconMap = {
  1: Smartphone,
  2: Tv,
  3: Watch,
  4: Shirt,
  5: Backpack,
  6: Tablet,
  7: Headphones,
  8: Flame,
  9: ShoppingBag,
  10: LayoutGrid,
};

// Sample category data
const categoryData = [
  {
    id: 1,
    title: "Consumer Electronics",
    hasMenu: true,
    megaMenu: {
      backgroundImage:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800",
      sections: [
        {
          title: "Mobiles",
          items: [
            "Smartphones",
            "Android",
            "iPhone",
            "Featured",
            "Refurbished",
            "Brands",
          ],
        },
        {
          title: "Mobile Accessories",
          items: [
            "Cases & Covers",
            "Cables",
            "Chargers",
            "Power Bank",
            "Headphones",
            "Screen Protectors",
          ],
        },
        {
          title: "Laptops",
          items: ["Macbook", "Gaming", "Ultraslim", "Tablets", "All Laptops"],
        },
        {
          title: "Computer Accessories",
          items: ["Monitors", "Keyboard & Mouse", "Pendrive", "Speaker"],
        },
        {
          title: "Hot Brands",
          items: ["OnePlus", "Apple", "Samsung", "Huawei", "Sony"],
        },
        {
          title: "Bluetooth",
          items: ["Speakers", "Earbuds", "Headsets"],
        },
      ],
    },
  },
  {
    id: 2,
    title: "Televisions",
    hasMenu: false,
    href: "/tvs",
  },
  {
    id: 3,
    title: "Watches",
    hasMenu: false,
    href: "/watches",
  },
  {
    id: 4,
    title: "Fashion",
    hasMenu: true,
    megaMenu: {
      backgroundImage:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800",
      sections: [
        {
          title: "Men's Wear",
          items: [
            "Shirts",
            "T-Shirts",
            "Jeans",
            "Formal Wear",
            "Ethnic Wear",
            "Accessories",
          ],
        },
        {
          title: "Women's Wear",
          items: [
            "Dresses",
            "Tops",
            "Sarees",
            "Ethnic Wear",
            "Western Wear",
            "Accessories",
          ],
        },
        {
          title: "Kids",
          items: ["Boys Clothing", "Girls Clothing", "Infants", "Toys"],
        },
      ],
    },
  },
  {
    id: 5,
    title: "Backpacks",
    hasMenu: false,
    href: "/backpacks",
  },
  {
    id: 6,
    title: "Tablets",
    hasMenu: false,
    href: "/tablets",
  },
  {
    id: 7,
    title: "Headphones",
    hasMenu: false,
    href: "/headphones",
  },
  {
    id: 8,
    title: "Hot Sale",
    hasMenu: false,
    href: "/hot-sale",
  },
  {
    id: 9,
    title: "Shoes",
    hasMenu: false,
    href: "/shoes",
  },
  {
    id: 10,
    title: "All Categories",
    hasMenu: false,
    href: "/all",
  },
];

// dynamic mega menu on scroll

// Mega Menu Component
const MegaMenu = ({
  category,
  position,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!category?.megaMenu || !isHovered) return null;

  const Icon = iconMap[category.id];

  return createPortal(
    <div
      className="absolute bg-white  border border-gray-200 overflow-hidden transition-all duration-200"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: "680px",
        maxHeight: `${position.maxHeight}px`,
        zIndex: 50,
        borderTopRightRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${category.megaMenu.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Mega Menu Header */}
      <div className="relative  px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-blue-600" />}
          <h3 className="text-base font-bold text-gray-500">
            {category.title}
          </h3>
        </div>
      </div>

      {/* Mega Menu Content */}
      <div
        className="relative z-10 p-6 overflow-y-auto"
        style={{ maxHeight: `${position.maxHeight - 120}px` }}>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          {category.megaMenu.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-bold text-gray-600 text-sm uppercase tracking-wide pb-2 ">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-blue-600 hover:pl-2 inline-block transition-all duration-200 relative group">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1.5 transition-all duration-200"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mega Menu Footer */}
      <div className="relative z-10 px-6 py-3 bg-gray-50 border-t border-gray-200">
        <a
          href="#"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2 group">
          View all {category.title}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </div>,
    document.body,
  );
};

const CategoryPanel = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    maxHeight: 0,
  });
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const categoryRefs = useRef({});
  const hoverTimeoutRef = useRef(null);

  const handleCategoryHover = (category) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (!category.hasMenu) {
      setHoveredCategory(null);
      setIsMenuHovered(false);
      return;
    }

    const ref = categoryRefs.current[category.id];
    if (ref) {
      const rect = ref.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      setMenuPosition({
        top: rect.top,
        left: rect.right,
        maxHeight: Math.min(520, viewportHeight - rect.top - 20),
      });
    }

    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isMenuHovered) {
        setHoveredCategory(null);
      }
    }, 100);
  };

  const handleMenuEnter = () => {
    setIsMenuHovered(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleMenuLeave = () => {
    setIsMenuHovered(false);
    setHoveredCategory(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="relative py-4 bg-white rounded-lg  border border-gray-200 h-full overflow-hidden flex flex-col">
        {/* Category List */}
        <nav className="flex-1 overflow-y-auto">
          {categoryData.map((category, index) => {
            const Icon = iconMap[category.id];
            return (
              <div
                className=""
                key={category.id}
                ref={(el) => (categoryRefs.current[category.id] = el)}
                onMouseEnter={() => handleCategoryHover(category)}
                onMouseLeave={handleCategoryLeave}>
                <a
                  href={category.href || "#"}
                  className={`
                    flex items-center justify-between px-4 py-2.5
                    text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700
                    transition-all duration-200 group relative
                    ${
                      hoveredCategory?.id === category.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                        : "border-l-4 border-transparent"
                    }
                  `}>
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <Icon
                        className={`
                          w-5 h-5 flex-shrink-0 transition-colors duration-200
                          ${hoveredCategory?.id === category.id ? "text-blue-600" : "text-gray-500"}
                        `}
                      />
                    )}
                    <span className="font-medium">{category.title}</span>
                  </div>

                  {category.hasMenu && (
                    <ChevronRight
                      className={`
                        w-4 h-4 transition-all duration-200
                        ${
                          hoveredCategory?.id === category.id
                            ? "text-blue-600 translate-x-1"
                            : "text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1"
                        }
                      `}
                    />
                  )}
                </a>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        {/* <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <a
            href="/categories"
            className="text-xs font-semibold text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group">
            <span>Browse all categories</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div> */}
      </div>

      {/* Mega Menu Portal */}
      <MegaMenu
        category={hoveredCategory}
        position={menuPosition}
        isHovered={!!hoveredCategory || isMenuHovered}
        onMouseEnter={handleMenuEnter}
        onMouseLeave={handleMenuLeave}
      />
    </>
  );
};

export default CategoryPanel;
