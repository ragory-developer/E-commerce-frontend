import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openSubIndex, setOpenSubIndex] = useState(null);

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className=" pb-2">
          {/* Level 1 */}
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="flex items-center justify-between w-full text-left text-gray-600 font-medium py-1">
            <span>{item.title}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openIndex === idx ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Level 2 */}
          {openIndex === idx && item.children && (
            <div className="ml-4 mt-2 space-y-1">
              {item.children.map((subItem, subIdx) => (
                <div key={subIdx}>
                  <button
                    onClick={() =>
                      setOpenSubIndex(
                        openSubIndex?.parent === idx &&
                          openSubIndex.child === subIdx
                          ? null
                          : { parent: idx, child: subIdx },
                      )
                    }
                    className="flex items-center justify-between w-full text-left text-gray-500 text-sm py-1">
                    <span>{subItem.title}</span>
                    {subItem.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          openSubIndex?.parent === idx &&
                          openSubIndex.child === subIdx
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Level 3 */}
                  {openSubIndex?.parent === idx &&
                    openSubIndex.child === subIdx &&
                    subItem.children && (
                      <div className="ml-4 mt-1 space-y-1 text-gray-400 text-xs">
                        {subItem.children.map((leaf, leafIdx) => (
                          <div
                            key={leafIdx}
                            className="py-1 hover:text-gray-600 cursor-pointer">
                            {leaf}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
