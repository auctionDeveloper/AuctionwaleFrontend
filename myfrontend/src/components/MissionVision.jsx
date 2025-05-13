import React from 'react';
import MissionVisionImg from "../assets/MissionVision.svg";

export default function MissionVision() {
  return (
    <div className=' w-full h-auto '> 
                <h2 className="text-2xl md:text-3xl font-bold text-[#0B3448] text-center mb-8 pb-3">
        Our Mission &amp; Goals
      </h2>
      <img src={MissionVisionImg} alt="Mission and Vision" className='w-full h-full ' />
    </div>
  );
}
