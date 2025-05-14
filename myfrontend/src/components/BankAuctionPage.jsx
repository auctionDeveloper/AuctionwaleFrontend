import React, { useState } from 'react';
import INDIA from '../assets/INDIA.svg';  // Path to your India map image
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './BankAuctionPage.css';  // Import the CSS file

export default function BankAuctionPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedState, setSelectedState] = useState('');

  // Function to handle button click and show popup
  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    setShowPopup(true);
  };

  // Function to close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
   <div className='flex flex-col bg-[#7E7E7E]'>
    <div className='flex flex-col items-center justify-center my-5'>
      <h1 className='font-extrabold text-2xl'>Bank Auction</h1>
      <p>Explore</p>
    </div>
     <div className="map-container">
      {/* Image of India Map */}
      <img 
        src={INDIA}
        alt="India Map"
        className="responsive-map"
      />

      {/* Jammu & Kashmir - Button with CSS class for positioning */}
      <button 
        className="state jammu font-semibold"
        onClick={() => handleStateClick('Jammu & Kashmir')}
      >
        <FiberManualRecordIcon />
        Jammu & Kashmir
      </button>

      {/* Punjab - Button with CSS class for positioning */}
      <button 
        className="state punjab font-semibold"
        onClick={() => handleStateClick('Punjab')}
      >
        <FiberManualRecordIcon />
        Punjab
      </button>
      

            {/* Himachal Pardesh - Button with CSS class for positioning */}
      <button 
        className="state himachal font-semibold"
        onClick={() => handleStateClick('Himachal')}
      >
        <FiberManualRecordIcon />
        Himachal Pradesh
      </button>

            {/* Uttrakhand - Button with CSS class for positioning */}
      <button 
        className="state uttrakhand font-semibold"
        onClick={() => handleStateClick('Uttrakhand')}
      >
        <FiberManualRecordIcon />
      Uttrakhand
      </button>
            {/* Haryana - Button with CSS class for positioning */}
      <button 
        className="state haryana font-semibold"
        onClick={() => handleStateClick('Haryana')}
      >
        <FiberManualRecordIcon />
     Harayana
      </button>
            {/* Delhi - Button with CSS class for positioning */}
      <button 
        className="state delhi font-semibold"
        onClick={() => handleStateClick('Delhi')}
      >
        <FiberManualRecordIcon />
     Delhi
      </button>

      {/* Add more states here */}

      {/* Popup for showing more details */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={closePopup} className="close-button">Close</button>
            <h2>{selectedState} Details</h2>
            <p>Information about {selectedState}.</p>
          </div>
        </div>
      )}
    </div>
   </div>
  );
}
