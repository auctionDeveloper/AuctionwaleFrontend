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

                  {/* Rajashthan - Button with CSS class for positioning */}
      <button 
        className="state rajasthan font-semibold"
        onClick={() => handleStateClick('Rajasthan')}
      >
        <FiberManualRecordIcon />
     Rajasthan
      </button>

                        {/* Uttar Pardesh - Button with CSS class for positioning */}
      <button 
        className="state uttarpardesh font-semibold"
        onClick={() => handleStateClick('Uttar Pardesh')}
      >
        <FiberManualRecordIcon />
     Uttar Pardesh
      </button>

                              {/* Bihar - Button with CSS class for positioning */}
      <button 
        className="state bihar font-semibold"
        onClick={() => handleStateClick('Bihar')}
      >
        <FiberManualRecordIcon />
     Bihar
      </button>
 {/* jharkhand- Button with CSS class for positioning */}
            <button 
        className="state jharkhand font-semibold"
        onClick={() => handleStateClick('Jharkahnd')}
      >
        <FiberManualRecordIcon />
     Jharkhand
      </button>

       {/* West Bengal- Button with CSS class for positioning */}
            <button 
        className="state bengal font-semibold"
        onClick={() => handleStateClick('West Bengal')}
      >
        <FiberManualRecordIcon />
    West Bengal
      </button>

             {/* Sikkim- Button with CSS class for positioning */}
            <button 
        className="state sikkim font-semibold"
        onClick={() => handleStateClick('Sikkim')}
      >
        <FiberManualRecordIcon />
    Sikkim
      </button>

                   {/* Assam- Button with CSS class for positioning */}
            <button 
        className="state assam font-semibold"
        onClick={() => handleStateClick('Assam')}
      >
        <FiberManualRecordIcon />
  Assam
      </button>

                         {/* Meghalaya- Button with CSS class for positioning */}
            <button 
        className="state meghalaya font-semibold"
        onClick={() => handleStateClick('Meghalaya')}
      >
        <FiberManualRecordIcon />
  Meghalaya
      </button>

                               {/* Tripura- Button with CSS class for positioning */}
            <button 
        className="state tripura font-semibold"
        onClick={() => handleStateClick('Tripura')}
      >
        <FiberManualRecordIcon />
  Tripura
      </button>

                                     {/*  Mizoram- Button with CSS class for positioning */}
            <button 
        className="state  mizoram font-semibold"
        onClick={() => handleStateClick('Mizoram')}
      >
        <FiberManualRecordIcon />
 Mizoram
      </button>

      
                                     {/*  Nagaland- Button with CSS class for positioning */}
            <button 
        className="state  nagaland font-semibold"
        onClick={() => handleStateClick('Nagaland')}
      >
        <FiberManualRecordIcon />
Nagaland
      </button>

                                           {/*  Arunachal Pardesh- Button with CSS class for positioning */}
            <button 
        className="state arunachalpardesh font-semibold"
        onClick={() => handleStateClick('Arunachal Pardesh')}
      >
        <FiberManualRecordIcon />
Arunachal Pardesh
      </button>

      {/*  Gujrat- Button with CSS class for positioning */}
            <button 
        className="state gujrat font-semibold"
        onClick={() => handleStateClick('Gujrat')}
      >
        <FiberManualRecordIcon />
Gujrat
      </button>

            {/*  Madhya Pradesh- Button with CSS class for positioning */}
            <button 
        className="state madhyapradesh font-semibold"
        onClick={() => handleStateClick('Madhya Pradesh')}
      >
        <FiberManualRecordIcon />
Madhya Pradesh
      </button>

                  {/*  Chattishgarh- Button with CSS class for positioning */}
            <button 
        className="state chattishgarh font-semibold"
        onClick={() => handleStateClick('Chattishgarh')}
      >
        <FiberManualRecordIcon />
Chattishgarh
      </button>

                  {/* Orissa- Button with CSS class for positioning */}
            <button 
        className="state orissa font-semibold"
        onClick={() => handleStateClick('Orissa')}
      >
        <FiberManualRecordIcon />
Orissa
      </button>

                        {/* Maharashtra- Button with CSS class for positioning */}
            <button 
        className="state maharashtra font-semibold"
        onClick={() => handleStateClick('maharashtra')}
      >
        <FiberManualRecordIcon />
Maharashtra
      </button>
                              {/* Goa- Button with CSS class for positioning */}
            <button 
        className="state goa font-semibold"
        onClick={() => handleStateClick('Goa')}
      >
        <FiberManualRecordIcon />
Goa
      </button>

           {/* Telangana- Button with CSS class for positioning */}
            <button 
        className="state telangana font-semibold"
        onClick={() => handleStateClick('Telangana')}
      >
        <FiberManualRecordIcon />
Telangana
      </button>
                 {/*Karnataka- Button with CSS class for positioning */}
            <button 
        className="state karnataka font-semibold"
        onClick={() => handleStateClick('Karnataka')}
      >
        <FiberManualRecordIcon />
Karnataka
      </button>
                       {/*Andra Pradesh- Button with CSS class for positioning */}
            <button 
        className="state andrapradesh font-semibold"
        onClick={() => handleStateClick('Andra Pradesh')}
      >
        <FiberManualRecordIcon />
Andra Pradesh
      </button>
                             {/*Tamilnadu- Button with CSS class for positioning */}
            <button 
        className="state tamilnadu font-semibold"
        onClick={() => handleStateClick('Tamilnadu')}
      >
        <FiberManualRecordIcon />
Tamilnadu
      </button>
                                   {/*Kerala- Button with CSS class for positioning */}
            <button 
        className="state kerala font-semibold"
        onClick={() => handleStateClick('Kerala')}
      >
        <FiberManualRecordIcon />
Kerala
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
