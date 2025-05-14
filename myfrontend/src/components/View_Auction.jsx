import React from 'react'
import { MapPin, Coins, Search } from "lucide-react";

export default function View_Auction() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='py-3 w-full text-center'>
        <h1 className='text-4xl text-[#0B3448] font-semibold pb-2'>View Auction</h1>
      </div>
      <div className='flex justify-between items-center border border-[#930000] rounded-full'>
        {/* Location Input */}
        <div className="flex items-center gap-1 px-3 py-2 border-r border-gray-300 flex-grow-0">
          <MapPin className="text-gray-500 w-4 h-4" />
          <input
            list="locations"
            placeholder="Location"
            className="focus:outline-none"
          />
          <datalist id="locations">
            <option value="Mumbai" />
            <option value="Navi Mumbai" />
            <option value="Delhi" />
            <option value="Kerala" />
          </datalist>
        </div>

        {/* Budget Select */}
        <div className="flex items-center gap-1 px-2 py-2  flex-grow-0">
          <Coins className="text-gray-500 w-4 h-4" />
          <select className="focus:outline-none">
            <option value="" disabled selected className="text-gray-300">Budget</option>
            <option>10Lakh-50Lakh</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="ml-2">
          <button
            className="bg-red-700 px-4 py-4 flex items-center justify-center rounded-shrink"
          >
            <Search className="text-white w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Available / Sold */}
      <div className='mt-3'>Available Sold</div>
    </div>
  )
}
