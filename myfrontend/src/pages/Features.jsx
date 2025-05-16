import React, { useState } from 'react';

export default function Features() {
  const [formData, setFormData] = useState({
    borrowerName: '',
    location: '',
    bankName: '',
    areaInSqmt: '',
    auctionId: '',
    auctionDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Submitted!');
    console.log(formData);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center mt-5 px-4'>

      {/* Text Section */}
      <div className='container flex flex-col items-center justify-center mb-6'>
        <h1 className='text-center text-2xl text-[#0B3448] font-semibold sm:font-extrabold mb-3'>
          Key Features for Our Valuable Investor Clients
        </h1>
        <p className='text-center mb-2 text-[#0B3448] sm:text-lg'>
          At Auctionwale.com, we are committed to providing a comprehensive suite of services that empower our investors to make secure, informed, and profitable decisions in the auction property market. With a focus on transparency, expert evaluations, and thorough due diligence, our services ensure a smooth and reliable investment experience.
        </p>
      </div>

       <div className='container flex flex-col items-center justify-center mb-6'>
        <h1 className='text-center text-2xl text-[#0B3448] font-semibold sm:font-extrabold mb-3'>
          Key Features for Our Valuable Investor Clients
        </h1>
      </div>

           <div className="md:w-1/2 w-full bg-[#0B3448] text-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Borrower's Name */}
          <div className="flex flex-col">
            <label htmlFor="borrowerName" className="mb-1 text-sm font-medium">Borrower’s Name</label>
            <input
              type="text"
              id="borrowerName"
              name="borrowerName"
              value={formData.borrowerName}
              onChange={handleChange}
              className="p-2 rounded text-black"
            
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label htmlFor="location" className="mb-1 text-sm font-medium">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="p-2 rounded text-black"
             
            />
          </div>

          {/* Bank Name */}
          <div className="flex flex-col">
            <label htmlFor="bankName" className="mb-1 text-sm font-medium">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="p-2 rounded text-black"
         
            />
          </div>

          {/* Area In Sq.mt */}
          <div className="flex flex-col">
            <label htmlFor="areaInSqmt" className="mb-1 text-sm font-medium">Area (in Sq.mt)</label>
            <input
              type="text"
              id="areaInSqmt"
              name="areaInSqmt"
              value={formData.areaInSqmt}
              onChange={handleChange}
              className="p-2 rounded text-black"
     
            />
          </div>

          {/* Auction ID */}
          <div className="flex flex-col">
            <label htmlFor="auctionId" className="mb-1 text-sm font-medium">Auction ID</label>
            <input
              type="text"
              id="auctionId"
              name="auctionId"
              value={formData.auctionId}
              onChange={handleChange}
              className="p-2 rounded text-black"
          
            />
          </div>

          {/* Auction Date */}
          <div className="flex flex-col">
            <label htmlFor="auctionDate" className="mb-1 text-sm font-medium">Auction Date</label>
            <input
              type="date"
              id="auctionDate"
              name="auctionDate"
              value={formData.auctionDate}
              onChange={handleChange}
              className="p-2 rounded text-black"
       
            />
          </div>

          {/* Submit Button spans full width */}
      <div className="col-span-1 sm:col-span-2 mt-4 flex justify-center">
  <button
    type="submit "
    className="bg-[#930000] text-white font-semibold py-2 px-8 rounded hover:bg-red transition"
  >
    Search
  </button>
</div>

        </form>
      </div>

    </div>
  );
}
