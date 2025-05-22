import React from 'react';
import BankDocument from '../assets/Bank Building.svg'
import ComparisonChart from '../assets/Combo Chart.svg'
import AreaReport from '../assets/Commercial.svg'
import TSR from '../assets/Doodle.svg'
import ValuationReport from '../assets/Graph Report.svg'
import VideoPhotos from '../assets/Movies Folder.svg'
import PublicSalesNotice from '../assets/Report file.svg'


const features = [
  { label: 'Bank Document', icon: BankDocument },
  { label: 'Comparison Chart', icon: ComparisonChart },
  { label: 'Area Report', icon: AreaReport },
  { label: 'TSR', icon: TSR },
  { label: 'Valuation Report', icon: ValuationReport },
  { label: 'Video & Photos', icon: VideoPhotos },
  { label: 'Public & Sales Notice', icon: PublicSalesNotice  },
];

export default function WhyUseAuctionwale() {
  return (
    <section className="py-10 px-4 bg-white text-center overflow-hidden z-[999] mb-10">
      {/* Decorative Heading with Dots */}
      <div className="flex items-center justify-center mb-10 relative mt-[8px]">
  {/* Left Line with Dot */}
  <div className="flex items-center flex-grow mr-2">
    <div className="h-px bg-[#0B3448] flex-grow" />
    <div className="w-2 h-2 bg-[#0B3448] rounded-full mx-1" />
  </div>

  {/* Heading */}
  <h2 className="text-[#0B3448] text-md sm:text-2xl font-bold px-4">
    Why Use Auctionwale
  </h2>

  {/* Right Line with Dot */}
  <div className="flex items-center flex-grow ml-2">
    <div className="w-2 h-2 bg-[#0B3448] rounded-full mx-1" />
    <div className="h-px bg-[#0B3448] flex-grow" />
  </div>
</div>


      {/* Row 1: 4 Items */}
      <div className="grid grid-cols-4 gap-4 sm:gap-10 justify-center max-w-6xl mx-auto pb-1 overflow-hidden">
        {features.slice(0, 4).map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center p-3 transition-transform duration-300 hover:scale-110 hover:pb-2"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src={feature.icon}
                alt={feature.label}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#930000] mt-2 text-center">
              {feature.label}
            </p>
          </div>
        ))}
      </div>

      {/* Row 2: 3 Items */}
      <div className="grid grid-cols-3 gap-4 sm:gap-10 justify-center max-w-[70%] mx-auto mt-0 lg:mt-10 overflow-hidden">
        {features.slice(4).map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center p-3 transition-transform duration-300 hover:scale-110"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src={feature.icon}
                alt={feature.label}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#930000] mt-2 text-center">
              {feature.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
