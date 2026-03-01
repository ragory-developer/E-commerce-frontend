import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  Droplet,
  Sparkles,
  Scissors,
  Flame,
  Wind,
  Bath,
  Heart,
  Gem,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";

// Icon mapping for beauty categories
const iconMap = {
  1: Droplet,       // Skincare
  2: Sparkles,      // Makeup
  3: Scissors,      // Hair Care
  4: Flame,         // Fragrance
  5: Wind,          // Bath & Body
  6: Bath,          // Tools & Accessories
  7: Heart,         // Natural & Organic
  8: Gem,           // Luxury Beauty
  9: ShoppingBag,   // Gift Sets
  10: LayoutGrid,   // All Categories
};

// Beauty category data
const categoryData = [
  {
    id: 1,
    title: "Skincare",
    hasMenu: true,
    megaMenu: {
      backgroundImage:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800",
      sections: [
        {
          title: "Face Care",
          items: ["Cleansers", "Toners", "Moisturizers", "Serums", "Face Masks", "Exfoliators"],
        },
        {
          title: "Eye Care",
          items: ["Eye Creams", "Eye Serums", "Eye Masks"],
        },
        {
          title: "Lip Care",
          items: ["Lip Balms", "Lip Scrubs", "Lip Treatments"],
        },
        {
          title: "Sun Care",
          items: ["Sunscreens", "After Sun", "Tanning"],
        },
        {
          title: "Acne & Blemish",
          items: ["Spot Treatments", "Cleansers", "Moisturizers"],
        },
        {
          title: "Anti-Aging",
          items: ["Retinols", "Peptides", "Anti-Wrinkle Creams"],
        },
      ],
    },
  },
  {
    id: 2,
    title: "Makeup",
    hasMenu: true,
    megaMenu: {
      backgroundImage:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800",
      sections: [
        {
          title: "Face",
          items: ["Foundation", "Concealer", "Powder", "Blush", "Highlighter", "Bronzer"],
        },
        {
          title: "Eyes",
          items: ["Eyeshadow", "Eyeliner", "Mascara", "Eyebrows", "Primer"],
        },
        {
          title: "Lips",
          items: ["Lipstick", "Lip Gloss", "Lip Liner", "Lip Stain"],
        },
        {
          title: "Nails",
          items: ["Nail Polish", "Base & Top Coat", "Nail Care"],
        },
        {
          title: "Makeup Tools",
          items: ["Brushes", "Sponges", "Sharpeners", "Mirrors"],
        },
        {
          title: "Makeup Removers",
          items: ["Micellar Water", "Cleansing Oils", "Wipes"],
        },
      ],
    },
  },
  {
    id: 3,
    title: "Hair Care",
    hasMenu: true,
    megaMenu: {
      backgroundImage:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800",
      sections: [
        {
          title: "Shampoos",
          items: ["For Dry Hair", "For Oily Hair", "Color Protection", "Volumizing", "Sulfate-Free"],
        },
        {
          title: "Conditioners",
          items: ["Daily Conditioners", "Deep Conditioners", "Leave-In", "Hair Masks"],
        },
        {
          title: "Styling",
          items: ["Hair Sprays", "Gels & Mousses", "Creams & Lotions", "Heat Protectants"],
        },
        {
          title: "Hair Treatments",
          items: ["Oils & Serums", "Scalp Treatments", "Hair Growth"],
        },
        {
          title: "Hair Color",
          items: ["Permanent Color", "Semi-Permanent", "Root Touch-Up"],
        },
        {
          title: "Tools",
          items: ["Hair Dryers", "Straighteners", "Curling Irons", "Brushes & Combs"],
        },
      ],
    },
  },
  {
    id: 4,
    title: "Fragrance",
    hasMenu: true,
    megaMenu: {
      backgroundImage:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800",
      sections: [
        {
          title: "Women",
          items: ["Perfumes", "Eau de Parfum", "Eau de Toilette", "Gift Sets"],
        },
        {
          title: "Men",
          items: ["Colognes", "Eau de Parfum", "Eau de Toilette", "Gift Sets"],
        },
        {
          title: "Unisex",
          items: ["Niche Fragrances", "Unisex Scents"],
        },
        {
          title: "Discovery Sets",
          items: ["Sample Sets", "Miniatures"],
        },
        {
          title: "Home Fragrance",
          items: ["Candles", "Diffusers", "Room Sprays"],
        },
      ],
    },
  },
  {
    id: 5,
    title: "Bath & Body",
    hasMenu: true,
    megaMenu: {
      backgroundImage:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800",
      sections: [
        {
          title: "Bath",
          items: ["Bath Bombs", "Bath Salts", "Bubble Bath", "Bath Oils"],
        },
        {
          title: "Shower",
          items: ["Shower Gels", "Body Scrubs", "Soap Bars", "Shower Creams"],
        },
        {
          title: "Body Care",
          items: ["Body Lotions", "Body Butters", "Body Oils", "Hand Creams"],
        },
        {
          title: "Deodorants",
          items: ["Sprays", "Roll-Ons", "Natural Deodorants"],
        },
        {
          title: "Self-Tanning",
          items: ["Tanners", "Tan Removers", "Tan Accessories"],
        },
      ],
    },
  },
  {
    id: 6,
    title: "Tools & Accessories",
    hasMenu: false,
    href: "/beauty/tools",
  },
  {
    id: 7,
    title: "Natural & Organic",
    hasMenu: false,
    href: "/beauty/natural",
  },
  {
    id: 8,
    title: "Luxury Beauty",
    hasMenu: false,
    href: "/beauty/luxury",
  },
  {
    id: 9,
    title: "Gift Sets",
    hasMenu: false,
    href: "/beauty/gifts",
  },
  {
    id: 10,
    title: "All Categories",
    hasMenu: false,
    href: "/beauty/all",
  },
];

// Mega Menu Component (unchanged)
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
      className="absolute bg-white border border-gray-200 overflow-hidden transition-all duration-200"
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
      <div className="relative px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-blue-600" />}
          <h3 className="text-base font-bold text-gray-500">{category.title}</h3>
        </div>
      </div>

      {/* Mega Menu Content */}
      <div
        className="relative z-10 p-6 overflow-y-auto"
        style={{ maxHeight: `${position.maxHeight - 120}px` }}>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          {category.megaMenu.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-bold text-gray-600 text-sm uppercase tracking-wide pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href="/en/product"
                      className="text-sm text-gray-600 hover:text-blue-600 hover:pl-2 inline-block transition-all duration-200 relative group">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1.5 transition-all duration-200"></span>
                      {item}
                    </Link>
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

// CategoryPanel component (unchanged logic)
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
      <div className="relative py-4 bg-white rounded-lg border border-gray-200 h-full overflow-hidden flex flex-col">
        {/* Category List */}
        <nav className="flex-1 overflow-y-auto">
          {categoryData.map((category) => {
            const Icon = iconMap[category.id];
            return (
              <div
                key={category.id}
                ref={(el) => (categoryRefs.current[category.id] = el)}
                onMouseEnter={() => handleCategoryHover(category)}
                onMouseLeave={handleCategoryLeave}>
                <Link
                  href={"/en/product"}
                  className={`
                    flex items-center justify-between px-4 py-2.5
                    text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700
                    transition-all duration-200 group relative
                    ${hoveredCategory?.id === category.id
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
                        ${hoveredCategory?.id === category.id
                          ? "text-blue-600 translate-x-1"
                          : "text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1"
                        }
                      `}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
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