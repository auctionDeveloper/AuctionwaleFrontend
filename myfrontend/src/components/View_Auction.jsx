import React, { useState } from 'react';
import { MapPin, Coins, Search } from "lucide-react";
import SearchResultPage from '../pages/SearchResultPage';


export default function View_Auction() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [active, setActive] = useState("Residential");
  const [locationFilter, setLocationFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");

  const categories = [
    "Residential",
    "Commercial",
    "Industrial",
    "Agricultural",
    "Plant & Machinery",
  ];

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='py-3 w-full text-center'>
        <h1 className='text-4xl text-[#0B3448] font-semibold pb-2 mb-2'>View Auction</h1>
      </div>

      {/* Filter Bar */}
      <div className='w-full max-w-md flex justify-between items-center border border-[#930000] rounded-full mx-4'>
        <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300 flex-grow-0">
          <MapPin className="text-gray-500 w-4 h-4" />
          <input
            list="locations"
            placeholder="Location"
            className="focus:outline-none"
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <datalist id="locations">
            <option value="Mumbai" />
            <option value="Navi Mumbai" />
            <option value="Delhi" />
            <option value="Kerala" />
          </datalist>
        </div>

        <div className="flex items-center gap-1 px-2 py-2 flex-grow-0">
          <Coins className="text-gray-500 w-4 h-4" />
          <select
            className="focus:outline-none"
            onChange={(e) => setBudgetFilter(e.target.value)}
          >
            <option value="" disabled selected className="text-gray-300">Budget</option>
            <option value="5000000">Up to ₹50 Lakh</option>
            <option value="10000000">Up to ₹1 Crore</option>
            <option value="20000000">Up to ₹2 Crore</option>
          </select>
        </div>

        <div className="ml-2">
          <button className="bg-red-700 px-4 py-4 flex items-center justify-center rounded-shrink">
            <Search className="text-white w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className=' flex justify-center items-center gap-2 sm:gap-6 my-4 sm:mt-8'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`text-xs sm:text-lg p-2 sm:p-8  border rounded shadow-sm
              ${active === category ? 'bg-[#0B3448] text-white' : 'bg-white text-black'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Toggle: Available / Sold */}
      <div className="mt-4 flex flex-row justify-center items-center">
        <h1 className='text-sm sm:text-lg text-[#38A64F] font-semibold px-2'>Available</h1>
        <div
          className={`relative w-16 h-8 sm:w-24 sm:h-10 flex items-center rounded-full cursor-pointer transition-colors duration-300 
          ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
          onClick={() => setIsAvailable(!isAvailable)}
        >
          <div
            className={`absolute bg-white w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow-md transition-all duration-100
            ${isAvailable ? 'left-1' : 'right-1'}`}
          ></div>
        </div>
        <h1 className='text-sm sm:text-lg text-[#930000] font-semibold px-2'>Sold</h1>
      </div>

      {/* Cards */}
      <div className='mt-6 w-full'>
        <SearchResultPage
          category={active}
          availability={isAvailable ? 'Available' : 'Sold'}
          location={locationFilter}
          budget={budgetFilter}
        />
      </div>
    </div>
  );
}
