import React from "react";

const Cards = ({ title, amount, icon, type }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 
                    flex justify-between items-center 
                    shadow-sm hover:shadow-md transition duration-300">

      <div>
        <h3 className="text-lg font-semibold text-black mb-6">
          {title}
        </h3>

        <h1 className={`text-4xl font-bold ${type}`}>
          {amount}
        </h1>
      </div>

      <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
        {icon}
      </div>

    </div>
  );
};

export default Cards;