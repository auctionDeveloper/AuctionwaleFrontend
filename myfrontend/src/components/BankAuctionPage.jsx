import React, { useState } from 'react';
import INDIA from '../assets/INDIA.svg';  // Path to your India map SVG
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
    <div className="map-container">
      {/* Image of India Map */}
      <img 
        src={INDIA}
        alt="India Map"
        className="responsive-map"
      />

      {/* Jammu & Kashmir - Button with CSS class for positioning */}
      <button 
        className="state jammu font-extrabold"
        onClick={() => handleStateClick('Jammu & Kashmir')}
      >
        <FiberManualRecordIcon style={{ fontSize: '1.2rem', color: 'red', marginRight: '8px' }} />
        Jammu & Kashmir
      </button>

      {/* Punjab - Button with CSS class for positioning */}
      <button 
        className="state punjab font-extrabold"
        onClick={() => handleStateClick('Punjab')}
      >
        <FiberManualRecordIcon style={{color: 'red', marginRight: '8px' }} />
        Punjab
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
  );
}
