// components/UnlockSalesPopup.js
import React from 'react';

export default function UnlockSalesPopup({ isOpen, onClose, onContinue, remainingCoins = 500 }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center space-y-4">
        <h2 className="text-lg font-semibold">Unlock Sales/Public Notice with 20 Coins!</h2>
        <p className="text-sm">
          Coins Remain - <span className="text-orange-500 font-semibold">{remainingCoins}</span>
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            className="bg-[#930000] text-white px-6 py-2 rounded-full"
            onClick={onContinue}
          >
            Continue
          </button>
          <button
            className="bg-[#002F40] text-white px-6 py-2 rounded-full"
            onClick={onClose}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
