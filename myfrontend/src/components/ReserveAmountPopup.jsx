// components/ReserveAmountPopup.js
import React from 'react';

export default function ReserveAmountPopup({ isOpen, onClose, reserveAmount }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Reserve Amount For This Property.</h2>
        <p className="text-2xl font-bold text-[#930000]">
           {reserveAmount}
        </p>
        <button
          className="bg-[#002F40] text-white px-8 py-2 rounded-full font-semibold"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}
