import React from 'react';
import SBI from '../assets/SBI.svg';
import BOB from '../assets/BOB.svg';
import KOTAK from '../assets/Kotak.svg';
import CANARA from '../assets/Canara.svg';
import UNION from '../assets/union.svg';
import PNB from '../assets/Punjab.svg';
import AXIS from '../assets/axis.svg';
import ICICI from '../assets/icici.svg';
import HDFC from '../assets/hdfc.svg';
import INDUSIND from '../assets/industan.svg';

const topRowBanks = [
  { name: 'State Bank of India', logo: SBI },
  { name: 'Bank of Baroda', logo: BOB },
  { name: 'Kotak Mahindra Bank', logo: KOTAK },
  { name: 'Canara Bank', logo: CANARA },
  { name: 'Union Bank Logo', logo: UNION },
];

const bottomRowBanks = [
  { name: 'Punjab National Bank', logo: PNB },
  { name: 'Axis Bank', logo: AXIS },
  { name: 'ICICI Bank', logo: ICICI },
  { name: 'HDFC Bank', logo: HDFC },
  { name: 'IndusInd Bank', logo: INDUSIND },
];

export default function BankAuctions() {
  return (
    <div className="relative bg-white w-full overflow-x-hidden pb-16">
      {/* Blue Bank Section */}
      <div className="bg-[#0B3448] py-4 pb-20 w-full overflow-hidden">
        <h2 className="text-white text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">
          Bank Auctions
        </h2>

        {/* Top Row - scrolls left */}
        <div className="overflow-hidden w-full">
          <div className="flex w-[200%] animate-scroll-left">
            {[...topRowBanks, ...topRowBanks].map((bank, index) => (
              <div
                key={`top-${index}`}
                className="w-1/3 sm:w-1/5 flex flex-col items-center justify-center px-2 sm:px-4"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] object-contain mb-1 sm:mb-2"
                />
                <p className="text-white text-xs sm:text-sm text-center truncate w-full">
                  {bank.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - scrolls right */}
        <div className="overflow-hidden w-full mt-4 sm:mt-6">
          <div className="flex w-[200%] animate-scroll-right">
            {[...bottomRowBanks, ...bottomRowBanks].map((bank, index) => (
              <div
                key={`bottom-${index}`}
                className="w-1/3 sm:w-1/5 flex flex-col items-center justify-center px-2 sm:px-4"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] object-contain mb-1 sm:mb-2"
                />
                <p className="text-white text-xs sm:text-sm text-center truncate w-full">
                  {bank.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating More Banks Button (OUTSIDE) */}
      <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 z-20">
        <button className=" bg-white text-[#0B3448] font-semibold text-sm px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-[#930000] hover:text-white border border-[#0B3448] hover:bg-[#930000] hover:text-white hover:border-transparent shadow-2xl ">
          More Banks <span className="text-2xl font-semibold leading-none pb-1">+</span>
        </button>
      </div>
    </div>
  );
}
