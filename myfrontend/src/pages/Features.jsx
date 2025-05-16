import React, { useState, useEffect } from 'react';

export default function Features() {
  const [formData, setFormData] = useState({
    borrowerName: '',
    location: '',
    bankName: '',
    areaInSqmt: '',
    auctionId: '',
    auctionDate: '',
  });

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('/propertyData.json')
      .then((res) => res.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const hasInput = Object.values(formData).some((val) => val.trim() !== '');

  if (!hasInput) {
    setFilteredData([]); // Don't show anything if no input
    return;
  }

  const results = allData.filter((item) => {
    const matchesBorrower =
      !formData.borrowerName || item.borrowerName?.toLowerCase().includes(formData.borrowerName.toLowerCase());

    const matchesLocation =
      !formData.location || item.location?.toLowerCase().includes(formData.location.toLowerCase());

    const matchesBank =
      !formData.bankName || item.bankName?.toLowerCase().includes(formData.bankName.toLowerCase());

    const matchesArea =
      !formData.areaInSqmt || item.areaSqFt?.toString() === formData.areaInSqmt;

    const matchesAuctionId =
      !formData.auctionId || item.auctionId?.toString() === formData.auctionId;

    const matchesAuctionDate =
      !formData.auctionDate || item.auctionDate === formData.auctionDate;

    return (
      matchesBorrower &&
      matchesLocation &&
      matchesBank &&
      matchesArea &&
      matchesAuctionId &&
      matchesAuctionDate
    );
  });

  setFilteredData(results);
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


      {/* Form Section */}
      <div className="md:w-1/2 w-full bg-[#0B3448] text-white p-8 rounded-xl shadow-lg mb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/** Form Fields */}
          {/* Borrower’s Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Borrower’s Name</label>
            <input type="text" name="borrowerName" value={formData.borrowerName} onChange={handleChange} className="p-2 rounded text-black" />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="p-2 rounded text-black" />
          </div>

          {/* Bank Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Bank Name</label>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="p-2 rounded text-black" />
          </div>

          {/* Area In Sq.mt */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Area (in Sq.mt)</label>
            <input type="text" name="areaInSqmt" value={formData.areaInSqmt} onChange={handleChange} className="p-2 rounded text-black" />
          </div>

          {/* Auction ID */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Auction ID</label>
            <input type="text" name="auctionId" value={formData.auctionId} onChange={handleChange} className="p-2 rounded text-black" />
          </div>

          {/* Auction Date */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Auction Date</label>
            <input type="date" name="auctionDate" value={formData.auctionDate} onChange={handleChange} className="p-2 rounded text-black" />
          </div>

          <div className="col-span-1 sm:col-span-2 mt-4 flex justify-center">
            <button type="submit" className="bg-[#930000] text-white font-semibold py-2 px-8 rounded hover:bg-red transition">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
        {filteredData.map((item) => (
          <div key={item.id} className='bg-white rounded-xl shadow-md p-4'>
            <img src={item.image} alt={item.title} className='w-full h-48 object-cover rounded-lg mb-3' />
            <h2 className='text-lg font-semibold mb-2'>{item.title}</h2>
            <p className='text-sm font-semibold mb-2'>{item.propertyStatus}</p>
            <p><strong>Bank Price:</strong> <span className='text-red-600'>{item.bankPrice}</span></p>
            <p><strong>Market Price:</strong> {item.marketPrice}</p>
            <p><strong>Area:</strong> {item.areaSqFt}</p>
            <p><strong>Auction Date:</strong> {item.auctionDate}</p>
            <p><strong>Location:</strong> {item.location}, {item.state}</p>
            <div className='mt-3'>
              <a href={`/detailspage?id=${item.id}`} className='text-blue-700 font-semibold'>View More →</a>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className='col-span-full text-center text-gray-600 text-lg'>
            No properties match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
