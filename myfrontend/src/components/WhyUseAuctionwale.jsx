import React from 'react';

const features = [
  { label: 'Bank Document', icon: '/src/assets/Bank Building.svg' },
  { label: 'Comparison Chart', icon: '/src/assets/Combo Chart.svg' },
  { label: 'Area Report', icon: '/src/assets/Commercial.svg' },
  { label: 'TSR', icon: '/src/assets/Doodle.svg' },
  { label: 'Valuation Report', icon: '/src/assets/Graph Report.svg' },
  { label: 'Video & Photos', icon: '/src/assets/Movies Folder.svg' },
  { label: 'Public & Sales Notice', icon: '/src/assets/Report file.svg' },
];

export default function WhyUseAuctionwale() {
  return (
    <section className="py-12 px-4 bg-white text-center overflow-hidden">
      {/* Decorative Heading with Dots */}
      <div className="flex items-center justify-center mb-10 relative">
        <div className="flex-grow h-px bg-[#0B3448] mr-2 relative text-extrabold">
          <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#0B3448] rounded-full" />
        </div>
        <h2 className="text-[#0B3448] text-xl sm:text-2xl font-bold px-4">
          Why Use Auctionwale
        </h2>
        <div className="flex-grow h-px bg-[#0B3448] ml-2 relative">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#0B3448] rounded-full" />
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
      <div className="grid grid-cols-3 gap-4 sm:gap-10 justify-center max-w-[70%] mx-auto mt-10 overflow-hidden">
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
