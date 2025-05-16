import React from 'react';

export default function UnlockMobilePopup({ isOpen, onClose, onContinue }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-72 shadow-xl text-center relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl font-bold text-gray-500">&times;</button>
        <h2 className="text-lg font-semibold mb-2">Unlock Banker Mobile Number with 10 Coins!</h2>
        <p className="text-sm">
          Coins Remain - <span className="text-orange-600 font-medium">500</span>
        </p>
        <div className="mt-5 flex justify-between">
          <button
            onClick={onContinue}
            className="bg-[#930000] text-white px-4 py-2 rounded-full text-sm w-28"
          >
            Continue
          </button>
          <button
            onClick={onClose}
            className="bg-[#003B4A] text-white px-4 py-2 rounded-full text-sm w-28"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
