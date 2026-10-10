import React, { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

const Dates = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [showDate, setShowDate] = useState(false);

  const dates = [
    "All Dates",
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
  ];

  return (
    <div className="relative">

      {/* Date Button */}
      <button
        onClick={() => setShowDate(!showDate)}
        className="bg-gray-100 rounded-xl px-5 py-3 flex items-center gap-3 min-w-[180px]"
      >
        <CalendarDays
          size={20}
          className="text-gray-500"
        />

        <span className="flex-1 text-left">
          {selectedDate}
        </span>

        <ChevronDown
          size={18}
          className="text-gray-400"
        />
      </button>

      {/* Dropdown */}
      {showDate && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">

          {dates.map((date) => (
            <button
              key={date}
              onClick={() => {
                setSelectedDate(date);
                setShowDate(false);
              }}
              className={`w-full text-left px-5 py-3 hover:bg-gray-100 transition ${
                selectedDate === date
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              {date}
            </button>
          ))}

        </div>
      )}

    </div>
  );
};

export default Dates;