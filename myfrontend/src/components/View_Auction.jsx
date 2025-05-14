import React, { useState } from "react";

export default function View_Auction() {
  const [isAvailable, setIsAvailable] = useState(true);

  // Function to handle the toggle change
  const handleToggle = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-3 w-full text-center">
        <h1 className="text-4xl text-[#0B3448] font-semibold pb-2">View Auction</h1>
      </div>
      
      {/* Available / Sold Toggle */}
      <div className="flex items-center mb-6">
        <p className="mr-4 text-green-500 font-semibold">Available</p>
        <label className="relative inline-block w-16 h-8 cursor-pointer">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={handleToggle}
            className="hidden"
          />
          {/* Background of the toggle */}
          <span
            className={`${
              isAvailable ? "bg-blue-500" : "bg-gray-300"
            } absolute inset-0 rounded-full transition-colors duration-300`}
          ></span>
          {/* The circle inside the toggle */}
          <span
            className={`${
              isAvailable ? "translate-x-8" : "translate-x-0"
            } w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 transform`}
          ></span>
        </label>
        <p className="ml-4 text-gray-500 font-semibold">Sold</p>
      </div>
    </div>
  );
}
