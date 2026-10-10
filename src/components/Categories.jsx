import React, { useState } from "react";
import { Funnel, ChevronDown } from "lucide-react";

const Categories = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [showCategory, setShowCategory] = useState(false);

  const categories = [
    "All Categories",
    "Food",
    "Transportation",
    "Shopping",
    "Bills",
    "Entertainment",
  ];

  return (
    <div className="relative">

      {/* Category Button */}
      <button
        onClick={() => setShowCategory(!showCategory)}
        className="bg-gray-100 rounded-xl px-5 py-3 flex items-center gap-3 min-w-[200px]"
      >
        <Funnel size={20} className="text-gray-500" />

        <span className="flex-1 text-left">
          {selectedCategory}
        </span>

        <ChevronDown
          size={18}
          className="text-gray-400"
        />
      </button>

      {/* Dropdown */}
      {showCategory && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowCategory(false);
              }}
              className={`w-full text-left px-5 py-3 hover:bg-gray-100 transition ${
                selectedCategory === category
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              {category}
            </button>
          ))}

        </div>
      )}

    </div>
  );
};

export default Categories;