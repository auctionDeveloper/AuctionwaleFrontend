import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa6';

export default function Footer() {

    const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [banks, setBanks] = useState([]);
  const getUniqueByKey = (data, key) => {
  const seen = new Set();
  return data.filter(item => {
    const val = item[key];
    if (val && !seen.has(val)) {
      seen.add(val);
      return true;
    }
    return false;
  });
};


  useEffect(() => {
    fetch('/propertyData.json') // Replace with your actual API endpoint
      .then(res => res.json())
      .then(data => {
        setCategories(getUniqueByKey(data, 'category').map(item => item.category));
        setAreas(getUniqueByKey(data, 'area').map(item => item.area));
        setBanks(getUniqueByKey(data, 'bankName').map(item => item.bankName));
      });
  }, []);

  const generateLinks = (items, type) => {
    return items.slice(0, 20).map((item, idx) => (
      <a
        key={idx}
        href={`/search_result_page?${type}=${encodeURIComponent(item)}`}
        className="hover:text-[#930000] underline"
      >
        Auctions in {item}
      </a>
    ));
  };
  return (
    <footer className="bg-gray-100 text-[#0B3448] text-sm mt-4">
      <div className="container max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Left Section (40%) */}
        <div className="w-full md:w-[40%]">
          <div className="flex items-center gap-4 mb-3">
            <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
 <div className="flex flex-col font-poppins  whitespace-nowrap">
  <h1 className="text-3xl font-extrabold text-[#1f2937] leading-tight pb-1">Auctionwale</h1>
  <p className="text-base font-semibold text-[#930000] mt-[-3px]">Expert for Bank Auctions</p>
</div>
          </div>
          <p className="mb-3">
            AuctionWale aims to revolutionize property auctions in India through a transparent, tech-driven platform. Our vision is to simplify access to verified auction listings for all users.
          </p>
          <p className="mb-6">
            We are committed to fair bidding, real-time updates, and expert support. Our goal is to become India’s most trusted property auction destination.
          </p>

          <h4 className="text-lg font-semibold mb-3">Connect With Us Via</h4>
          <div className="flex gap-4 text-xl items-center">
            <a href="https://www.facebook.com/profile.php?id=61575141254895" target="_blank" rel="noopener noreferrer">
    <FaFacebookF className="hover:text-[#930000] cursor-pointer" />
  </a>
        <a href="https://www.youtube.com/@AuctionWale" target="_blank" rel="noopener noreferrer">
    <FaYoutube className="hover:text-[#930000] cursor-pointer" />
  </a>
  <a href="https://www.instagram.com/auctionwale/" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="hover:text-[#930000] cursor-pointer" />
  </a>
          </div>
        </div>

        {/* Right Section (60%) */}
        <div className="w-full md:w-[60%] space-y-6">
          <div>
            <h3 className="font-semibold text-base mb-1">Type of Property Auctions in India</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
          {generateLinks(categories, 'category')}
        </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">Areawise Auctions in India</h3>
             <div className="flex flex-wrap gap-x-4 gap-y-2">
         {generateLinks(areas, 'location')}
        </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">Bank Auctions in India</h3>
           <div className="flex flex-wrap gap-x-4 gap-y-2">
        {generateLinks(banks, 'bank')}  
        </div>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="bg-[#930000] text-white text-center text-xs py-3 px-2">
        All trademarks, logos, and names are the property of their respective owners. All rights reserved. © Copyright 2025 AuctionWale.
      </div>
    </footer>
  );
}
