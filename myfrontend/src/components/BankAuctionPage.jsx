import React, { useState, useEffect } from 'react';
import INDIA from '../assets/INDIA.svg';  // Path to your India map image
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './BankAuctionPage.css';  // Import the CSS file
import { MapPin, Coins, Search } from "lucide-react";
import {useNavigate} from 'react-router-dom'

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

export default function BankAuctionPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedState, setSelectedState] = useState('');
    const [data, setData] = useState([]);
  const [banksForState, setBanksForState] = useState([]);

    const navigate = useNavigate();
  useEffect(() => {
    fetch('/propertyData.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load data", err));
  }, []);

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    const filtered = data.filter((item) => item.state.toLowerCase() === stateName.toLowerCase());
    const uniqueBanks = Array.from(
      new Map(filtered.map(bank => [bank.bankName, bank])).values()
    );
    setBanksForState(uniqueBanks);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setBanksForState([]);
  };

  const handleBankClick = (bankName) => {
    navigate(`/search_result_page?state=${encodeURIComponent(selectedState)}&bank=${encodeURIComponent(bankName)}`);
  };


  return (
   <div className='flex flex-col bg-[#7E7E7E]'>
    <div className='flex flex-col items-center justify-center mt-5'>
      <h1 className='font-bold text-4xl text-white pb-2'>Bank Auction</h1>
      <div className="flex items-center gap-1 px-3 py-2 flex-grow-0"><MapPin className="text-gray-300 w-6 h-6 font-extrabolod" /><p className='text-white'>Explore auctions through Map</p></div>
      
  {/* Responsive logo layout */}
  <div className='logodiv flex flex-col lg:flex-row gap-4 mt-4'>
    {/* Left column on desktop, top row on mobile */}
    <div className='logofirstdiv flex justify-center gap-4 lg:flex-col'>
      <img src={SBI} alt="SBI" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
      <img src={BOB} alt="BOB" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
      <img src={KOTAK} alt="KOTAK" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
      <img src={CANARA} alt="CANARA" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
      <img src={UNION} alt="UNION" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
    </div>

    {/* Right column on desktop, bottom row on mobile */}
    <div className='logoseconddiv flex justify-center gap-4 lg:flex-col'>
      <img src={PNB} alt="PNB" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
      <img src={AXIS} alt="AXIS" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
      <img src={ICICI} alt="ICICI" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
      <img src={HDFC} alt="HDFC" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
      <img src={INDUSIND} alt="INDUSIND" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
    </div>
  </div>

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


        {/* Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button onClick={closePopup} className="close-button">Close</button>
              <h2 className="text-xl font-bold mb-3">{selectedState} Banks</h2>
              {banksForState.length === 0 ? (
                <p>No banks found for this state.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {banksForState.map((bank, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleBankClick(bank.bankName)}
                      className="cursor-pointer flex items-center gap-3 p-2 border rounded hover:bg-gray-100 transition"
                    >
                      <img
                        src={bank.bankLogo}
                        alt={bank.bankName}
                        className="w-10 h-10 rounded object-contain"
                      />
                      <span className="font-medium text-gray-800">{bank.bankName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
    </div>
   </div>
  );
}
