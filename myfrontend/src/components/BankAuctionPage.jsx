import React from 'react';
import INDIA from '../assets/INDIA.svg';  // Path to your India map SVG
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function BankAuctionPage() {
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
      >
        <FiberManualRecordIcon style={{ fontSize: 18, color: 'red', marginRight: '8px' }} />
        Jammu & Kashmir
      </button>

      {/* Punjab - Button with CSS class for positioning */}
      <button 
        className="state punjab font-extrabold"
      >
        <FiberManualRecordIcon style={{ fontSize: 18, color: 'red', marginRight: '8px' }} />
        Punjab
      </button>
    </div>
  );
}
